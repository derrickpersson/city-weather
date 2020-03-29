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

const mockWeatherProviderError: IWeatherProvider = {
    getLocationWeather: jest.fn(() => new Promise((resolve, reject) => {
        reject(new Error());
    })),
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

    it("index route should return an error when not given valid query parameters", async () => {
        const mockRequest = {
            query: {
                location: undefined,
                type: "current",
            }
        } as Request;

        const mockResponse = {
            status: jest.fn(() => mockResponse),
            send: jest.fn(),
        } as any;

        const weatherController = new WeatherController(mockWeatherProviderError);

        await weatherController.index(mockRequest, mockResponse);

        expect(mockResponse.status).toBeCalledWith(400);
        expect(mockResponse.send).toBeCalled();
    });
})