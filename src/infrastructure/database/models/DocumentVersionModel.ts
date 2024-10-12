import { DataTypes, Model } from "sequelize";
import sequelize from '@infrastructure/database/sequelize';

class DocumentVersionModel extends Model {
  public id!: string;
  public documentId!: string;
  public content!: string;
  public version!: number;
  public createdBy!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

DocumentVersionModel.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  documentId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  version: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  sequelize,
  tableName: 'document_versions',
  timestamps: true
});

export default DocumentVersionModel;