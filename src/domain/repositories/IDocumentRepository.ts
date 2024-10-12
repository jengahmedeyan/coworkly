import { DocumentVersion } from "@domain/entities/documentVersionEntity";

export interface IDocumentRepository {
  createVersion(documentId: string, content: string, userId: string): Promise<DocumentVersion>;
  getDocumentVersions(documentId: string): Promise<DocumentVersion[]>;
  revertToVersion(documentId: string, versionNumber: number): Promise<void>;
  lockDocument(documentId: string, userId: string): Promise<void>;
  unlockDocument(documentId: string, userId: string): Promise<void>;
  isDocumentLocked(documentId: string): Promise<boolean>;
}