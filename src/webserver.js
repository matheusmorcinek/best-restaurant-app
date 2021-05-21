import express from 'express';
const app = express();
const PORT = 3010;
const BASE_PATH = '/restaurants';

import restaurantService from './restaurantService.js';

function createWebServer() {

    const _restaurantService = restaurantService();

    function start() {

        console.log('> [webserver] Starting...');
        console.log('> [webserver] Waiting for port to be available...');

        app.listen(PORT, () => {
            console.log(`> [webserver] Running on port ${PORT}...`);
        });

        app.get(`${BASE_PATH}/all`, async function (req, res) {

            res.send(await _restaurantService.retrieveAllRestaurants());
        })

        app.get(`${BASE_PATH}/find`, async function (req, res) {

            const params = req.query;

            if (Object.entries(params).length == 0) {
                res.status(400).send('Bad Request');
                return;
            }

            try {

                res.send(await _restaurantService.retrieveBestMatchedRestaurant(params))
            } catch (error) {

                res.status(400).send(error.message);
            }
        });

        console.log('> [webserver] Starting done!');
    }

    function stop() {

        console.log('> [webserver] Stopping...');
        console.log('> [webserver] Gracefully waiting for all clients...');
        console.log('> [webserver] Closing all ports...');
        console.log('> [webserver] Stopping done!');
    }

    return {
        start,
        stop
    }
}

export default createWebServer;