"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const Post_1 = require("./entities/Post");
const path_1 = __importDefault(require("path"));
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, "./migrations"),
        glob: '!(*.d).{js,ts}'
    },
    dbName: "posthive",
    type: "postgresql",
    debug: !constants_1.__prod__,
    entities: [Post_1.Post],
    password: "ansh2222"
};
//# sourceMappingURL=micro-orm.config.js.map