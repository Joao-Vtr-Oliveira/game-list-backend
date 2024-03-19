import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface ContactInstance extends Model {
	id: number;
	name: string;
	email: string;
	phone: string;
}

export const Contact = sequelize.define<ContactInstance>('Contact', {
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
		},
		phone: {
			type: DataTypes.STRING,
			unique: true,
		},
	},
	{
		tableName: 'contacts',
		timestamps: false,
	}
);
