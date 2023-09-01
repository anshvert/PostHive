import {Connection, EntityManager, IDatabaseDriver, MikroORM} from "@mikro-orm/core"
import {Post} from "./entities/Post";
import microConfig from "./micro-orm.config";
const main = async (): Promise<void> => {
    const orm: MikroORM<IDatabaseDriver<Connection>> = await MikroORM.init(microConfig)
    await orm.getMigrator().up()
    const ormFork = orm.em.fork()
    //const post = ormFork.create(Post,{ title:"First Post" } as Post)
    //await ormFork.persistAndFlush(post)
    const posts = await ormFork.find(Post,{})
    console.log(posts)
}
main().then().catch()