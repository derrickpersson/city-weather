import { Request, Response } from "express";
import { IWeatherProvider } from "../../providers/weather";

export class WeatherController {
    private weatherProvider: IWeatherProvider;

    constructor(weatherProvider: IWeatherProvider){
        this.weatherProvider = weatherProvider;
    }

    public index = async (request: Request, response: Response) => {
        const { location, type } = request.query;

        const weatherData = await this.weatherProvider.getLocationWeather(location, { type });

        const weatherDataResponse = {
            location,
            ...weatherData,
        }

        response.send(weatherDataResponse);
    }
}

export default WeatherController;