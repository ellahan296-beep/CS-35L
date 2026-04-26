import { useState } from 'react'
import {createTheme, ThemeProvider} from '@mui/material/styles';
import './App.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LogIn from './frontend/Login'

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
      <LogIn />
    </ThemeProvider>
    </>
  )

}

export default App
