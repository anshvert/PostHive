import { CHANGEPASSWORD_MUT } from "@/graphql/mutations";
import { userInputEvent } from "@/utils/types";
import { Box, TextField, Button } from "@mui/material";
import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "urql";

const ChangePassword: NextPage<{token: string}> = ({ token }) => {
    const [,changePassword] = useMutation(CHANGEPASSWORD_MUT)
    const router: NextRouter = useRouter()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const userData = {"email": email, "newPassword": password, "token": token}
        const response = await(changePassword(userData))
        if (response.data?.changePassword.errors?.length) {
            alert(`${response.data?.login.errors[0].message}`)
        } else if (!response.data) {
            alert(`Something went Wrong !!`)
        } else {
            await router.push("/login")
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
                    borderColor: "red.500"
                }}}>
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
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
                        label="New Password"
                        onChange={(e: userInputEvent) => setPassword(e.target.value)}
                        value={password}
                        required
                        fullWidth
                        sx={{mb: 4}}
                    />
                    <Button variant="outlined" color="primary" type="submit">Change Password</Button>
                </form>
            </Box>
        </>
    )
}

ChangePassword.getInitialProps = ({query}) => {
    return {
        token: query.token as string
    }
}

export default ChangePassword
