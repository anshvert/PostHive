import "reflect-metadata"
import {Connection, IDatabaseDriver, MikroORM} from "@mikro-orm/core"
import microConfig from "./micro-orm.config";
import express, {Express} from "express"
import {ApolloServer, ExpressContext} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import {HelloResolver} from "./resolvers/hello";
import {PostResolver} from "./resolvers/post";
import {UserResolver} from "./resolvers/user";

const main = async (): Promise<void> => {
    const orm: MikroORM<IDatabaseDriver<Connection>> = await MikroORM.init(microConfig)
    await orm.getMigrator().up()
    const ormFork = orm.em.fork()

    const app: Express = express()
    const apolloServer: ApolloServer<ExpressContext> = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver,PostResolver,UserResolver],
            validate: false
        }),
        context: () => ({em: ormFork})
    })
    await apolloServer.start()
    apolloServer.applyMiddleware({app})
    app.listen(4000,()=>{
        console.log("App listening on 4000")
    })
}
main().then().catch()