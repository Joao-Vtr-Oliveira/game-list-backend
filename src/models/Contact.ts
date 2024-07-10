import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface GameInstance extends Model {
	id: number;
	name: string;
	rate: number;
	category: string;
}

export const Game = sequelize.define<GameInstance>('Game', {
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		rate: {
			type: DataTypes.INTEGER,
		},
		category: {
			type: DataTypes.STRING,
		}
	},
	{
		tableName: 'games',
		timestamps: false,
	}
);
