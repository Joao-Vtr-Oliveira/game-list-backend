import app from '../server'; // Ajuste o caminho conforme necessário
import request from 'supertest';
import { clearDatabase } from '../utils/dbUtils';

type Category = {
  name: string;
}

describe('Category API', () => {
  let server: any;

  beforeAll(async () => {
    server = app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
    // Espera até que o servidor esteja completamente inicializado
    await new Promise(resolve => setTimeout(resolve, 1000));
  });

  afterAll(async () => {
    await server.close();
  });

  beforeEach(async () => {
    await clearDatabase()
  });

  it('should get all categories', async () => {
    const res = await request(app).get('/categories');
    expect(res.status).toBe(200);
    expect(res.body.categories).toBeInstanceOf(Array);
  });

  it('should get a category by ID', async () => {
    const newCategory: Category = { name: 'Test Category' };
    const createRes = await request(app).post('/categories').send(newCategory);
    const categoryId = createRes.body.category.id;

    const res = await request(app).get(`/categories/${categoryId}`);
    expect(res.status).toBe(200);
    expect(res.body.category).toHaveProperty('id', categoryId);
  });

  it('should create a new category', async () => {
    const newCategory: Category = { name: 'Test Category 2' };
    const res = await request(app).post('/categories').send(newCategory);
    expect(res.status).toBe(201);
    expect(res.body.category.name).toBe(newCategory.name);
  });

  it('should update an existing category', async () => {
    const newCategory: Category = { name: 'Test Category 3' };
    const createRes = await request(app).post('/categories').send(newCategory);
    const categoryId = createRes.body.category.id;

    const updatedCategory: Category = { name: 'Updated Category' };
    const res = await request(app).put(`/categories/${categoryId}`).send(updatedCategory);
    expect(res.status).toBe(200);
    expect(res.body.category.name).toBe(updatedCategory.name);
  });

  it('should delete a category by ID', async () => {
    const newCategory: Category = { name: 'Test Category 4' };
    const createRes = await request(app).post('/categories').send(newCategory);
    const categoryId = createRes.body.category.id;

    const res = await request(app).delete(`/categories/${categoryId}`);
    expect(res.status).toBe(204);
  });
});