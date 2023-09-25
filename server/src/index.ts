import "reflect-metadata"
import express, {Express} from "express"
import {ApolloServer, ExpressContext} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import {PostResolver} from "./resolvers/post";
import {UserResolver} from "./resolvers/user";
import dataSource  from "./utils/postgresSource";

const main = async (): Promise<void> => {

    const AppDataSource = dataSource
    AppDataSource.initialize()
    .then(() => {
        console.log("Iniliased typeorm !")
    })
    .catch((error) => console.log(error))
    const app: Express = express()

    const apolloServer: ApolloServer<ExpressContext> = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PostResolver,UserResolver],
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