import { IWeatherProvider, WeatherOptions, WeatherDataProviderResponse } from "../weather";
import { WeatherData, WeatherState } from "../../models/weather";

interface WeatherCacheData extends WeatherDataProviderResponse {
    expire: number;
}

interface WeatherCache {
    [key: string]: WeatherCacheData;
}

const TWELVE_HOURS = 43200000;

export class RandomWeatherProvider implements IWeatherProvider {
    private weatherCache: WeatherCache = {};

    public getLocationWeather: (location: string, options?: WeatherOptions) => Promise<WeatherDataProviderResponse>
        = (location: string, options?: WeatherOptions) => {
        return new Promise((resolve, reject) => {
            if(!location){
                reject(new Error("Location not provided"));
            }

            let current;
            if(options.type === "current" || !options.type){
                current = this.getRandomWeatherData(0);
            }

            let forecast;
            if(options.type === "forecast" || !options.type){
                forecast = ([...Array(7)]).map((element, index) => this.getRandomWeatherData(index));
            }

            const cachedWeather = this.weatherCache[location]?.weather;
            const expiryDate = Date.now() + TWELVE_HOURS;
            this.weatherCache[location] = {
                weather: {
                    current: this.isValidCachedData(location) ? cachedWeather?.current : current,
                    forecast: this.isValidCachedData(location) ? cachedWeather?.forecast : forecast,
                },
                expire: expiryDate,
            }

            resolve({
                weather: this.weatherCache[location].weather,
            })
        });
    }

    private getRandomWeatherData: (daysFromToday: number) => WeatherData = (daysFromToday: number) => {
        const currentMS = Date.now();
        const MS_IN_DAYS = 86400000;
        const futureMS = daysFromToday * MS_IN_DAYS;

        return {
            date: new Date(currentMS + futureMS),
            state: this.getRandomWeatherState(),
            temperature: {
                high: this.getRandomNumberBetween(10, 25),
                low: this.getRandomNumberBetween(0, 10),
            },
            probabilityOfPrecipitation: this.getRandomNumberBetween(0, 100),
        }
    }

    private isValidCachedData = (location: string) => {
        const NOW = Date.now();
        const cachedLocation = this.weatherCache[location];
        return !!cachedLocation && NOW <= cachedLocation.expire
    }

    private getRandomWeatherState: () => WeatherState = () => {
        const weatherStateValues = Object.values(WeatherState);
        const randomIndex = this.getRandomNumberBetween(0, weatherStateValues.length);
        return weatherStateValues[randomIndex];
    }

    private getRandomNumberBetween: (min: number, max: number) => number 
        = (min: number, max: number) => {
            return Math.round(Math.random() * (max - min) + min);
    }

}

export default RandomWeatherProvider;