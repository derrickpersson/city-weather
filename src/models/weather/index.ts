export enum WeatherState {
    raining = "raining",
    sunny = "sunny",
    cloudy = "cloudy",
    hailing = "hailing",
    snowing = "snowing",
}

export interface Temperature {
    high: number;
    low: number;
}

export interface WeatherData {
    date: Date;
    state: WeatherState;
    temperature: Temperature;
    probabilityOfPrecipitation: number;
}