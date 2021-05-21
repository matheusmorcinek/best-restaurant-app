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
            name: 'macdonalds',
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
        }
    ]
};

describe('Testing restaurant service', () => {

    let service;

    beforeEach(() => {
        //arrange
        service = restaurantService(mockedData);
    });

    // test('should contain the method #start and #stop', async () => {

    //     service = restaurantService(mockedData);

    //     const params = { name: 'macdonalds', cuisine: 'fastfood' };

    //     const result = await service.retrieveBestMatchedRestaurant(params);

    //     console.log('testando _______');
    //     console.log(result);

    //     // expect(core).toHaveProperty('start');
    //     // expect(core).toHaveProperty('stop');
    // });

    test('should return an error when retrieveBestMatchedRestaurant receive a invalid param', () => {

        //arrange
        const params = {name: 'McDonalds', }

        //act


        //assert

    });
});