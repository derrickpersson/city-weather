import { WeatherController } from "../index";
import { IWeatherProvider } from "../../../providers/weather";
import { WeatherState } from "../../../models/weather";
import { Request } from "express";

const mockWeatherData = {
    date: new Date(),
    state: "raining" as WeatherState,
    temperature: {
        high: 20,
        low: 10,
    },
    probabilityOfPrecipitation: 50,
}

const mockProviderResponse = {
    weather: {
        current: mockWeatherData,
    }
}


const mockWeatherProvider: IWeatherProvider = {
    getLocationWeather: jest.fn(() => new Promise((resolve) => {
        resolve(mockProviderResponse);
    }))
}

describe("weatherController", () => {
    const weatherController = new WeatherController(mockWeatherProvider);

    it("index route should return weather data when given valid query parameters", async () => {
        const mockRequest = {
            query: {
                location: "test",
                type: "current",
            }
        } as Request;

        const mockResponse = {
            send: jest.fn(),
        } as any;

        await weatherController.index(mockRequest, mockResponse);

        expect(mockResponse.send).toBeCalledWith({
            location: "test",
            ...mockProviderResponse,
        });
    });
})