import { FTPServer } from "./FTPServer";

const x = new FTPServer();
x.server.listen(3000, '127.0.0.1');