import createCore from "../src/core.js";

function createMock(){

    function start() {

        console.log('> [mock] ...');
    }

    function start() {

        console.log('> [mock] ...');
    }

    return {
        start, 
        stop
    }
}

describe('Testing core when imported', () => {

    test('should contain the method #start and #stop', () => {

        const core = createCore();

        expect(core).toHaveProperty('start');
        expect(core).toHaveProperty('stop');
    });

    test('when started, should not throw errors', () => {

        const databaseMock = createMock();
        const webserverMock = createMock(); 

        const core = createCore({
            database: databaseMock,
            webserver: webserverMock
        });

        expect(() => {
            core.start();
        }).not.toThrow();
    });
});