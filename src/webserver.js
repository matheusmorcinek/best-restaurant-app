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

            // if (!params.hasOwnProperty('name')) {
            //     res.status(400).send('Bad Request - name param is missing');
            //     return;
            // }

            // if (!params.hasOwnProperty('customer_rating')) {
            //     res.status(400).send('Bad Request - customer_rating param is missing');
            //     return;
            // }

            // if (!params.hasOwnProperty('distance')) {
            //     res.status(400).send('Bad Request - distance param is missing');
            //     return;
            // }
            // if (!params.hasOwnProperty('price')) {
            //     res.status(400).send('Bad Request - price param is missing');
            //     return;
            // }
            // if (!params.hasOwnProperty('cuisine')) {
            //     res.status(400).send('Bad Request - cuisine param is missing');
            //     return;
            // }

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