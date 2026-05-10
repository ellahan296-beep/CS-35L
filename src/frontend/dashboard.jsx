
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Chip, Container, Grid, Typography } from '@mui/material';
import { getListings, getActiveListings } from '../services/listingService';
import '../index.css'


export function Listings()
{
    const [listings, setListings] = useState([]);
    useEffect(() => {
        getActiveListings().then(data => setListings(data));
    }, []);

    return (
    <Container>
      <Grid container spacing={3} sx={{mt: 5}}>
        {listings.map(listing => (
          <Grid item xs={12} sm={6} key={listing.id}>
            <Card elevation = '2' 
            sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                borderRadius: 0, paddingTop: 5, paddingBottom: 5, paddingLeft: 2, paddingRight: 2
                }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h5" fontWeight="bold" >{listing.title}</Typography>
                </Box>
                <Typography color="text.secondary" fontSize={13} mb={1}>{listing.description}</Typography>
                <Typography fontWeight="bold" color="#2d68c4" mb={1}>${listing.price}</Typography>
                <Typography fontSize={12} color="text.secondary" mb={2}>{listing.category} · {listing.campus}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export function NavigationBar()
{
    const navigate = useNavigate();
    return(
        <>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2}}>
            <div>
                <Typography 
                    sx={{
                    fontFamily: "'Monoton', sans-serif",
                    fontWeight: 700,
                    letterSpacing: '-1px',
                    }} 
                        variant="h4" component="h2" fontWeight="bold">
                    <span style={{ color: '#2d68c4' }}>Campus</span>
                    <span style={{ color: '#f2a900' }}>Trade</span>
                </Typography>
            </div>
            <div>
                <Button sx={{fontSize: '1.3rem'}} size="large" onClick={() => navigate('/listings')}>
                    Listings
                </Button>
                <Button sx={{fontSize: '1.3rem'}} size="large" onClick={() => navigate('/profile')}>
                    My Profile 
                </Button>
                <Button sx={{fontSize: '1.3rem'}} size="large">
                    Search
                </Button>
            </div>
        </Box>
        
        </>
    );
}

export default function Dashboard()
{
    return(
        <>
        <div>
        <NavigationBar />
        {/* <Typography 
        sx={{
          fontFamily: "'Monoton', sans-serif",
          fontWeight: 700,
          letterSpacing: '-1px',
          mt: 5
          }} 
            variant="h4" component="h2" fontWeight="bold">
          <span style={{ color: '#2d68c4' }}>Campus</span>
          <span style={{ color: '#f2a900' }}>Trade</span>
        </Typography> */}
        </div>
        <Listings />
        </>
    );
}