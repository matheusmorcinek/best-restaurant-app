import dataForge from 'data-forge-fs';

const RESTAURANTS_FILE_PATH = './data/restaurants.csv';
const CUISINES_FILE_PATH = './data/cuisines.csv';
const DATA_PATH = './data/data.csv';

function createDatabaseConnection() {

    function start() {

        console.log('> [database] Starting...');
        console.log('> [database] Connecting to database...');
        console.log('> [database] Running migrations...');

        _loadRestaurants();

        console.log('> [database] Starting done!');

        // intentionally throwing an error here, to prove that when running the core test, we are testing the unit / component independently
        // throw new Error('Connection failed!');
    }

    function stop() {

        console.log('> [database] Stopping...');
        console.log('> [database] Closing database connection...');
        console.log('> [database] Stopping done!');
    }

    function _loadRestaurants() {

        const restaurants = dataForge.readFileSync(RESTAURANTS_FILE_PATH).parseCSV();
        const cuisines = dataForge.readFileSync(CUISINES_FILE_PATH).parseCSV();

        const dataJoined = restaurants.join(
            cuisines,
            restaurant => restaurant.cuisine_id,
            cuisine => cuisine.id,
            (restaurant, cuisine) => {
                const { cuisine_id, ...rest } = restaurant;
                return {
                    ...rest,
                    cuisine: cuisine.name
                };
            }
        );

        // dataJoined.asCSV().writeFileSync(DATA_PATH);
    }

    return {
        start,
        stop
    }
}

export default createDatabaseConnection;