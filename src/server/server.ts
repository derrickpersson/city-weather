import express from "express";
import bodyParser from "body-parser";
import healthCheck from "express-healthcheck";

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/health', healthCheck());

app.get('/info', async function (req, res) {
    const packageJson = require("../../package.json");
    res.send({
        name: packageJson.name,
        description: packageJson.description,
        version: packageJson.version
    });
})

export default app;