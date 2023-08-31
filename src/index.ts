import { MikroORM } from "@mikro-orm/core"
import {__prod__} from "./constants";
const main = async (): Promise<void> => {
    const orm = await MikroORM.init({
        dbName: "posthive",
        type: "postgresql",
        debug: !__prod__,
        entities: []
    })
}
main().then().catch()