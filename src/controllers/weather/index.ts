import { Request, Response } from "express";
import { IWeatherProvider } from "../../providers/weather";

export class WeatherController {
    private weatherProvider: IWeatherProvider;

    constructor(weatherProvider: IWeatherProvider){
        this.weatherProvider = weatherProvider;
    }

    public index = async (request: Request, response: Response) => {
        const { location, type } = request.query;

        try {

            const weatherData = await this.weatherProvider.getLocationWeather(location, { type });

            const weatherDataResponse = {
                location,
                ...weatherData,
            }
    
            response.send(weatherDataResponse);

        } catch (error) {

            response.status(400).send({
                error: error.message,
            });

        }

    }
}

export default WeatherController;