import { inject, injectable } from 'inversify';
import { IDocumentRepository } from '../../domain/repositories/IDocumentRepository';
import { TYPES } from '@infrastructure/di/types';
import { IDocumentAccessRepository } from '@domain/repositories/IDocumentAccessRepository';

@injectable()
export class CollaborationService {
  constructor(
    @inject(TYPES.IDocumentRepository) private documentRepository: IDocumentRepository,
    @inject(TYPES.IDocumentAccessRepository) private documentAccessRepository: IDocumentAccessRepository
  ) {}

  async joinDocument(documentId: string, userId: string): Promise<void> {
    const role = await this.documentAccessRepository.getUserRole(documentId, userId);
    if (role !== 'editor') {
        throw new Error('User does not have edit permissions');
    }
  }

  async updateDocument(documentId: string, content: string, userId: string): Promise<void> {
    const isLocked = await this.documentRepository.isDocumentLocked(documentId);
    if (isLocked) {
        throw new Error('Document is currently locked');
    }
    await this.documentRepository.createVersion(documentId, content, userId);
  }

  async lockDocument(documentId: string, userId: string): Promise<void> {
    await this.documentRepository.lockDocument(documentId, userId);
  }

  async unlockDocument(documentId: string, userId: string): Promise<void> {
    await this.documentRepository.unlockDocument(documentId, userId);
  }

}