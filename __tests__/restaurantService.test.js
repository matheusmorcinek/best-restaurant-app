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
        }
    ]
};

describe('Testing restaurant service', () => {

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
                name: 'Outback',
                customer_rating: '5',
                distance: '4',
                price: '50',
                cuisine: 'Australian'
            },
            {
                name: 'mcdonalds',
                customer_rating: '4',
                distance: '1',
                price: '10',
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
                name: 'Hideaway Delicious',
                customer_rating: '2',
                distance: '5',
                price: '40',
                cuisine: 'Greek'
            },
            {
                name: 'Deliciousscape',
                customer_rating: '3',
                distance: '7',
                price: '50',
                cuisine: 'American'
            }
        ];

        const service = restaurantService(dataFixture);

        const params = { price: 50 };

        const result = await service.retrieveBestMatchedRestaurant(params);

        expect(result.length).toEqual(5);
        expect(result).toEqual(expectedResult);
    });

    test.only('should be able to find a restaurant when user provide a partial string', async () => {

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

        console.log(result);

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

});