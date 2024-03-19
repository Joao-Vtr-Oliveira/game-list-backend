import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface ContatoInstance extends Model {
	id: number;
	name: string;
	email: string;
	phone: string;
}

export const Contato = sequelize.define<ContatoInstance>('Contato', {
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
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
		tableName: 'contatos',
		timestamps: false,
	}
);
