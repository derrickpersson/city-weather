import { IWeatherProvider, WeatherOptions, WeatherDataProviderResponse } from "../weather";
import { WeatherData, WeatherState } from "../../models/weather";

export class RandomWeatherProvider implements IWeatherProvider {
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

            resolve({
                weather: {
                    current,
                    forecast,
                }
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