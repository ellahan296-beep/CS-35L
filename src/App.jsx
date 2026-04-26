import './App.css'
import { useState } from 'react'
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { LogIn, SignUp } from './frontend/Login_Signup.jsx'
import  Dashboard  from './dashboard.jsx'
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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


function App() {
  
  return(
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to="/login" />}/>
          <Route path='/login' element={<LogIn />} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
    </>
  )

}

export default App
