"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = require("../entities/Post");
const User_1 = require("../entities/User");
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const Updoot_1 = require("../entities/Updoot");
const dataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "ansh2222",
    database: "posthive",
    entities: [User_1.User, Post_1.Post, Updoot_1.Updoot],
    synchronize: true,
    logging: true,
    migrations: [path_1.default.join(__dirname, "../migrations/*")],
    migrationsTableName: "migration_table"
});
exports.default = dataSource;
//# sourceMappingURL=postgresSource.js.map