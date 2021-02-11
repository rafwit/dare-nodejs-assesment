const request = require('supertest');
const app = require('..');

let token;

beforeAll(async () => {
  const response = await request(app)
    .post('/login')
    .send({ username: 'britneyblankenship@quotezart.com' });

  token = response.body.token;
});

describe('GET /policies', () => {
  test('Schould return all policies if requested by user role "admin"', async () => {
    expect.assertions(2);
    const response = await request(app)
      .get('/policies')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(1);
  });

  test('Response.body schould contain correct number of properties', async () => {
    expect.assertions(1);
    const response = await request(app)
      .get('/clients')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Object.keys(response.body[0])).toHaveLength(5);
  });

  test('Response.body should contain correct properites', async () => {
    expect.assertions(5);
    const response = await request(app)
      .get('/policies')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(
      Boolean(response.body[0].id && typeof response.body[0].id === 'string')
    ).toBe(true);
    expect(
      Boolean(
        response.body[0].amountInsured &&
          typeof response.body[0].amountInsured === 'string'
      )
    ).toBe(true);
    expect(
      Boolean(
        response.body[0].email && typeof response.body[0].email === 'string'
      )
    ).toBe(true);
    expect(
      Boolean(
        response.body[0].inceptionDate &&
          typeof response.body[0].inceptionDate === 'string'
      )
    ).toBe(true);
    expect(
      Boolean(
        response.body[0].installmentPayment &&
          typeof response.body[0].installmentPayment === 'boolean'
      )
    ).toBe(true);
  });
});

describe('GET /policies/:id', () => {
  test('Should return client with all its properties if correct id requested', async () => {
    expect.assertions(5);
    const response = await request(app)
      .get('/policies/56b415d6-53ee-4481-994f-4bffa47b5239')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(
      Boolean(response.body[0].id && typeof response.body[0].id === 'string')
    ).toBe(true);
    expect(
      Boolean(
        response.body[0].name && typeof response.body[0].name === 'string'
      )
    ).toBe(true);
    expect(
      Boolean(
        response.body[0].email && typeof response.body[0].email === 'string'
      )
    ).toBe(true);
    expect(
      Boolean(
        response.body[0].role && typeof response.body[0].role === 'string'
      )
    ).toBe(true);
    expect(Array.isArray(response.body[0].policies)).toBe(true);
  });

  test('Schould return 404 Not Found error if requested for non-existing id', async () => {
    expect.assertions(2);
    const response = await request(app)
      .get('/policies/a0ece5db-cd14-4f21-812f-966633e7be86')
      .set('Authorization', `Bearer ${token}`)
      .expect(404);

    expect(response.error).toBeTruthy();
    expect(response.statusCode).toBe(404);
  });
});
