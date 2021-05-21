import createCore from './core.js';

const core = createCore();

try {

    core.start();
    
    process.on('SIGINT', function() {

        core.stop();
        process.exit();
    });

} catch (error) {

    console.log('Uncaught error!');
    console.error(error);
}