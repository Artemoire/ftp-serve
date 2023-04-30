/**
 * @param {import("net").Socket} socket 
 * @param {Buffer} buffer 
 */
const asyncSocketWrite = (socket, buffer) => {
    return new Promise((resolve, reject) => {
        socket.write(buffer, (err) => {
            if (err) reject(err);
            else resolve();
        })
    })
}

module.exports = { asyncSocketWrite };