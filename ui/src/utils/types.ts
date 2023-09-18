import React from "react";

export type userInputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
export interface User {
    username: string
    email: string
    password: string
}