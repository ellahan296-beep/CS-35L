

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Box, Button, Card, CardContent, Chip, Container, Grid, Typography } from '@mui/material';
import { borders } from '@mui/system'
import { getListings, getActiveListings, searchListings } from '../services/listingService';
import '../index.css'

export function Listings({ items })
{
  if (items.length === 0) {
    return (
    <div  style = {{ height: '50vh', display: 'flex', alignItems: "center", justifyContent: "center" }}>
        <h2 style={{ color: "gray" }}>No listings available!</h2>
    </div>
    );
  }
  return (
  <Container>
    <Grid container spacing={3} sx={{mt: 5}}>
      {items.map(listing => (
        <Grid item size = {{xs: 12, sm: 6, md: 4}} key={listing.id}>
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

export function SearchBar({ onSearch })
{
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  }

  return(
      <>
      <Typography 
      align = "center"
      sx={{
        fontFamily: "'Monoton', sans-serif",
        fontWeight: 700,
        letterSpacing: '-1px',
        mt: 10
        }} 
      variant="h2" fontWeight="bold">
        <span style={{ color: '#2d68c4' }}>Campus</span>
        <span style={{ color: '#f2a900' }}>Trade</span>
      </Typography>
      <TextField
        fullWidth
        component = "form"
        type="search query"
        label="Search"
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx = {{"& fieldset": {borderRadius: '50px'}}}
        onSubmit = {handleClick}/>
      </>
  );
}

//the loading circle appearance/animation is coded by gemini 
export const LoadingCircle = () => (
  <div style={{ 
    height: '80vh', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center' 
  }}>
    <div className="spinner"></div>
  </div>
);
//end of gemini coding (prompt: how to add a loading circle in react) - I ignored the part about the search logic 

export function NavigationBar()
{
  const navigate = useNavigate();
  return(
    <>
    <Box sx={{display: 'flex', justifyContent: 'right', alignItems: 'right', mt: 2}}>
      <div>
        <Button sx={{fontSize: '1.1rem'}} size="large" onClick={() => navigate('/listings')}>
            Listings
        </Button>
        <Button sx={{fontSize: '1.1rem'}} size="large" onClick={() => navigate('/profile')}>
            My Profile 
        </Button>
        <Button sx={{fontSize: '1.1rem'}} size="large" onClick={() => navigate('/search')}>
            Search
        </Button>
      </div>
    </Box>
    
    </>
  );
}

export default function Search()
{
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    setError('');

    if (searchQuery === "") {
      getActiveListings()
      .then(data => {
        setListings(data);
        console.log(loading);
      })
      .catch(err => {
          setError(err.message);
          console.error(err.message);
      })
      .finally(() => setLoading(false));
    }
    else {
      searchListings(searchQuery)
      .then(data => setListings(data))
      .catch(err => {
          setError(err.message);
          setLoading(false);
          console.error(err.message);
      })
      .finally(() => setLoading(false));
    }
  }, [searchQuery]);

  if (error != '') {
    return (
      <div  style = {{ height: '50vh', display: 'flex', 
                      alignItems: "center", justifyContent: "center", 
                      flexDirection: "column"}}>
        <h2 style={{ color: "gray" }}>Error: {error}</h2>
        <p>Please reload the page and try again.</p>
      </div>
    )
  }

  return (
    <>
    <NavigationBar />
    <Box style = {{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        flexDirection: "column"}}
      >
        <SearchBar onSearch = {(e) => setSearchQuery(e)} />
        {loading ? <LoadingCircle /> : <Listings items = {listings} />}
    </Box>
    </>
  )
}