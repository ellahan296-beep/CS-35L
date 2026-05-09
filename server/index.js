const express = require('express');
const cors = require('cors');
const db = require('./database');
const path = require('path')
const multer = require('multer');//for uploading images

const app = express();
const PORT = 9999;

// i looked up how to use multer on npm docs
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

// GET all listings
app.get('/api/listings', (req, res) => {
  const listings = db.prepare('SELECT * FROM listings').all();
  res.json(listings);
});

// GET single listing
app.get('/api/listings/:id', (req, res) => {
  const listing = db.prepare('SELECT * FROM listings WHERE id = ?').get(req.params.id);
  if (!listing) return res.status(404).json({ error: 'Listing not found' });
  res.json(listing);
});
// Create new listing
app.post('/api/listings', (req, res) => {
  const { title, description, price, category, campus, seller_id } = req.body;
  console.log('creating listing:', title)
  const result = db.prepare(`
    INSERT INTO listings (title, description, price, category, campus, seller_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(title, description, price, category, campus, seller_id);
  res.json({ id: result.lastInsertRowid });
});
//when I use ai to debug, it recommend me use patch instead of post to mark as sold
// mark as sold
app.patch('/api/listings/:id/sold', (req, res) => {
  db.prepare('UPDATE listings SET status = ? WHERE id = ?').run('sold', req.params.id);
  res.json({ success: true });
});

// delete listing
app.delete('/api/listings/:id', (req, res) => {
  db.prepare('DELETE FROM listings WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// upload image for a listing
app.post('/api/listings/:id/images', upload.single('image'), (req, res) => {
  const imagePath = req.file.path

  console.log('uploaded image:', imagePath)

  const listing = db.prepare('SELECT * FROM listings WHERE id = ?').get(req.params.id)
  const images = JSON.parse(listing.images || '[]')
  images.push(imagePath)

  //change the image into a json string and store in the database
  db.prepare('UPDATE listings SET images = ? WHERE id = ?').run(JSON.stringify(images), req.params.id)
  res.json({ success: true, path: imagePath })
});