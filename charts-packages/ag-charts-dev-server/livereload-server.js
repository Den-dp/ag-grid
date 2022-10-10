import { WebSocketServer } from 'ws';
import { log } from './utils.js';

/**
 * @param {import('http').Server} httpServer
 * @returns {import('./types').LiveReloadServer}
 */
export function createLivereloadServer(httpServer) {
    const sockets = new Set();

    const server = new WebSocketServer({ server: httpServer });
    server.on('connection', (ws) => {
        sockets.add(ws);
        ws.on('close', () => sockets.delete(ws));
    });

    return {
        sendMessage(message) {
            sockets.forEach((ws) => ws.send(JSON.stringify(message)));
            log.ok(message);
        },
        close() {
            server.close((err) => {
                err && log.error(`Live Reload server error: ${err}`);
            });
        },
    };
}
