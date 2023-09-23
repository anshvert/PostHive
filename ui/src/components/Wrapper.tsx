import { Box } from "@mui/material"
import React from "react"

interface WrapperProps {
    children: JSX.Element
}

const Wrapper: React.FC<WrapperProps> = ({children}) => {
    return (
        <Box 
            mt={8}
            mx="auto"
            maxWidth="800px"
            width="100%"    
        >
        {children}
        </Box>
    )
}
export default Wrapper