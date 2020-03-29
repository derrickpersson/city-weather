import { RandomWeatherProvider } from "../RandomWeatherProvider";
import { WeatherState } from "../../../models/weather";
import { WeatherDataProviderResponse } from "../../weather";

global.Date.now = jest.fn(() => 1585440589478) as any;
global.Math.round = jest.fn(() => 0);

describe("RandomWeatherProvider", () => {
    const randomWeatherProvider = new RandomWeatherProvider();

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
})