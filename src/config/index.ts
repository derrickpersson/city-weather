import dotenv from "dotenv";
import merge from "lodash.merge";

dotenv.config();

const env = process.env.NODE_ENV || "development";

interface BaseConfig {
    env: string;
    isDev: boolean;
    isProd: boolean;
    port: number;
}


const baseConfig: BaseConfig = {
    env,
    isDev: env === "development",
    isProd: env === "production",
    port: parseInt(process.env.PORT) || 9090,
}

let envConfig = {};

switch (env) {
    case "dev":
    case "development":
        envConfig = require("./development");
        break;
    case "prod":
    case "production":
        envConfig = require("./production");
        break;
}

const config = merge(baseConfig, envConfig);

export { config };
