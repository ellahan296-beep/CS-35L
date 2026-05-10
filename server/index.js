const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 9999;

app.use(cors());
app.use(express.json());

// GET all listings
app.get('/api/listings', (req, res) => {
  const listings = db.prepare('SELECT * FROM listings').all();
  res.json(listings);
});

// GET only unsold listings 
app.get('/api/listings/find/active', (req, res) => {
  const listings = db.prepare("SELECT * FROM listings WHERE status = 'active'").all();
  if (!listings) return res.status(404).json({ error: 'Listings not found' });
  res.json(listings);
});

// GET single listing
app.get('/api/listings/:id', (req, res) => {
  const listing = db.prepare('SELECT * FROM listings WHERE id = ?').get(req.params.id);
  if (!listing) return res.status(404).json({ error: 'Listing not found' });
  res.json(listing);
});

// POST create listing-Add new data
app.post('/api/listings', (req, res) => {
  const { title, description, price, category, tags, images, campus, seller_id } = req.body;
  const result = db.prepare(`
    INSERT INTO listings (title, description, price, category, tags, images, campus, seller_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(title, description, price, category, JSON.stringify(tags || []), JSON.stringify(images || []), campus, seller_id);
  res.json({ id: result.lastInsertRowid });
});

// mark as sold
app.patch('/api/listings/:id/sold', (req, res) => {
  db.prepare('UPDATE listings SET status = ? WHERE id = ?').run('sold', req.params.id);
  res.json({ success: true });
});

// DELETE listing
app.delete('/api/listings/:id', (req, res) => {
  db.prepare('DELETE FROM listings WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});