import { FORGOTPASSWORD_MUT } from "@/graphql/mutations"
import { userInputEvent } from "@/utils/types"
import { Box, TextField, Button } from "@mui/material"
import { NextRouter, useRouter } from "next/router"
import React, { useState } from "react"
import { useMutation } from "urql"

const ForgotPassword: React.FC<{}> = ({}) => {
    const [,forgotPassword] = useMutation(FORGOTPASSWORD_MUT)
    const router: NextRouter = useRouter()
    const [email, setEmail] = useState<string>("")

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const userData = {"email": email}
        const response = await(forgotPassword(userData))
        if (response.data?.forgotPassword.errors?.length) {
            alert(`${response.data?.login.errors[0].message}`)
            return
        } else if (!response.data) {
            alert(`Something went Wrong !!`)
            return
        } else {
            await router.push("/")
        }
        alert("Email sent regarding password change! Please check your email")
        return
    }

    return (    
        <>
            <Box sx={{
                width: 600,
                height: 200,
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
                    <Button variant="outlined" color="primary" type="submit">Send Email</Button>
                </form>
            </Box>
        </>
    )
}
export default ForgotPassword