import { Post } from "../entities/Post";
import { User } from "../entities/User";
import { DataSource } from "typeorm";
import path from "path"

const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "ansh2222",
    database: "posthive",
    entities: [User,Post],
    synchronize: true,
    logging: true,
    migrations: [path.join(__dirname,"../migrations/*")],
    migrationsTableName: "migration_table"
})
export default dataSource