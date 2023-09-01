import {__prod__} from "./constants";
import {Post} from "./entities/Post";
import {MikroORM} from "@mikro-orm/core";
import path from "path";

export default {
    migrations: {
        path:  path.join(__dirname,"./migrations"),
        glob: '!(*.d).{js,ts}'
    },
    dbName: "posthive",
    type: "postgresql",
    debug: !__prod__,
    entities: [Post],
    password: "ansh2222"
} as Parameters<typeof MikroORM.init>[0]

