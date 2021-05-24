import restaurantService from "../src/restaurantService.js";

const dataFixture = {
    restaurants: [
        {
            name: 'kfc',
            customer_rating: '3',
            distance: '1',
            price: '8',
            cuisine: 'fastfood'
        },
        {
            name: 'mcdonalds',
            customer_rating: '4',
            distance: '1',
            price: '10',
            cuisine: 'fastfood'
        },
        {
            name: 'subway',
            customer_rating: '3',
            distance: '3',
            price: '9',
            cuisine: 'fastfood'
        },
        {
            name: 'Deliciousscape',
            customer_rating: '3',
            distance: '7',
            price: '50',
            cuisine: 'American'
        },
        {
            name: 'Hideaway Delicious',
            customer_rating: '2',
            distance: '5',
            price: '40',
            cuisine: 'Greek'
        },
        {
            name: 'Outback',
            customer_rating: '5',
            distance: '4',
            price: '50',
            cuisine: 'Australian'
        },
        {
            name: 'Oaks',
            customer_rating: '4',
            distance: '2',
            price: '30',
            cuisine: 'Mexican'
        },
        {
            name: 'OutbackTwo',
            customer_rating: '5',
            distance: '4',
            price: '45',
            cuisine: 'Australian'
        },
    ]
};

