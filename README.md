# best-restaurant-app

# Additional information

In the past few months, I have been using more JavaScript on a daily basis than Java. So I chose JS ES6 to solve the problem. Also, I took advantage of a project that I was using to study design patterns, so I implemented the assessment requirements on this structure. Basically, the project was build using factories and dependency injection. The core problem of searching the restaurants was implemented on the restaurantService.js. Running the tests, you should be able to check all the requirements.

## Required tools

- [Git](https://git-scm.com/downloads) 2.24.3 or later
- [NodeJS](https://nodejs.org/en/download/) - v14.17.0
- any tool/way to call a http service, suggestion: [Postman](https://www.postman.com/downloads/)

## Premises

The following instructions in this document assumes that:

    1. You have installed all required tools defined above.
    2. You have already cloned the project using any git-based tool.
    3. You are using a shell terminal located on the project's root directory.

### On local development environment

    1. Run `npm install` to install all required dependencies for the project.
    1. Run `npm start` to run the project. The project will be available on localhost:3010

### Services

    1. Searches for restaurants according to the parameters provided. You can use at least one or any combination of up to 5 of the allowed parameters: name, customer_value, cuisine, distance or price.

   GET /restaurants/find?name=RESTAURANT_NAME&customer_rating=CUSTOMER_RATING&cuisine=CUISINE&distance=DISTANCE&price=PRICE
   
    2. Returns all available restaurants.

   GET /restaurants/all

## Run unit tests on local environment

     1. Run `npm test` to run the project tests, check the results on the terminal.

## Postman Collection

    1. Open the postman and import the restaurant-app.json that can be found on the documents/postman folder inside the project, you should be able to see samples and tests of the services.

## Additional performance and integration tests running on Postman

    1. After being able to open the collection on the postman, navigate to any of the two available services and click on the Tests tab. Then click on the send button. You should be able to see 1000 service call tests with pre-defined conditions testing the performance.