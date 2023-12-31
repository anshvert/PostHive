import React from "react"
import {useState} from "react"
import {TextField,Button, Link} from "@mui/material";
import Box from "@mui/material/Box";
import {useMutation} from "urql";
import {LOGIN_MUT} from "@/graphql/mutations";
import {NextRouter, useRouter} from "next/router";
import { selectLoginState, setLoginState } from "@/store/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import {AnyAction, Dispatch} from "redux";
import {User} from "@/utils/types";
import NextLink from "next/link"

export type loginProps = {}

const Login: React.FC<loginProps> = () => {
    const [,login] = useMutation(LOGIN_MUT)
    const router: NextRouter = useRouter()
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>("")
    const loginState : boolean = useSelector(selectLoginState);
    const dispatch: Dispatch<AnyAction> = useDispatch();

    async function handleSubmit(event: any): Promise<undefined> {
        event.preventDefault();
        const options: User = {"username":username,"password":password,"email": email}
        const response = await login(options);
        if (response.data?.login.errors?.length) {
            alert(`${response.data?.login.errors[0].message}`)
        } else if (!response.data) {
            alert(`Something went Wrong !!`)
        } else {
            dispatch(setLoginState(true))
            await router.push("/")
        }
        return
    }
    return (
        <>
            <Box sx={{
                width: 600,
                height: 300,
                backgroundColor: 'white',
                m: 'auto',
                position: "absolute",
                top: '20%',
                left: '30%',
                opacity: [0.9, 0.8, 0.7],
                '&:hover': {
                    backgroundColor: 'white',
                    opacity: [1, 1, 1],
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
                    <Button variant="outlined" color="secondary" type="submit">Login</Button>
                    <NextLink href={"/forgot-password"}>
                        <Button variant="outlined" color="primary" style={{marginLeft: 10}}>Forgot Password</Button>
                    </NextLink>
                </form>
                {/*<small>Already have an account? <Link to="/login">Login Here</Link></small>*/}
            </Box>
        </>
    )
}
export default Login