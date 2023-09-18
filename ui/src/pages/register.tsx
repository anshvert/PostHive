import React from "react"
import {useState} from "react"
import {TextField,Button} from "@mui/material";
import Box from "@mui/material/Box";
import {useMutation, UseMutationExecute} from "urql";
import {REGISTER_MUT} from "@/graphql/mutations";
import {NextRouter, useRouter} from "next/router";
import {User, userInputEvent} from "@/utils/types";

export type registerProps = {}

const Register: React.FC<registerProps> = () => {
    const [,register] = useMutation(REGISTER_MUT)
    const router: NextRouter = useRouter()
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>("")

    async function handleSubmit(event: any): Promise<any> {
        event.preventDefault();
        const options: User = {"username":username,"password":password,"email": email}
        const response = await register(options);
        if (response.data?.register.errors?.length) {
            alert(`${response.data?.register.errors[0].message}`)
        } else if (!response.data) {
            alert(`Something went Wrong !!`)
        } else {
            await router.push("/")
        }
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
                        onChange={(e: userInputEvent) => setUsername(e.target.value)}
                        value={username}
                        fullWidth
                        required
                        sx={{mb: 4}}
                    />
                    <TextField
                        type="email"
                        variant='outlined'
                        color='secondary'
                        label="Email"
                        onChange={(e: userInputEvent) => setEmail(e.target.value)}
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
                        onChange={(e: userInputEvent) => setPassword(e.target.value)}
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