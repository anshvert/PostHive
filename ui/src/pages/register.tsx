import React from "react"
import {useState} from "react"
import {TextField,Button} from "@mui/material";
import Box from "@mui/material/Box";

export type registerProps = {}
const REGISTER_MUT = `
    mutation Register($options: UsernamePasswordInput!) {
      register(options: {username: "ansh2", password: "ansh"}) {
        user {
          id
        }
      }
    }`

const Register: React.FC<registerProps> = () => {
    //const [,] = useMutation(REGISTER_MUT)
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    async function handleSubmit(event: any): Promise<any> {
        event.preventDefault();
        console.log(username,password)
    }
    return (
        <React.Fragment>
            <Box sx={{
                    width: 600,
                    height: 400,
                    backgroundColor: 'white',
                    m: 'auto',
                    position: "absolute",
                    top: '20%',
                    left: '30%',
                    '&:hover': {
                        backgroundColor: 'white',
                        opacity: [0.9, 0.8, 0.7],
                        borderBottom: 1,
                        borderColor: "grey.500"
                    }}}>
                <h2>Register Form</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        type="username"
                        variant='outlined'
                        color='secondary'
                        label="Username"
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                        fullWidth
                        required
                        sx={{mb: 4}}
                    />
                    <TextField
                        type="password"
                        variant='outlined'
                        color='secondary'
                        label="Password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        required
                        fullWidth
                        sx={{mb: 4}}
                    />
                    <Button variant="outlined" color="secondary" type="submit">Register</Button>
                </form>
                {/*<small>Already have an account? <Link to="/login">Login Here</Link></small>*/}
            </Box>
        </React.Fragment>
    )
}
export default Register