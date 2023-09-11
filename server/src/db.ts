import { DataSource } from "typeorm";
import { env } from "./env";
import User from "./entities/Users";
import Game from "./entities/Games";
import Point from "./entities/Points";

export default new DataSource({
    type: "postgres",
    host: typeof env.DB_HOST !== "undefined" ? env.DB_HOST : "db",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    entities: [User, Game, Point],
    logging: ["error"],
});