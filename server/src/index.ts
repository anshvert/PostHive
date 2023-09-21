import "reflect-metadata"
import express, {Express} from "express"
import {ApolloServer, ExpressContext} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import {HelloResolver} from "./resolvers/hello";
import {PostResolver} from "./resolvers/post";
import {UserResolver} from "./resolvers/user";
import {DataSource} from 'typeorm'
import { User } from "./entities/User";
import { Post } from "./entities/Post";

const main = async (): Promise<void> => {

    const AppDataSource = new DataSource({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "ansh2222",
        database: "posthive",
        entities: [User,Post],
        synchronize: true,
        logging: true,
    })
    AppDataSource.initialize()
    .then(() => {
        console.log("Iniliased typeorm")
    })
    .catch((error) => console.log(error))
    const app: Express = express()
    
    const apolloServer: ApolloServer<ExpressContext> = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver,PostResolver,UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ dataSource:AppDataSource, req,res})
    })
    await apolloServer.start()
    apolloServer.applyMiddleware({app})
    app.listen(4000,()=>{
        console.log("App listening on 4000")
    })
}
main().then().catch()