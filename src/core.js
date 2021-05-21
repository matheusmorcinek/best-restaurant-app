import createDatabaseConnection from './database.js';
import createWebServer from './webserver.js';

function createCore(configurations = {}) {

    const database = configurations.database || createDatabaseConnection();
    const webserver = configurations.webserver || createWebServer();

    function start() {

        console.log(`> [Core] starting...`);
        database.start();
        webserver.start();
        console.log(`> [Core] Starting done! System running!`);
    }


    function stop() {

        console.log('\n> [Core] stopping...');
        database.stop();
        webserver.stop();
        console.log('> [Core] Stopping done!');
    }

    return {
        start,
        stop
    }
}

export default createCore;