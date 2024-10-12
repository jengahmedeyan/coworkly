export class DocumentVersion {
  constructor(
    public id: string,
    public documentId: string,
    public content: string,
    public versionNumber: string,
    public createdBy: string,
    public createdAt: Date
  ) { }
}