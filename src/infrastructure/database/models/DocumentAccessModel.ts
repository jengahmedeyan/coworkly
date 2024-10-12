import { Model, DataTypes } from "sequelize";
import sequelize from '@infrastructure/database/sequelize';
import UserModel from "./UserModel";
import DocumentModel from "./DocumentModel";

class DocumentAccessModel extends Model {
  public id!: string;
  public documentId!: string;
  public userId!: string;
  public role!: 'viewer' | 'editor';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

DocumentAccessModel.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  documentId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: DocumentModel,
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: UserModel,
      key: 'id'
    }
  },
  role: {
    type: DataTypes.ENUM('viewer', 'editor'),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'document_access',
  timestamps: true
});

export default DocumentAccessModel;