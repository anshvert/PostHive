import React from "react"
import {useState} from "react"
import {TextField,Button} from "@mui/material";
import Box from "@mui/material/Box";
import {useMutation} from "urql";
import {LOGIN_MUT} from "@/graphql/mutations";
import {NextRouter, useRouter} from "next/router";

export type loginProps = {}

const Login: React.FC<loginProps> = () => {
    const [,login] = useMutation(LOGIN_MUT)
    const router: NextRouter = useRouter()
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    async function handleSubmit(event: any): Promise<undefined> {
        event.preventDefault();
        const options = {"username":username,"password":password}
        const response = await login(options);
        if (response.data?.login.errors?.length) {
            alert(`${response.data?.login.errors[0].message}`)
        } else if (!response.data) {
            alert(`Something went Wrong !!`)
        } else {
            await router.push("/")
        }
        return
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
                <h2>Login Form</h2>
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
export default Login