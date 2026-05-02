import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { createListing } from '../services/listingService';

const CATEGORIES = ['Books', 'Electronics', 'Furniture', 'Clothing', 'Other'];
const CAMPUSES = ['UCLA', 'USC', 'UCI', 'UCSD', 'UCB'];

export default function CreateListing() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    campus: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    setError('');
    if (!form.title || !form.price || !form.category || !form.campus) {
      setError('Please fill in all required fields');
      return;
    }
    setLoading(true);
    try {
      await createListing({ ...form, price: Number(form.price), seller_id: 1 });
      navigate('/listings');
    } catch (err) {
      setError('Something went wrong, please try again');
    }
    setLoading(false);
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          <span style={{ color: '#2d68c4' }}>Post</span>
          <span style={{ color: '#f2a900' }}> a Listing</span>
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Title *"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            label="Price ($) *"
            name="price"
            value={form.price}
            onChange={handleChange}
            fullWidth
            type="number"
          />
          <TextField
            select
            label="Category *"
            name="category"
            value={form.category}
            onChange={handleChange}
            fullWidth
          >
            {CATEGORIES.map(c => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Campus *"
            name="campus"
            value={form.campus}
            onChange={handleChange}
            fullWidth
          >
            {CAMPUSES.map(c => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </TextField>

          {error && (
            <Typography color="error" fontSize={14}>{error}</Typography>
          )}

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{ backgroundColor: '#2d68c4', borderRadius: 2, py: 1.2 }}
          >
            {loading ? 'Posting...' : 'Post Listing'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}