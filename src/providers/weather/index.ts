import { WeatherData } from "../../models/weather";

export type ForecastType = "current" | "forecast";

export interface WeatherOptions {
    type: ForecastType;
}

export interface WeatherDataProviderResponse {
    weather: {
        current?: WeatherData;
        forecast?: WeatherData[];
    }
}

export interface IWeatherProvider {
    getLocationWeather: (location: string, options?: WeatherOptions ) => Promise<WeatherDataProviderResponse>;
}

export { default as RandomWeatherProvider } from "./RandomWeatherProvider";