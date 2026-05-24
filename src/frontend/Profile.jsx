
import { NavigationBar } from './dashboard.jsx';
import { Listings, LoadingCircle } from './Search.jsx'
import { useEffect, useState } from 'react';
import { getCurrUser } from '../services/profileService.js'
import { getUserListings } from '../services/listingService.js'
import { Box, Typography, Paper, Container, Avatar, Divider } from '@mui/material';
 
// the section outlined in the comments is AI generated because I was unsure how to
// implement a user profile card with limited information that still looked visually appealing
// all of the code (except the Divider) features components/styles that I've implemented 
// myself in other features, so I understand them fully. 
// I set a picture of the profile card I had before, and asked "how do I make this look better"
// as my prompt

function UserInfo( {user} )
{
    const [listings, setListings] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    setLoading(true);
    setError('');

    getUserListings(user.id)
    .then(data => {
        setListings(data);
    })
    .catch(err => {
        setError(err.message);
        console.error(err.message);
    })
    .finally(() => setLoading(false));
    }, []);

    return (
        <>
        <Container maxWidth="sm">
        <Box 
            sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
            }}
        >
            <Box sx={{ position: 'relative', width: '100%', pt: '37.5px' }}>
                <Avatar 
                sx={{ 
                bgcolor:'#f2a900', height: 75, width: 75, 
                fontSize: '2.5rem !important',
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1,
                border: '3px solid white'
                }}>
                    {user.username[0]}
                </Avatar>
                <Paper 
                    sx={{ 
                    p: 4, 
                    width: '100%', 
                    borderRadius: 2,
                    borderTop: '5px solid #2d68c4' 
                }}>
                    {/* AI generated code below */}
                    <Box sx={{ mt: 4, textAlign: 'center' }}>
                        <Divider sx={{ mb: 2 }} />
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, py: 1.5 }}>
                            <Typography 
                            sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                                USERNAME
                            </Typography>
                            <Typography sx={{ fontWeight: 600 }}>{user.username}</Typography>
                        </Box>
                        <Divider />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, py: 1.5 }}>
                            <Typography 
                            sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                                EMAIL
                            </Typography>
                            <Typography sx={{ fontWeight: 600 }}>{user.email}</Typography>
                        </Box>
                        <Divider />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, py: 1.5 }}>
                            <Typography 
                            sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                                ACTIVE LISTINGS
                            </Typography>
                            <Typography sx= {{ fontWeight: 600 }}>{listings.length}</Typography>
                        </Box>
                    </Box>
                    {/* AI generated code above */}
                </Paper>
            </Box>
        </Box>
        </Container>
        </>
    );
}

export default function Profile()
{
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    
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
        .finally(() => setLoading(false));
    }, []);

    return (
        <>
        <NavigationBar />
        {loading ? <LoadingCircle /> : <UserInfo user = {user}/>}
        </>
    );
}