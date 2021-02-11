const request = require('supertest');
const app = require('..');

let adminToken;
let userToken;

beforeAll(async () => {
  const LogInUserRoleAdminResponse = await request(app)
    .post('/login')
    .send({ username: 'britneyblankenship@quotezart.com' });

  const LogInUserRoleUserResponse = await request(app)
    .post('/login')
    .send({ username: 'barnettblankenship@quotezart.com' });

  adminToken = LogInUserRoleAdminResponse.body.token;
  userToken = LogInUserRoleUserResponse.body.token;
});

describe('GET /clients', () => {
  test('Should return more than one client for the user role "admin"', async () => {
    expect.assertions(2);
    const response = await request(app)
      .get('/clients')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(response.body).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(1);
  });

  test('Schould return exactly one client for the user role "user"', async () => {
    expect.assertions(2);
    const response = await request(app)
      .get('/clients')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    expect(response.body).toBeTruthy();
    expect(response.body.length).toBe(1);
  });

  test('Response.body schould contain correct number of properties', async () => {
    expect.assertions(1);
    const response = await request(app)
      .get('/clients')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    expect(Object.keys(response.body[0])).toHaveLength(5);
  });

  test('Response.body should contain correct properites', async () => {
    expect.assertions(5);
    const response = await request(app)
      .get('/clients')
      .set('Authorization', `Bearer ${userToken}`)
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

  test('Schould return requested client if requested by the user role "admin', async () => {
    expect.assertions(3);
    const response = await request(app)
      .get('/clients')
      .query({ name: 'barnettblankenship@quotezart.com' })
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(response.body).toBeTruthy();
    expect(response.body).toHaveLength(1);
    expect(response.body[0].email).toEqual('barnettblankenship@quotezart.com');
  });
});

describe('GET /clients/:id', () => {
  test('Shoudl return any client if requested by the user role "admin"', async () => {
    expect.assertions(2);
    const response = await request(app)
      .get('/clients/a3b8d425-2b60-4ad7-becc-bedf2ef860bd')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body[0].id).toEqual('a3b8d425-2b60-4ad7-becc-bedf2ef860bd');
  });

  test('Shoudl return 403 Unauthorized error if the user role "user" requests client/:id !== user.id', async () => {
    expect.assertions(2);
    const response = await request(app)
      .get('/clients/a0ece5db-cd14-4f21-812f-966633e7be86')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(403);

    expect(response.error).toBeTruthy();
    expect(response.statusCode).toBe(403);
  });
});
