const net = require('net');

class PassiveConnector {

    constructor(port, timeout) {
        this.timeout = timeout;
        this.port = port;
    }

    /**
     * @returns {Promise<net.Socket>}
     */
    connect() {
        return new Promise((resolve, reject) => {
            console.log('TIMEOUT:', this.timeout, 'PORT:', this.port);
            const timeoutId = setTimeout(() => reject(new Error('Data connection timed out')), 10000);

            const server = net.createServer((socket) => {
                console.log('CONNECTED');
                clearTimeout(timeoutId);
                resolve(socket);
            });

            server.listen(this.port, () => {
                console.log('listenin');
            }); // TODO: catch error on listen
        });
    }

}

module.exports = { PassiveConnector }