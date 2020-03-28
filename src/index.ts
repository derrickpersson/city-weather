import { config } from "./config";
import { server } from "./server";

server.listen(config.port, () => console.log("App running on port: " + config.port))