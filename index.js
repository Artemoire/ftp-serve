const { FTPServer } = require("./FTPServer");

const ftp = new FTPServer();
ftp.server.listen(3000, () => {
  console.log('started');
})
