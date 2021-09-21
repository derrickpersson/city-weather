import { RandomWeatherProvider } from "../RandomWeatherProvider";
import { WeatherState } from "../../../models/weather";
import { IWeatherProvider, WeatherDataProviderResponse } from "../../weather";

global.Date.now = jest.fn(() => 1585440589478) as any;
global.Math.round = jest.fn(() => 0);

describe("RandomWeatherProvider", () => {
    let randomWeatherProvider: IWeatherProvider;
    beforeEach(() => {
        randomWeatherProvider = new RandomWeatherProvider();
    });
    

    it("should get current Weather based on location", async () => {
        const randomWeatherOutput = {
            date: new Date(Date.now()),
            state: WeatherState.raining,
            temperature: {
                high: 0,
                low: 0,
            },
            probabilityOfPrecipitation: 0,
        }

        const expectedOutput: WeatherDataProviderResponse = {
            weather: {
                current: randomWeatherOutput,
                forecast: undefined,
            }
        }

        expect(await randomWeatherProvider.getLocationWeather("test", { type: "current" })).toEqual(expectedOutput);
    });

    it("should get forecasted Weather based on location", async () => {
        const randomWeatherOutput = (date: Date) => ({
            date,
            state: WeatherState.raining,
            temperature: {
                high: 0,
                low: 0,
            },
            probabilityOfPrecipitation: 0,
        });

        const ONE_DAY_IN_MS = 86400000;

        const expectedOutput: WeatherDataProviderResponse = {
            weather: {
                current: undefined,
                forecast: [
                    randomWeatherOutput(new Date(Date.now())),
                    randomWeatherOutput(new Date(Date.now() + 1 * ONE_DAY_IN_MS)),
                    randomWeatherOutput(new Date(Date.now() + 2 * ONE_DAY_IN_MS)),
                    randomWeatherOutput(new Date(Date.now() + 3 * ONE_DAY_IN_MS)),
                    randomWeatherOutput(new Date(Date.now() + 4 * ONE_DAY_IN_MS)),
                    randomWeatherOutput(new Date(Date.now() + 5 * ONE_DAY_IN_MS)),
                    randomWeatherOutput(new Date(Date.now() + 6 * ONE_DAY_IN_MS)),
                ],
            }
        }

        expect(await randomWeatherProvider.getLocationWeather("test", { type: "forecast" })).toEqual(expectedOutput);
    });

    it("should get throw an error when location is not provided", async () => {

        try {
            await randomWeatherProvider.getLocationWeather(undefined, undefined)
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it("should return cached data", async () => {
        const randomWeatherOutput = {
            date: new Date(Date.now()),
            state: WeatherState.raining,
            temperature: {
                high: 0,
                low: 0,
            },
            probabilityOfPrecipitation: 0,
        }

        const expectedOutput: WeatherDataProviderResponse = {
            weather: {
                current: randomWeatherOutput,
                forecast: undefined,
            },
        }

        expect(await randomWeatherProvider.getLocationWeather("test", { type: "current" })).toEqual(expectedOutput);

        const LESS_THAN_TWELVE_HOURS = 43100000
        global.Date.now = jest.fn(() => 1585440589478 + LESS_THAN_TWELVE_HOURS) as any;
        expect(await randomWeatherProvider.getLocationWeather("test", { type: "current" })).toEqual(expectedOutput);

        const OVER_TWELVE_HOURS = 43300000
        global.Date.now = jest.fn(() => 1585440589478 + OVER_TWELVE_HOURS) as any;
        
        const newRandomWeatherOutput = {
            date: new Date(Date.now()),
            state: WeatherState.raining,
            temperature: {
                high: 0,
                low: 0,
            },
            probabilityOfPrecipitation: 0,
        }

        const newExpectedOutput: WeatherDataProviderResponse = {
            weather: {
                current: randomWeatherOutput,
                forecast: undefined,
            },
        }

        expect(await randomWeatherProvider.getLocationWeather("test", { type: "current" })).toEqual(newExpectedOutput);
    });
})