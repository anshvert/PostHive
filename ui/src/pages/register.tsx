import React from "react"
import {useState} from "react"
import Link from "next/link";
import {Stack} from "@mui/system";
import {TextField,Button} from "@mui/material";

export type registerProps = {}

const Register: React.FC<registerProps> = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(event) {
        event.preventDefault();
        console.log(firstName, lastName, email, password)
    }

    return (
        <React.Fragment>
            <div>
                <h2>Register Form</h2>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="First Name"
                            onChange={e => setFirstName(e.target.value)}
                            value={firstName}
                            fullWidth
                            required
                        />
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Last Name"
                            onChange={e => setLastName(e.target.value)}
                            value={lastName}
                            fullWidth
                            required
                        />
                    </Stack>
                    <TextField
                        type="email"
                        variant='outlined'
                        color='secondary'
                        label="Email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
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
            </div>
        </React.Fragment>
    )
}
export default Register