import { Model, DataTypes } from 'sequelize';
import sequelize from '@infrastructure/database/sequelize';

class UserModel extends Model {
  id!: string;
  email!: string;
  password!: string;
  role!: string;
}

UserModel.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'users',
  timestamps: true
});

export default UserModel;
