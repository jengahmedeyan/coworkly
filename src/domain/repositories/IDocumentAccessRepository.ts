import { Role } from "@domain/enums/documentRole";

export interface IDocumentAccessRepository {
  getUserRole(documentId: string, userId: string): Promise<Role | null>;
  setUserRole(documentId: string, userId: string, role: Role): Promise<void>;
}
