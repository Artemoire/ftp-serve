const { ActiveConnector } = require("./ActiveConnector");
const { PassiveConnector } = require("./PassiveConnector");

class ServerDTP {

    constructor(passiveModeConfig) {
        this.connector = new ActiveConnector();
        this.port = 21; // ?
        this.listen = "127.0.0.1";
        this.timeout = 2000; // TODO: config
        this.passiveModeConfig = passiveModeConfig;
    }

    passive() {
        this.port = this.passiveModeConfig.allocate();
        this.connector = new PassiveConnector(this.port, this.timeout);
    }

    active(clientAddress, clientPort) {

    }
}

module.exports = { ServerDTP };