import { IDocumentRepository } from "@domain/repositories/IDocumentRepository";
import { TYPES } from "@infrastructure/di/types";
import { inject } from "inversify";


export class VersionDocumentUseCase {
  constructor(
    @inject(TYPES.IDocumentRepository) private documentRepository: IDocumentRepository
  ) {}

  async execute(documentId: string, content: string, userId: string) {
    return this.documentRepository.createVersion(documentId, content, userId);
}
}