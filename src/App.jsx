import './App.css'
import { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LogIn, SignUp } from './frontend/Login_Signup.jsx'
import Dashboard from './frontend/dashboard.jsx'
import CreateListing from './frontend/CreateListing.jsx'
import ListingsPage from './frontend/ListingsPage.jsx'
import Profile from './frontend/Profile.jsx'
import Search from './frontend/Search.jsx'
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: { main: '#2d68c4' },
    secondary: { main: '#f2a900' },
  },
  typography: {
    fontFamily: '"Quicksand", sans-serif',
    h1: { fontWeight: 700 },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to="/login" />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element = {<Profile />} />
          <Route path='/listings' element={<ListingsPage />} />
          <Route path='/listings/new' element={<CreateListing />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App