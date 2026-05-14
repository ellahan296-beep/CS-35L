import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Chip, Container, Grid, Typography } from '@mui/material';
import { getListings, markAsSold, deleteListing } from '../services/listingService';

export default function ListingsPage() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
//I learned how to use useEffect and useNavigate from AI.
  useEffect(() => {
  getListings().then(data => {
    console.log(data)
    setListings(data)
  })
}, []);

  async function handleSold(id) {
  await markAsSold(id);
  const data = await getListings()
  setListings(data)
}

  async function handleDelete(id) {
  await deleteListing(id);
  const data = await getListings()
  setListings(data)
}

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6}}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography 
        sx={{
          fontFamily: "'Monoton', sans-serif",
          fontWeight: 700,
          letterSpacing: '-1px',
          }} 
        variant="h3" fontWeight="bold">
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
            <Card 
              elevation={2}
              onClick={() => navigate('/listings/' + listing.id)}
              sx={{
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                paddingTop: 5, paddingBottom: 5, paddingLeft: 2, paddingRight: 2, 
                opacity: listing.status === 'sold' ? 0.6 : 1
              }}
            >
        <CardContent>
                {/* add image */}
                {(() => {
                  const imgs = JSON.parse(listing.images || '[]')
                  if (imgs.length > 0) {
                    return <img 
                      src={`http://localhost:9999/${imgs[0]}`} 
                      alt={listing.title}
                      style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }}
                    />
                  }
                })()}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h5" fontWeight="bold" >{listing.title}</Typography>
                  <Chip
                    label={listing.status === 'sold' ? 'Sold' : 'Active'}
                    size="small"
                    sx={{ backgroundColor: '#e3f0ff', color: '#2d68c4' }}
                  />
                </Box>
                <Typography color="text.secondary" fontSize={13} mb={1}>{listing.description}</Typography>
                <Typography fontWeight="bold" color="#2d68c4" mb={1}>${listing.price}</Typography>
                <Typography fontSize={12} color="text.secondary" mb={2}>{listing.category}  {listing.campus}</Typography>

                {listing.status === 'active' && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2}}>
                    <Button
                      size="small"
                      variant="outlined"
                      
                      onClick={(e) => 
                        {
                          e.stopPropagation()// prevent card click
                          handleSold(listing.id)}}
                      
                      sx={{ borderColor: '#f2a900', color: '#f2a900', borderRadius: 2 }}
                    >
                      Mark as Sold
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={(e) => 
                        {
                          e.stopPropagation()// prevent card click 
                          handleDelete(listing.id)}}
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