import { startServer } from '../server';
import request from 'supertest';


type Category = {
	name: string;
};

describe('Category API', () => {
	let server: any;

	beforeAll(async () => {
		server = await startServer();
	});

  afterAll(async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });


	it('should get all categories', async () => {
		const res = await request(server).get('/categories');
		expect(res.status).toBe(200);
		expect(res.body.categories).toBeInstanceOf(Array);
	});

	it('should get a category by ID', async () => { 
		const newCategory: Category = { name: 'Test Category' };
		const createRes = await request(server)
			.post('/categories')
			.send(newCategory);
		const categoryId = createRes.body.category.id;

		const res = await request(server).get(`/categories/${categoryId}`);
		expect(res.status).toBe(200);
		expect(res.body.category).toHaveProperty('id', categoryId);
		await request(server).delete(`/categories/${categoryId}`);
	});

	it('should create a new category', async () => {
		const newCategory: Category = { name: 'Test Category 2' };
		const res = await request(server).post('/categories').send(newCategory);
		expect(res.status).toBe(201);
		expect(res.body.category.name).toBe(newCategory.name);
		await request(server).delete(`/categories/${res.body.category.id}`);
	});

	it('should update an existing category', async () => {
		const newCategory: Category = { name: 'Test Category 3' };
		const createRes = await request(server)
			.post('/categories')
			.send(newCategory);
		const categoryId = createRes.body.category.id;

		const updatedCategory: Category = { name: 'Updated Category' };
		const res = await request(server)
			.put(`/categories/${categoryId}`)
			.send(updatedCategory);
		expect(res.status).toBe(200);
		expect(res.body.category.name).toBe(updatedCategory.name);
		await request(server).delete(`/categories/${categoryId}`);
	});

	it('should delete a category by ID', async () => {
		const newCategory: Category = { name: 'Test Category 4' };
		const createRes = await request(server)
			.post('/categories')
			.send(newCategory);
		const categoryId = createRes.body.category.id;

		const res = await request(server).delete(`/categories/${categoryId}`);
		expect(res.status).toBe(204);
	});
});
