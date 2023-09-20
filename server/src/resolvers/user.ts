import {Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver} from "type-graphql";
import {MyContext} from "../types";
import {User} from "../entities/User";
import argon2 from "argon2"
import {sendEmail} from "../utils/sendEmail";
import {v4} from "uuid";

@InputType()
class UsernamePasswordInput {
    @Field()
    username: string
    @Field()
    password: string
    @Field()
    email?: string
}

@ObjectType()
class FieldError {
    @Field()
    field: string
    @Field()
    message: string
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError],{ nullable: true })
    errors?: FieldError[]
    @Field(() => User, { nullable: true } )
    user?: User
}

@Resolver()
export class UserResolver {
    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { em }: MyContext
    ): Promise<UserResponse> {
        if (options.username.length <= 2) {
            return {
                errors: [{
                    field: "username",
                    message: "length must be greater than 2"
                }]
            }
        }
        if (options.password.length <= 3) {
            return {
                errors: [{
                    field: "password",
                    message: "length must be greater than 3"
                }]
            }
        }
        const hashedPassword: string = await argon2.hash(options.password)
        const user: User = em.create(User,{ username: options.username, password: hashedPassword,email: options.email} as User)
        await em.persistAndFlush(user)
        return {user}
    }
    @Mutation(() => UserResponse)
    async login(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() {em}: MyContext
    ): Promise<UserResponse> {
        const user = await em.findOne(User,{username: options.username })
        if (!user) {
            return {
                errors: [{
                    field: "username",
                    message: "username doesn't exist"
                }]
            }
        }
        const validPassword: boolean = await argon2.verify(user.password,options.password)
        if (!validPassword) {
            return {
                errors: [{
                    field: "password",
                    message: "incorrect password"
                }]
            }
        }
        //req.session.userId = user.id
        return {user}
    }
    @Mutation(() => UserResponse)
    async forgotPassword(
        @Arg('email') email: string,
        @Ctx() {em}: MyContext
    ): Promise<UserResponse> {
        const user = await em.findOne(User,{email: email})
        if (!user) {
            return {
                errors: [
                    {
                        field: "email",
                        message: "No user with this email exists!"
                    }
                ]
            }
        }
        const token: string = v4()
        const forgotPasswordLink: string = `<a href='http://localhost:3000/change-password/${token}'>Reset Password</a>`
        await sendEmail(email,forgotPasswordLink)
        return { user }
    }
    @Mutation(() => UserResponse)
    async changePassword(
        @Arg('email') email: string,
        @Arg('newPassword') newPassword: string,
        @Arg('token') token: string,
        @Ctx() {em}: MyContext
    ): Promise<UserResponse> {
        if (newPassword.length <= 2) {
            return {
                errors:[
                    {
                        field: "newPassword",
                        message: "length must be greater than 2"
                    }
            ]}
        }
        const user = await em.findOne(User,{email: email})
        if (!user) {
            return {
                errors:[
                    {
                        field: "email",
                        message: "User doesn't exist"
                    }
                ]
            }
        }
        const hashedPassword: string = await argon2.hash(newPassword)
        user.password = hashedPassword
        em.persistAndFlush(user)
        return { user }
    }
}