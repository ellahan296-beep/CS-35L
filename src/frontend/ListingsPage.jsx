import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Chip, Container, Grid, Typography } from '@mui/material';
import { getListings, markAsSold, deleteListing, getUserListings } from '../services/listingService';
import { getCurrUser } from '../services/profileService.js';
import { LoadingCircle, NavigationBar } from './Search.jsx'; 

function Listings({items, handleSold, handleDelete}) {
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div style={{ height: '50vh', display: 'flex', alignItems: "center", justifyContent: "center" }}>
        <h2 style={{ color: "gray" }}>No listings available!</h2>
      </div>
    );
  }

  return (
    <Grid container spacing={3}>
      {[...items].reverse().map(listing => (
        <Grid item size={{xs: 12, sm: 6, md: 4}} key={listing.id}>
          <Card 
            elevation={2}
            onClick={() => navigate('/listings/' + listing.id)}
            sx={{
              height: '100%', 
              width: '100%',
              display: 'flex', 
              flexDirection: 'column', 
              paddingTop: 5, paddingBottom: 5, paddingLeft: 2, paddingRight: 2, 
              opacity: listing.status === 'sold' ? 0.6 : 1,
              cursor: 'pointer'
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              {/* show image if there is one */}
              {(() => {
                const imgs = JSON.parse(listing.images || '[]')
                if (imgs.length > 0) {
                  return <img 
                    src={`http://localhost:9999/${imgs[0]}`} 
                    alt={listing.title}
                    style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }}
                  />
                }
                else 
                  return (<Box 
                    style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '13px',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #cecece' }}>
                      <Typography sx={{color:'#8d8d8d'}}>No Image</Typography>
                    </Box>);
              })()}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h5" fontWeight="bold">{listing.title}</Typography>
                <Chip
                  label={listing.status === 'sold' ? 'Sold' : 'Active'}
                  size="small"
                  sx={{ backgroundColor: '#e3f0ff', color: '#2d68c4' }}
                />
              </Box>
              <Typography color="text.secondary" fontSize={13} mb={1}>{listing.description}</Typography>
              <Typography fontWeight="bold" color="#2d68c4" mb={1}>${listing.price}</Typography>
              <Typography fontSize={12} color="text.secondary" mb={2}>{listing.category} · {listing.campus}</Typography>

              {listing.status === 'active' && (
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2}}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSold(listing.id)
                    }}
                    sx={{ borderColor: '#f2a900', color: '#f2a900', borderRadius: 2 }}
                  >
                    Mark as Sold
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(listing.id)
                    }}
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
  );
}

export default function ListingsPage() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');

    getCurrUser()
    .then(data => {
        setUser(data);
    })
    .catch(err => {
        setError(err.message);
        console.error(err.message);
        })
  }, []);

  useEffect(() => {
    if (!user)
      return;

    setLoading(true);

    getUserListings(user.id)
    .then(data => {
      console.log(data)
      setListings(data)
    })
    .finally(() => setLoading(false));
  }, [user]);

  async function handleSold(id) {
    await markAsSold(id);
    const data = await getUserListings(user.id)
    setListings(data)
  }

  async function handleDelete(id) {
    await deleteListing(id);
    const data = await getUserListings(user.id)
    setListings(data)
  }

  return (
    <>
      <NavigationBar />
      <Container maxWidth="md" sx={{ mt: 2, mb: 6}}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography 
            sx={{
              fontFamily: "'Monoton', sans-serif",
              fontWeight: 700,
              letterSpacing: '-1px',
            }} 
            variant="h3" fontWeight="bold"
          >
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
        {loading ? <LoadingCircle /> : <Listings items={listings} handleDelete = {handleDelete} handleSold = {handleSold} />}
      </Container>
    </>
  );
}