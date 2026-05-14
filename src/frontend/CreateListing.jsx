import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { createListing } from '../services/listingService';
import { uploadImage } from '../services/listingService';

const CATEGORIES = ['Books', 'Electronics', 'Furniture', 'Clothing', 'Other'];
const CAMPUSES = ['UCLA', 'USC', 'UCI', 'UCSD', 'UCB' ];



export default function CreateListing() {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [campus, setCampus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  
  function handleTitleChange(e) {
    setTitle(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  function handlePriceChange(e) {
    setPrice(e.target.value)
  }

  function handleCategoryChange(e) {
    setCategory(e.target.value)
  }

  function handleCampusChange(e) {
    setCampus(e.target.value)
  }

  function handleImageChange(e) {
    setImageFile(e.target.files[0])
    console.log('image selected:', e.target.files[0])
  }


  async function handleSubmit() {
    setError('');
    if (!title || !price || !category || !campus) {
      setError('Please fill in all required fields');
      return;
    }
    setLoading(true);
    try {
    const result = await createListing({ title, description, price: Number(price), category, campus, seller_id: 1 });
    console.log('listing created:', result)
    if (imageFile) {
      await uploadImage(result.id, imageFile)
    }
    navigate('/listings');
  } catch (err) {
     console.log('error:', err)// test point
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
            value={title}
            onChange={handleTitleChange}
            fullWidth
          />
          <TextField
            label="Description"
            value={description}
            onChange={handleDescriptionChange}
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            label="Price ($) *"
            value={price}
            onChange={handlePriceChange}
            fullWidth
            type="number"
          />
          <TextField
            select
            label="Category *"
            value={category}
            onChange={handleCategoryChange}
            fullWidth
          >
            {CATEGORIES.map(c => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Campus *"
            value={campus}
            onChange={handleCampusChange}
            fullWidth
          >
            {CAMPUSES.map(c => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </TextField>

          <Typography fontSize={14} color="text.secondary">Upload Image</Typography>
          <input type="file" accept="image/*" onChange={handleImageChange} />

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