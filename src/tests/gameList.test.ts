import app from '../server'; // Adjust the import to your app entry point
import request from 'supertest';
import { Game } from '../utils/games';

describe('Game List API', () => {
	it('should get all games', async () => {
		const res = await request(app).get('/games');
		expect(res.status).toBe(200);

		// The games has an array of all games.
		expect(res.body.games).toBeInstanceOf(Array);
	});

	it('should get a game by ID', async () => {
		// And then, compare the id of the first item of the all games list and compare with the res game id.

		const newGame: Game = { name: 'Test Game', rate: 5, categoryIds: [1, 2] };
		const createRes = await request(app).post('/games').send(newGame);
		const gameId = createRes.body.game.id;

		const res = await request(app).get(`/games/${gameId}`);
		expect(res.status).toBe(200);

		// And then, compare the id of the first item of the all games list and compare with the res game id.
		expect(res.body.game).toHaveProperty('id', gameId);
	});

	it('should create a new game', async () => {
		// New game base.
		const newGame: Game = { name: 'Terraria', rate: 7, categoryIds: [1, 2] };
		const res = await request(app).post('/games').send(newGame);
		expect(res.status).toBe(201);
		// Compare the original object to the game in DB.
		expect(res.body.game.name).toBe(newGame.name);
		expect(res.body.game.rate).toBe(newGame.rate);
	});

	it('should update an existing game', async () => {
		// And then, compare the id of the first item of the all games list and compare with the res game id.

		const newGame: Game = { name: 'Test Game', rate: 5, categoryIds: [1, 2] };
		const createRes = await request(app).post('/games').send(newGame);
		const gameId = createRes.body.game.id;

		const updatedGame: Game = {
			name: 'Project Zomboid 2',
			rate: 0,
			categoryIds: [1, 2],
		};
		const res = await request(app).put(`/games/${gameId}`).send(updatedGame);
		expect(res.status).toBe(200);
		expect(res.body.game.name).toBe(updatedGame.name);
		expect(res.body.game.rate).toBe(updatedGame.rate);
	});

	it('should delete a game by ID', async () => {
		// And then, compare the id of the first item of the all games list and compare with the res game id.
		const newGame: Game = { name: 'Test Game', rate: 5, categoryIds: [1, 2] };
		const createRes = await request(app).post('/games').send(newGame);
		const gameId = createRes.body.game.id;

		const res = await request(app).delete(`/games/${gameId}`);
		expect(res.status).toBe(204);
	});
});
