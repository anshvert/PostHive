import {Arg, Ctx, Field, FieldResolver, InputType, Mutation, ObjectType, Query, Resolver, Root} from "type-graphql";
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

@Resolver(User)
export class UserResolver {

    @FieldResolver(() => String)
    email(@Root() user: User, @Ctx() {req}: MyContext) {
        console.log(user,req)
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { dataSource } : any
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
        const result = await dataSource
            .createQueryBuilder()
            .insert()
            .into(User)
            .values(
                { username: options.username, password: hashedPassword, "email": options.email },
            )
            .returning("*")
            .execute()
        const user = result.raw[0]
        return {user}
    }
    @Mutation(() => UserResponse)
    async login(
        @Arg('options') options: UsernamePasswordInput,
    ): Promise<UserResponse> {
        const user = await User.findOne({where : {username:options.username }})
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
        return {user}
    }
    @Mutation(() => UserResponse)
    async forgotPassword(
        @Arg('email') email: string,
    ): Promise<UserResponse> {
        const user = await User.findOne({where: {email}})
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
        const user = await User.findOne({where:{email}})
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
        await User.update({email:email},{password:hashedPassword})
        return { user }
    }
}