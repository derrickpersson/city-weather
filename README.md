

## Notes

### User Stories

As a developer, I need a way to get the weather for a specific city via an API.

Additional Assumptions / User Stories:

As a developer, I need a way to get the current weather for a specific city via an API.
As a developer, I need a way to get the 7 day forecast of weather for a specific city via an API.

Stretch:
As a user, I need a user account to save personalized information about the weather.
As an authenticated user, I need to save cities to my favourites.
As an authenticated user, I need a way to retrieve cities on my favourite list.

### API Design

base path = /v1/

weather => GET /weather

Acceptable query parameters:

location='City,Province/State?,Country?' => If Province & Country not provided, searches by city name only, if more than one result is present, returns an error. Else, will return the match.

type="current"|"forecast" => if not provided both types of information will be returned

```typescript
enum WeatherState {
    raining = "raining",
    sunny = "sunny",
    cloudy = "cloudy",
    hailing = "hailing",
    snowing = "snowing",
}

interface Temperature {
    high: number;
    low: number;
}

interface WeatherData {
    date: Date;
    state: WeatherState;
    temperature: Temperature;
    probabilityOfPrecipitation: number;
}

interface WeatherResponse {
        location: string;
        weather: {
            current: WeatherData;
            forecast: WeatherData[];
        }
    }
```

Stretch:

user registration = POST /register => allows user to register an account for the service

user login = POST /login => allows user to log into their account on the service

Add city to their favourite list = POST /favourites => authenticated user sends location data, saved to their favourites list.

Get favourites = GET /favourites => authenticated user gets list of their favourite cities.

### Date
Monday, March 30th, 2020

### Location of deployed application
If applicable, please provide the url where we can find and interact with your running application.


### Time spent
How much time did you spend on the assignment? Normally, this is expressed in hours.


### Assumptions made
Use this section to tell us about any assumptions that you made when creating your solution.


### Shortcuts/Compromises made
If applicable. Did you do something that you feel could have been done better in a real-world application? Please
let us know.


### Stretch goals attempted
If applicable, use this area to tell us what stretch goals you attempted. What went well? What do you wish you
could have done better? If you didn't attempt any of the stretch goals, feel free to let us know why.


### Instructions to run assignment locally
If applicable, please provide us with the necessary instructions to run your solution.


### What did you not include in your solution that you want us to know about?
Were you short on time and not able to include something that you want us to know
about? Please list it here so that we know that you considered it.


### Other information about your submission that you feel it's important that we know if applicable.


### Your feedback on this technical challenge
Have feedback for how we could make this assignment better? Please let us know