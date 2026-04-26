import React, {useState} from 'react';
import {Button, Typography, Paper, Container, TextField, Box} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {login} from '../services/authService'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2d68c4',
    },
    secondary: {
      main: '#f2a900', // Gold
    },
  },
  typography: {
    fontFamily: '"Quicksand", sans-serif',
    h1: {
      fontWeight: 700,
    },
  },
});

const LogIn = () =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClick = async (e) =>
    {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!email || !password)
        {
            console.error("Please enter credentials.")
            setLoading(false);
            return;
        }

        try
        {
            const data = await login(email, password);
            console.log("Login Successful: ", data);
            localStorage.setItem("token", data.token);
            setLoading(false);
        }
        catch(err)
        {
            if (err.status === 401)
            {
                setError("Incorrect credentials")
                console.error("Incorrect credentials");
                setLoading(false);
            }
            else
            {
                setError(err.message);
                console.error(err.message);
                setLoading(false);
            }
        }
    }
    return (
    <ThemeProvider theme={theme}>
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
                sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 'bold' }}
              >
                Log In
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LogIn;