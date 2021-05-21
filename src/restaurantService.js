import csv from 'csvtojson';
const DATA_PATH = './data/data.csv'

function restaurantService(data = {}) {

    const _restaurants = data.restaurants || _retrieveDataFromCSV();

    async function retrieveAllRestaurants() {

        return await restaurants;
    }

    async function retrieveBestMatchedRestaurant(params) {

        //TODO extrair para método de validaçoes
        if (Object.entries(params).length == 0) {
            throw Error('At least one parameter is mandatory');
        }

        if (params.name && typeof params.name != 'string') {
            throw Error('Invalid name value');
        }

        //testing


        if (params.customer_rating) {

            throw Error('Invalid Customer Rating value, should be a number and value between (1 ~ 5)');
        }

        if (typeof parseInt(params.customer_rating) != 'number') {

            throw Error('Invalid Customer Rating value, should be a number and value between (1 ~ 5)');
        }

        if (parseInt(params.customer_rating) < 1 || parseInt(params.customer_rating) > 5) {

            throw Error('Invalid Customer Rating value, should be a number and value between (1 ~ 5)');
        }

        if (params.price &&
            typeof parseInt(params.price) != 'number' &&
            (parseInt(params.price) < 10 || parseInt(params.price) > 50)) {

            throw Error('Invalid price value, should be a number and value between (10 ~ 50)');
        }

        if (params.distance &&
            typeof parseInt(params.distance) != 'number' &&
            (parseInt(params.distance) < 1 || parseInt(params.distance) > 10)) {

            throw Error('Invalid distance value, should be a number and value between (1 ~ 10)');
        }

        if (params.cuisine && typeof params.cuisine != 'string') {
            throw Error('Invalid cuisine value');
        }

        const filters = _buildFilters(params);
        const filterKeys = Object.keys(filters);

        const restaurants = await _restaurants;

        const result = restaurants.filter(restaurant => {

            //TODO test
            return filterKeys.every(index => {

                if (typeof filters[index] !== 'function') {
                    return true;
                }
                return filters[index](restaurant[index], params[index])
            });

        });

        //TODO test
        const sortedResult = result.sort((current, next) => {

            if (current.distance < next.distance) return -1;
            if (current.customer_rating > next.customer_rating) return -1;
            if (current.price < next.price) return -1;
        });

        return sortedResult.slice(0, 5);
    }

    async function _retrieveDataFromCSV() {

        return await csv().fromFile(DATA_PATH)
    }

    function _buildFilters({ name, customer_rating, distance, price, cuisine }) {

        //TODO TEST FILTERS
        const filters = {
            ...(name && { name: _matchesInTheValue }),
            ...(customer_rating && { customer_rating: _checkGreaterOrEqual }),
            ...(distance && { distance: _checkEqualOrLess }),
            ...(price && { price: _checkEqualOrLess }),
            ...(cuisine && { cuisine: _matchesInTheValue })
        };

        return filters;
    }

    function _matchesInTheValue(current, value) {

        if (current.toLocaleLowerCase() == value.toLocaleLowerCase()) {
            return true;
        }

        return current.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1;
    }

    function _checkGreaterOrEqual(current, value) {

        return current >= value;
    }

    function _checkEqualOrLess(current, value) {

        return current <= value;
    }

    return {
        retrieveAllRestaurants,
        retrieveBestMatchedRestaurant
    }
}

export default restaurantService;