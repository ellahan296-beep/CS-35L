import React, {useState} from 'react';
import {Button, Typography, Paper, Container, TextField, Box, Link} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {login, signup} from '../services/authService'
import { Link as RouterLink, useNavigate } from 'react-router-dom';


export const LogIn = () =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    const handleClick = async (e) =>
    {
        e.preventDefault();
        setLoading(true);
        setError('');

        try
        {
          const data = await login(email, password);
          console.log("Login Successful: ", data);
          localStorage.setItem("token", data.token);
          setLoading(false);
          navigate('/dashboard', {replace:true});
        }
        catch(err)
        {
          setError(err.message);
          console.error(err.message);
          setLoading(false);
        }
    }
    return (
      <Container maxWidth="sm">
        <Box 
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Paper 
            sx={{ 
              p: 4, 
              width: '100%', 
              borderRadius: 2,
              borderTop: '5px solid #f2a900' 
            }}
          >
            <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            sx={{ 
                fontFamily: "'Monoton', sans-serif",
                fontWeight: 700,
                letterSpacing: '-1px',
                color: '#2d68c4', 
                textAlign: 'center',
                mb: 4
            }}
            >
            Campus<span style={{ color: '#f2a900' }}>Trade</span>
            </Typography>

            <Box component="form" onSubmit={handleClick} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                type="password"
                label="Password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 'bold' }}
              >
                {loading ? "Validating..." : "Log In"}
              </Button>
            </Box>
          </Paper>
          <Typography align="center" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <Link component={RouterLink} to="/signup" sx={{ fontWeight: 'bold', color: '#f2a900'}}>
              Sign Up
            </Link>
            {' '} or{' '}
            <Link component={RouterLink} to="/dashboard" sx={{ fontWeight: 'bold', color: '#f2a900' }}>
              Proceed as Guest
            </Link>
          </Typography>
        </Box>
      </Container>
  );
}

export const SignUp = () =>
{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    const handleClick = async (e) =>
    {
        e.preventDefault();
        setLoading(true);
        setError('');

        try
        {
            const data = await signup(username, email, password);
            console.log("Account creation successful: ", data);
            localStorage.setItem("token", data.token);
            setLoading(false);
            navigate('/dashboard', { replace:true });
        }
        catch(err)
        {
          setError(err.message);
          console.error(err.message);
          setLoading(false);
        }
    }
    return (
      <Container maxWidth="sm">
        <Box 
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Paper 
            sx={{ 
              p: 4, 
              width: '100%', 
              borderRadius: 2,
              borderTop: '5px solid #2d68c4' 
            }}
          >
            <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            sx={{ 
                fontFamily: "'Monoton', sans-serif",
                fontWeight: 700,
                letterSpacing: '-1px',
                color: '#2d68c4', 
                textAlign: 'center',
                mb: 4
            }}
            >
            Campus<span style={{ color: '#f2a900' }}>Trade</span>
            </Typography>

            <Box component="form" onSubmit={handleClick} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Username"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                type="password"
                label="Password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                disabled={loading}
                sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 'bold' }}
              >
                {loading ? "Validating..." : "Sign Up"}
              </Button>
            </Box>
          </Paper>
          <Typography align="center" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Link component={RouterLink} to="/login" sx={{ fontWeight: 'bold' }}>
              Log In
            </Link>
          </Typography>
        </Box>
      </Container>
  );
}

