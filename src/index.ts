import createDebug from 'debug';
import { createServer } from 'http';
import 'dotenv/config';
import { exit } from 'process';
import { createApp } from './app.js';

const debug = createDebug('W7E:server');

const port = process.env.PORT ?? 3000;
const server = createServer(createApp());
server.listen(port);

server.on('error', (error) => {
  debug('Error', error);
  exit(1);
});

server.on('listening', () => {
  debug(`server running on http://localhost:${port}`);
});
