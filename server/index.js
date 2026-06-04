const express = require('express');
const cors = require('cors');
const db = require('./database');

const path = require('path')
const multer = require('multer');//for uploading images

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const app = express();
const PORT = 9999;
const JWT_SECRET = 'campustrade_secret_9283749';


// I looked up how to use multer on npm docs
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')//cb=callback
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage })

app.use(cors());//allow cross domain requests
app.use(express.json());
//use static because images are static files
app.use('/uploads', express.static('uploads'))

//Checks if user is logged in before accessing route. 
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// GET all listings
app.get('/api/listings', authenticateToken, (req, res) => {
  const listings = db.prepare('SELECT * FROM listings').all();
  res.json(listings);
});

// GET only unsold listings 
app.get('/api/active-listings', authenticateToken, (req, res) => {
  const listings = db.prepare("SELECT * FROM listings WHERE status = 'active'").all();
  if (!listings) return res.status(404).json({ error: 'Listings not found' });
  res.json(listings);
});

// GET listings matching a certain 
app.get('/api/search', authenticateToken, (req, res) => {
  const searchTerm = req.query.term;
  const query = `
    SELECT * FROM listings
    JOIN listings_fts AS f ON listings.id = f.rowid
    WHERE (f.listings_fts MATCH ?) AND (listings.status = 'active')`;
  const searchValue = `${searchTerm}`;
  const listings = db.prepare(query).all(searchValue);
  if (!listings) return res.status(404).json({ error: 'Listings not found' });
  res.json(listings);
});

// GET single listing
app.get('/api/listings/:id', authenticateToken, (req, res) => {
  const listing = db.prepare('SELECT * FROM listings WHERE id = ?').get(req.params.id);
  if (!listing) return res.status(404).json({ error: 'Listing not found' });
  res.json(listing);
});

// GET active listings by a specific seller
app.get('/api/listings/seller/:id', authenticateToken, (req, res) => {
  const listing = db.prepare("SELECT * FROM listings WHERE seller_id = ? AND status = 'active'").all(req.params.id);
  if (!listing) return res.status(404).json({ error: 'Listing not found' });
  res.json(listing); 
})

// GET all listings by a specific user
app.get('/api/listings/user/:id', authenticateToken, (req, res) => {
  const listing = db.prepare("SELECT * FROM listings WHERE seller_id = ?").all(req.params.id);
  if (!listing) return res.status(404).json({ error: 'Listing not found' });
  res.json(listing); 
})

// Create new listing
app.post('/api/listings', authenticateToken, (req, res) => {
  const { title, description, price, category, campus} = req.body;
  const seller_id = req.user.id;
  console.log('creating listing:', title, 'seller:', seller_id);
  const result = db.prepare(`
    INSERT INTO listings (title, description, price, category, campus, seller_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(title, description, price, category, campus, seller_id);
  res.json({ id: result.lastInsertRowid, seller_id });
});

//when I use ai to debug, it recommend me use patch instead of post to mark as sold
// mark as sold
app.patch('/api/listings/:id/sold', authenticateToken, (req, res) => {
  const result = db.prepare(
    'UPDATE listings SET status = ? WHERE id = ? AND seller_id = ?'
  ).run('sold', req.params.id, req.user.id);
  if (result.changes === 0) {
    return res.status(403).json({ error: 'You can only mark your own listings as sold' });
  }

  res.json({ success: true });
});

// delete listing
app.delete('/api/listings/:id', authenticateToken, (req, res) => {
  const result = db.prepare(
    'DELETE FROM listings WHERE id = ? AND seller_id = ?'
  ).run(req.params.id, req.user.id);
  if (result.changes === 0) {
    return res.status(403).json({ error: 'You can only delete your own listings' });
  }

  res.json({ success: true });
});



//POST signup
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

   if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address' });
  }

  if (username.length < 3) {
    return res.status(400).json({ message: 'Username must be at least 3 characters long' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  try {
    const existingUser = db.prepare(
      'SELECT * FROM users WHERE email = ? OR username = ?'
    ).get(email, username);

    if (existingUser) {
      return res.status(409).json({ message: 'Username or email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = db.prepare(`
      INSERT INTO users (username, email, password_hash)
      VALUES (?, ?, ?)
    `).run(username,email, passwordHash);

    const token = jwt.sign(
      { id: result.lastInsertRowid, username, email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: {
        id: result.lastInsertRowid,
        username,
        email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

// POST login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = db.prepare(
      'SELECT * FROM users WHERE email = ?'
    ).get(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// PROFILE INFORMATION

app.get('/api/profile', authenticateToken, async (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.get('/api/profile/:id', async (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// asked Claude - "how do I reset my data before every test?"
app.post('/test/reset', (req, res) => {
  //clear the database before each test (alice)
  db.exec('DELETE FROM users');
  res.json({ ok: true });
});
// end of AI-generated code, modified to fit my project 


app.post('/test/reset/listings', (req, res) => {
  db.exec('DELETE FROM listings');
  res.json({ ok: true });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// upload image for a listing
app.post('/api/listings/:id/images', authenticateToken, upload.single('image'), (req, res) => {
  const imagePath = req.file.path

  console.log('uploaded image:', imagePath)

  const listing = db.prepare('SELECT * FROM listings WHERE id = ?').get(req.params.id)
  if (!listing){
    return res.status(404).json({ error: 'Listing not found' });
  }
  if (listing.seller_id !== req.user.id) {
    return res.status(403).json({ error: 'You can only upload images to your own lisitngs'})
  }
  const images = JSON.parse(listing.images || '[]')
  images.push(imagePath)

  //change the image into a json string and store in the database
  db.prepare('UPDATE listings SET images = ? WHERE id = ?').run(JSON.stringify(images), req.params.id)
  res.json({ success: true, path: imagePath })
});