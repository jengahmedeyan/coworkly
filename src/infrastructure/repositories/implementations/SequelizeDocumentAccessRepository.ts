
import {Role} from "@domain/enums/documentRole";
import { IDocumentAccessRepository } from '@domain/repositories/IDocumentAccessRepository';
import DocumentAccessModel from "@infrastructure/database/models/DocumentAccessModel";
import { injectable } from "inversify";

@injectable()
export class SequelizeDocumentAccessRepository implements IDocumentAccessRepository {
    async getUserRole(documentId: string, userId: string): Promise<Role | null> {
        const access = await DocumentAccessModel.findOne({ where: { documentId, userId } });
        return !access ? null : access.role as Role;
    }

    async setUserRole(documentId: string, userId: string, role: Role): Promise<void> {
        await DocumentAccessModel.upsert({ documentId, userId, role });
    }
}
