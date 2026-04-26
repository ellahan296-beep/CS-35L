import { Box } from '@mui/material/Box';
import { TextField } from '@mui/material/TextField';

export default function LogIn()
{
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    function handleClick()
    {
        preventDefault();
    }
    return (
    <>
    <Box>
        <div className="email">
            <TextField required id="email" label="Email" variant="outlined" />
        </div>
        <div className="password">
            <TextField required id="password" label="Password" variant="outlined" />
        </div>
        <div>
            <button className="submit" onClick={handleClick}/>
        </div>
    </Box>
    </>
    );
}