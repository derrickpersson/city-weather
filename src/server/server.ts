import express from "express";
import bodyParser from "body-parser";
import healthCheck from "express-healthcheck";
import { WeatherController } from "../controllers";
import { RandomWeatherProvider } from "../providers";

const randomWeatherProvider = new RandomWeatherProvider();
const weatherController = new WeatherController(randomWeatherProvider);

const app = express();

const router = express.Router();

app.use('/api/v1/', router);

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
});

router.get('/weather', weatherController.index);

export default app;