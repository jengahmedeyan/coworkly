import 'reflect-metadata';
import 'module-alias/register';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { initDatabase } from '@infrastructure/database/sequelize';
import  createExpressApp from '@infrastructure/http/expressApp';
import collaborationHandler from '@adapters/sockets/collaboration';

dotenv.config();

const app = createExpressApp();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

initDatabase();

collaborationHandler(io);

const PORT = process.env.PORT || 3000;
const SOCKET_PORT = process.env.SOCKET_PORT || 3001;

server.listen(SOCKET_PORT, () => {
  console.log('\x1b[36m',`Socket.IO server running on port ${SOCKET_PORT}`,'\x1b[0m');
});

app.listen(PORT, () => {
  console.log('\x1b[36m',`Express API server running on port ${PORT}`,'\x1b[0m');
});
