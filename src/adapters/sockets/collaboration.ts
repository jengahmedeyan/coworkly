import { Server, Socket } from 'socket.io';
import { CollaborationService } from '@application/services/collaborationService';
import { TYPES } from '@infrastructure/di/types';
import container from '@infrastructure/di/inversify.config';

const collaborationService = container.get<CollaborationService>(TYPES.CollaborationService);

const collaborationHandler = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log('New client connected');

        socket.on('join-document', async (documentId: string) => {
            try {
                const userId = socket.id;
                await collaborationService.joinDocument(documentId, userId);
                socket.join(documentId);
                console.log(`User ${userId} joined document ${documentId}`);
            } catch (error) {
            }
        });

        socket.on('document-update', async (documentId: string, content: string) => {
            try {
                const userId = socket.id;
                await collaborationService.updateDocument(documentId, content, userId);
                socket.to(documentId).emit('receive-update', content);
            } catch (error) {
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};


export default collaborationHandler;