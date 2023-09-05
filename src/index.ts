import "reflect-metadata"
import {Connection, IDatabaseDriver, MikroORM} from "@mikro-orm/core"
import microConfig from "./micro-orm.config";
import express, {Express} from "express"
import {ApolloServer, ExpressContext} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import {HelloResolver} from "./resolvers/hello";
import {PostResolver} from "./resolvers/post";
import {UserResolver} from "./resolvers/user";
import RedisStore from "connect-redis"
import session from "express-session"
import {createClient} from "redis"
import {__prod__} from "./constants";
import cors from 'cors'

const main = async (): Promise<void> => {
    const orm: MikroORM<IDatabaseDriver<Connection>> = await MikroORM.init(microConfig)
    await orm.getMigrator().up()
    const ormFork = orm.em.fork()
    const app: Express = express()

    let redisClient = createClient()
    redisClient.connect().catch(console.error)
    let redisStore: RedisStore = new RedisStore({
        client: redisClient,
        disableTouch: true,
    })
    app.use(
        cors({
            origin: ["http://localhost:4000", "https://studio.apollographql.com"],
            credentials: true,
        })
    );
    app.use(
        session({
            name: "quid",
            store: redisStore,
            resave: false, // required: force lightweight session keep alive (touch)
            saveUninitialized: false, // recommended: only save session when data exist
            secret: "random stuff for secret key",
            cookie: {
                maxAge: 60*60*24*365*1000, // 1 Year
                httpOnly: true,
                secure: true,
                sameSite: "none"
            }
        })
    )
    const apolloServer: ApolloServer<ExpressContext> = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver,PostResolver,UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({em: ormFork ,req,res})
    })
    await apolloServer.start()
    apolloServer.applyMiddleware({app})
    app.listen(4000,()=>{
        console.log("App listening on 4000")
    })
}
main().then().catch()