describe('Testing restaurant service', () => {

    test('should return an error when retrieveBestMatchedRestaurant receive more than five parameters', async () => {

        const params = { name: 'mcdonalds', customer_rating: 4, cuisine: 'fastfood', distance: 10, price: 30, delivery: true };

        const service = restaurantService(dataFixture);

        await service.retrieveBestMatchedRestaurant(params).catch(error => {
            expect(error.message).toEqual('More than 5 parameters were provided. You can use name, customer_value, cuisine, distance, or price.');
        });
    });

    test('should return an error when retrieveBestMatchedRestaurant do not receive any param', async () => {

        const params = {};

        const service = restaurantService(dataFixture);

        await service.retrieveBestMatchedRestaurant(params).catch(error => {
            expect(error.message).toEqual('At least one parameter is mandatory. You can use name, customer_value, cuisine, distance, or price.');
        });
    });

    test('should return an empty list when no matches are found', async () => {

        const service = restaurantService(dataFixture);

        const params = { name: 'cocobambu', cuisine: 'nordestina' };

        const result = await service.retrieveBestMatchedRestaurant(params);

        expect(result).toEqual([]);
    });

    test('should return less then 5 when matches are found', async () => {

        const expectedResult = [
            {
                name: 'mcdonalds',
                customer_rating: '4',
                distance: '1',
                price: '10',
                cuisine: 'fastfood'
            },
            {
                name: 'kfc',
                customer_rating: '3',
                distance: '1',
                price: '8',
                cuisine: 'fastfood'
            },
            {
                name: 'subway',
                customer_rating: '3',
                distance: '3',
                price: '9',
                cuisine: 'fastfood'
            }
        ];

        const service = restaurantService(dataFixture);

        const params = { cuisine: 'fastfood' };

        const result = await service.retrieveBestMatchedRestaurant(params);

        expect(result.length).toEqual(3);
        expect(result).toEqual(expectedResult);
    });

    test('should return the best 5 when more thatn 5 matches are found', async () => {

        const expectedResult = [
            {
                name: 'mcdonalds',
                customer_rating: '4',
                distance: '1',
                price: '10',
                cuisine: 'fastfood'
            },
            {
                name: 'kfc',
                customer_rating: '3',
                distance: '1',
                price: '8',
                cuisine: 'fastfood'
            },
            {
                name: 'Oaks',
                customer_rating: '4',
                distance: '2',
                price: '30',
                cuisine: 'Mexican'
            },
            {
                name: 'subway',
                customer_rating: '3',
                distance: '3',
                price: '9',
                cuisine: 'fastfood'
            },
            {
                name: 'OutbackTwo',
                customer_rating: '5',
                distance: '4',
                price: '45',
                cuisine: 'Australian'
            }
        ];

        const service = restaurantService(dataFixture);

        const params = { price: 50 };

        const result = await service.retrieveBestMatchedRestaurant(params);

        expect(result.length).toEqual(5);
        expect(result).toEqual(expectedResult);
    });

    test('should be able to find a restaurant when user provide a name value partial string', async () => {

        const expectedResult = [
            {
                name: 'mcdonalds',
                customer_rating: '4',
                distance: '1',
                price: '10',
                cuisine: 'fastfood'
            }
        ];

        const service = restaurantService(dataFixture);

        const params = { name: 'McD' };

        const result = await service.retrieveBestMatchedRestaurant(params);

        expect(result.length).toEqual(1);
        expect(result).toEqual(expectedResult);
    });

    test('should be able to find a restaurant when user provide a cuisine value partial string', async () => {

        const expectedResult = [
            {
                name: 'mcdonalds',
                customer_rating: '4',
                distance: '1',
                price: '10',
                cuisine: 'fastfood'
            }
        ];

        const service = restaurantService(dataFixture);

        const params = { name: 'mcdonalds', cuisine: 'fast' };

        const result = await service.retrieveBestMatchedRestaurant(params);

        expect(result.length).toEqual(1);
        expect(result).toEqual(expectedResult);
    });

    test('should return an error when retrieveBestMatchedRestaurant receive a invalid customer_rating param', async () => {

        const params = { name: 'McDonalds', customer_rating: 'invalid_value' }

        const service = restaurantService(dataFixture);

        await service.retrieveBestMatchedRestaurant(params).catch(error => {
            expect(error.message).toEqual('Invalid Customer Rating value, should be a number and value between (1 ~ 5)');
        });
    });

    test('should return an error when retrieveBestMatchedRestaurant receive a invalid distance param', async () => {

        const params = { name: 'McDonalds', distance: 'invalid_value' }

        const service = restaurantService(dataFixture);

        await service.retrieveBestMatchedRestaurant(params).catch(error => {
            expect(error.message).toEqual('Invalid distance value, should be a number and value between (1 ~ 10)');
        });
    });

    test('should return an error when retrieveBestMatchedRestaurant receive a invalid price param', async () => {

        const params = { name: 'McDonalds', price: 'invalid_value' }

        const service = restaurantService(dataFixture);

        await service.retrieveBestMatchedRestaurant(params).catch(error => {
            expect(error.message).toEqual('Invalid price value, should be a number and value between (10 ~ 50)');
        });
    });

    test('should return customer rating match equal to or more than the provided value', async () => {

        const service = restaurantService(dataFixture);

        const params = { customer_rating: 4 };

        const result = await service.retrieveBestMatchedRestaurant(params);

        result.forEach(restaurant => {
            expect(parseInt(restaurant.customer_rating)).toBeGreaterThanOrEqual(params.customer_rating);
        });
    });

    test('should return distance match equal to or less than provided', async () => {

        const service = restaurantService(dataFixture);

        const params = { distance: 3 };

        const result = await service.retrieveBestMatchedRestaurant(params);

        result.forEach(restaurant => {
            expect(parseInt(restaurant.distance)).toBeLessThanOrEqual(params.distance);
        });
    });

    test('should return price match equal to or less than provided', async () => {

        const service = restaurantService(dataFixture);

        const params = { price: 30 };

        const result = await service.retrieveBestMatchedRestaurant(params);

        result.forEach(restaurant => {
            expect(parseInt(restaurant.price)).toBeLessThanOrEqual(params.price);
        });
    });

    test('should sort resturants by distance first', async () => {

        const testData = {
            restaurants: [
                {
                    "name": "Deliciousgenix",
                    "customer_rating": "4",
                    "distance": "3",
                    "price": "10",
                    "cuisine": "Spanish"
                },
                {
                    "name": "kfc",
                    "customer_rating": "3",
                    "distance": "1",
                    "price": "8",
                    "cuisine": "fastfood"
                },
                {
                    "name": "mcdonalds",
                    "customer_rating": "4",
                    "distance": "1",
                    "price": "20",
                    "cuisine": "fastfood"
                },
                {
                    "name": "Deliciousgenix",
                    "customer_rating": "4",
                    "distance": "9",
                    "price": "10",
                    "cuisine": "Spanish"
                }
            ]
        };

        const service = restaurantService(testData);

        const params = { price: 50 };

        const result = await service.retrieveBestMatchedRestaurant(params);

        expect(parseInt(result[0].distance)).toBeLessThan(parseInt(result[result.length - 1].distance));
    });


    test('should sort by customer rating when sorting by distance have tie', async () => {

        const testData = {
            restaurants: [
                {
                    "name": "Deliciousgenix",
                    "customer_rating": "4",
                    "distance": "3",
                    "price": "10",
                    "cuisine": "Spanish"
                },
                {
                    "name": "kfc",
                    "customer_rating": "3",
                    "distance": "1",
                    "price": "8",
                    "cuisine": "fastfood"
                },
                {
                    "name": "mcdonalds",
                    "customer_rating": "4",
                    "distance": "1",
                    "price": "20",
                    "cuisine": "fastfood"
                },
                {
                    "name": "Deliciousgenix",
                    "customer_rating": "4",
                    "distance": "9",
                    "price": "10",
                    "cuisine": "Spanish"
                }
            ]
        };

        const service = restaurantService(testData);

        const params = { price: 50 };

        const result = await service.retrieveBestMatchedRestaurant(params);

        expect(parseInt(result[0].distance)).toEqual(parseInt(result[1].distance));
        expect(parseInt(result[0].customer_rating)).toBeGreaterThan(parseInt(result[1].customer_rating));
    });

    test('should sort by price when sorting by distance and customer rating have tie', async () => {

        const service = restaurantService(dataFixture);

        const params = { cuisine: 'Australian' };

        const result = await service.retrieveBestMatchedRestaurant(params);

        expect(parseInt(result[0].distance)).toBe(parseInt(result[1].distance));
        expect(parseInt(result[0].customer_rating)).toBe(parseInt(result[1].customer_rating));
        expect(parseInt(result[0].price)).toBeLessThan(parseInt(result[1].price));
    });
});