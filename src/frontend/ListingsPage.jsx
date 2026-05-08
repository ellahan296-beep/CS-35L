import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Chip, Container, Grid, Typography } from '@mui/material';
import { getListings, markAsSold, deleteListing } from '../services/listingService';

export default function ListingsPage() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getListings().then(data => setListings(data));
  }, []);

  async function handleSold(id) {
    await markAsSold(id);
    setListings(listings.map(l => l.id === id ? { ...l, status: 'sold' } : l));
  }

  async function handleDelete(id) {
    await deleteListing(id);
    setListings(listings.filter(l => l.id !== id));
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" fontWeight="bold">
          <span style={{ color: '#2d68c4' }}>Campus</span>
          <span style={{ color: '#f2a900' }}>Trade</span>
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/listings/new')}
          sx={{ backgroundColor: '#2d68c4', borderRadius: 2 }}
        >
          + Post Item
        </Button>
      </Box>

      <Grid container spacing={3}>
        {listings.map(listing => (
          <Grid item xs={12} sm={6} key={listing.id}>
            <Card elevation={2} sx={{ borderRadius: 3, opacity: listing.status === 'sold' ? 0.6 : 1 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography fontWeight="bold" fontSize={16}>{listing.title}</Typography>
                  <Chip
                    label={listing.status === 'sold' ? 'Sold' : 'Active'}
                    size="small"
                    sx={{
                      backgroundColor: listing.status === 'sold' ? '#e0e0e0' : '#e3f0ff',
                      color: listing.status === 'sold' ? '#888' : '#2d68c4',
                    }}
                  />
                </Box>
                <Typography color="text.secondary" fontSize={13} mb={1}>{listing.description}</Typography>
                <Typography fontWeight="bold" color="#2d68c4" mb={1}>${listing.price}</Typography>
                <Typography fontSize={12} color="text.secondary" mb={2}>{listing.category} · {listing.campus}</Typography>

                {listing.status === 'active' && (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleSold(listing.id)}
                      sx={{ borderColor: '#f2a900', color: '#f2a900', borderRadius: 2 }}
                    >
                      Mark as Sold
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(listing.id)}
                      sx={{ borderRadius: 2 }}
                    >
                      Delete
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}