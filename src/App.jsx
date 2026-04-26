import { useState } from 'react'
import './App.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function App() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  function handleClick()
  {
      preventDefault();
  }
  return (
    <>
    <Box>
        <form className="email">
            <TextField required id="email" label="Email" variant="outlined" />
        </form>
        <form className="password">
            <TextField required id="password" label="Password" variant="outlined" />
        </form>
        <div>
            <button className="submit" onSubmit={handleClick}>Submit</button>
        </div>
    </Box>
    </>
  );
}

export default App
