const request = require('supertest');
const app = require('..');

describe('POST /login', () => {
  test('LOGIN - success', async () => {
    expect.assertions(4);
    const response = await request(app)
      .post('/login')
      .send({ username: 'britneyblankenship@quotezart.com' })
      .expect(200);
    expect(response.body.token).toBeTruthy();
    expect(response.body.token.length).toBe(189);
    expect(response.body.type).toBeTruthy();
    expect(response.body.type).toBe('Bearer');
  });

  test('LOGIN - failure', async () => {
    expect.assertions(4);
    const response = await request(app)
      .post('/login')
      .send({ username: 'nonexistinguser@email.com' })
      .expect(400);
    expect(response.body.code).toBeTruthy();
    expect(response.body.code).toBe(400);
    expect(response.body.message).toBeTruthy();
    expect(response.body.message).toBe('User not found');
  });
});
