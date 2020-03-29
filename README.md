

## Notes

### User Stories

As a developer, I need a way to get the weather for a specific city via an API.

Additional Assumptions / User Stories:

As a developer, I need a way to get the current weather for a specific city via an API.
As a developer, I need a way to get the 7 day forecast of weather for a specific city via an API.

Stretch (not implemented):
As a user, I need a user account to save personalized information about the weather.
As an authenticated user, I need to save cities to my favourites.
As an authenticated user, I need a way to retrieve cities on my favourite list.

### Tech Stack Decision

I chose Node.js, Typescript & Express as my primary tech stack. 

Node.js uses an event driven architecture, because of this it is able to scale to support many client request calls - despite being 'single threaded'. If this were a real world application; it would scale quite well as demand increases. It could also easily be horizontally scaled.

I chose Typescript over Javascript because of type checking, which I feel is an important language feature. It makes the developer experience much more enjoyable, and increases the maintability of code.

I chose Express because it is a fast and minimal web server framework for Node.js.

### API Design

base path = /v1/

weather => GET /weather

Acceptable query parameters:

location="city" => If location is not provided returns an error. Else, will return weather data for that city.

type="current"|"forecast" => if not provided both types of information will be returned

```typescript
interface WeatherResponse {
    location: string;
    weather: {
        current: WeatherData;
        forecast: WeatherData[];
    }
}

interface WeatherData {
    date: Date;
    state: WeatherState;
    temperature: Temperature;
    probabilityOfPrecipitation: number;
}

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
```

Stretch (not implemented):

user registration = POST /register => allows user to register an account for the service

user login = POST /login => allows user to log into their account on the service

Add city to their favourite list = POST /favourites => authenticated user sends location data, saved to their favourites list.

Get favourites = GET /favourites => authenticated user gets list of their favourite cities.

### Date
Monday, March 30th, 2020

### Location of deployed application
[Deployed on Heroku](https://nameless-cliffs-85809.herokuapp.com/api/v1/weather?location=Vancouver&type=current)
(Free tier - so will be slow to start up)

### Time spent
Design & basic app set up - 2 hours
Implementation - 2.5 hours
Deployment - 0.5 hour

Total - 5 hours

### Assumptions made
I wrote additional user stories (listed above) that outline some of the assumptions I made about the requirements. In a real world scenario I would have asked stakeholders if they agreed with these user stories and would revise or proceed from there.


### Shortcuts/Compromises made
Handled the location parameter. Currently is ignored completely because the data that is generated is random, so location didn't matter. In a real application the location would be used to find the cities weather.

I originally planned on having a list of 'valid cities' that the API would support - with the intent to have a list of all major valid cities in North America. Unfortunately, I wasn't able to procure such a list and therefore I felt it better to just leave the location parameter unhandled and return the fake data that would be generated.


### Stretch goals attempted
I had originally planned to tackle the authentication stretch goal, unfortunately I ran out of time to complete this. Instead I decided to tackle the deployment stretch goal.


### Instructions to run assignment locally

```bash
npm i
npm run build
npm run start
```

### What did you not include in your solution that you want us to know about?
Were you short on time and not able to include something that you want us to know
about? Please list it here so that we know that you considered it.


### Other information about your submission that you feel it's important that we know if applicable.
Added in 'production' end points like /info & /heath, these are important for monitoring of the application.

### Your feedback on this technical challenge
Overall I felt it is pretty well outlined - I would have appreciated a quick 5 minute video call to go over the assignment & understand next steps in the hiring process.