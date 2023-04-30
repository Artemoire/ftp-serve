class ActiveConnector {

    /**
     * @returns {Promise<import("net").Socket>}
     */
    connect() {
        return new Promise((reject) => {
            reject(new Error('Active connection not supported'));
        })
    }

}

module.exports = { ActiveConnector };