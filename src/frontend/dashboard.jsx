
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Chip, Container, Grid, Typography } from '@mui/material';
import { getListings, getActiveListings } from '../services/listingService';
import { LoadingCircle, Listings } from './Search.jsx'
import '../index.css'


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
        <Button sx={{fontSize: '1.3rem'}} size="large" onClick={() => navigate('/search')}>
            Search
        </Button>
      </div>
    </Box>
    
    </>
  );
}

export default function Dashboard()
{
  const [listings, setListings] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError('');

    getActiveListings()
    .then(data => {
      setListings(data);
    })
    .catch(err => {
      setError(err.message);
      console.error(err.message);
    })
    .finally(() => setLoading(false));
  }, []);

  return(
    <>
    <NavigationBar />
    {loading ? <LoadingCircle /> : <Listings items = {listings}/>}
    </>
  );
}