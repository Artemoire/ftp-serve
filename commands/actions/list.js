const { asyncSocketWrite } = require("../../sock");
const { executeIfAuthenticated } = require("../FTPCommand");

const BIN_LS_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const binLsFormat = (file) => {
    const flags = file.dir ? 'drwxr-xr-x 1 owner group' : 'rw-r--r-- 1 owner group';
    const size = file.size.toString().padStart(13, ' ');
    const sixMonthsAgo = new Date() - (1000 * 60 * 60 * 24 * 30 * 6);
    const modifiedDate = new Date(file.modified);
    const month = BIN_LS_MONTHS[modifiedDate.getMonth()];
    const date = modifiedDate.getDate().toString().padStart(' ', 2);
    const timeOfDay = modifiedDate.getHours().toString().padStart(2, '0') + ":" + modifiedDate.getMinutes().toString().padStart(2, '0');
    const year = modifiedDate.getFullYear().toString().padStart(5, ' ');
    const recent = `${month} ${date} ${timeOfDay}`;
    const nonRecent = `${month} ${date} ${year}`;
    const modified = file.modified > sixMonthsAgo ? recent : nonRecent;

    return `${flags} ${size} ${modified} ${file.name}\r\n`;
}

const listAction = executeIfAuthenticated(async (session, parameter) => {
    try {
        const dataConnection = await session.dtp.connector.connect();
        const fileList = await session.fsClient.list(); // TODO: theory - how can instruct what to do with a result ?
        await session.status(150, 'Here comes the directory listing.')
        const listResponse = fileList.map(binLsFormat).join("");
        await asyncSocketWrite(dataConnection, listResponse);
        await session.status(226, 'Directory send OK.')
        dataConnection.destroy(); // TODO: end
    } catch (error) {
        console.log('ERROR ' + error);
        throw error;
    }
});

module.exports = listAction