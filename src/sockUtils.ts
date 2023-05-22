import { Socket } from "net";

export function asyncSocketWrite(socket: Socket, buffer: string | Uint8Array): Promise<void> {
  return new Promise((resolve, reject) => socket.write(buffer, (err) => {
    if (err) reject(err);
    else resolve();
  }));
}

export function asyncSocketEnd(socket: Socket): Promise<void> {
  return new Promise((resolve, reject) => socket.end(resolve));
}