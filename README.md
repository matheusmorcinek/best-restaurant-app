# best-restaurant-app

# additional assumptions
The solution was implemented using factories and dependency injection to make it easy to separate the app by modules and so facilitation the testing.
## Required tools

- [Git](https://git-scm.com/downloads) 2.24.3 or later
- [NodeJS](https://nodejs.org/en/download/) - v14.17.0
- any tool/way to call a http service, suggestion: [Postman](https://www.postman.com/downloads/)

## Premises

The following instructions in this document assumes that:
    * You have installed all required tools defined in [this section](#required-tools)
    * You have already cloned the project using any git-based tool.
    * You are using a shell terminal located on the project's root directory.

### On local development environment

    1. Run `npm install` to install all required dependencies for the project.
    1. Run `npm start` to run the project. The project will be available on localhost:3010
    
## Runnint unit tests on local environment

     1. Run `npm test` to run the project tests, check the results on the terminal.

### Services

   GET /restaurants/find?name=RESTAURANT_NAME&customer_rating=CUSTOMER_RATING&cuisine=CUISINE&distance=DISTANCE&price=PRICE
   
   GET /restaurants/all

## Postman Collection

    1. Open the postman and import the restaurant-app.json that can be found on the documents/postman folder inside the project, you should be able to see samples and tests of the services.

## Performance tests

    1. After being able to open the collection on the postman, navigate to any of the two available services and click on the Tests tab. Then click on the send button. You should be able to see 1000 service call tests with pre-defined conditions testing the performance.




