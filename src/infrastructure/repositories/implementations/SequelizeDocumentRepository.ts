import { IDocumentRepository } from '@domain/repositories/IDocumentRepository';
import { DocumentVersion } from '@domain/entities/documentVersionEntity';
import { injectable } from 'inversify';

@injectable()
export class SequelizeDocumentRepository implements IDocumentRepository {
    async createVersion(documentId: string, content: string, userId: string): Promise<DocumentVersion> {
        return {} as DocumentVersion;
    }

    async getDocumentVersions(documentId: string): Promise<DocumentVersion[]> {
        return [];
    }

    async revertToVersion(documentId: string, versionNumber: number): Promise<void> {
      return;
    }

    async lockDocument(documentId: string, userId: string): Promise<void> {
    }

    async unlockDocument(documentId: string, userId: string): Promise<void> {
    }

    async isDocumentLocked(documentId: string): Promise<boolean> {
        return false;
    }
}
