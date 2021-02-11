const request = require('supertest');
const app = require('../index');

describe('POST /login', () => {
  test('LOGIN - success', () => {
    expect.assertions(4);
    return request(app)
      .post('/login')
      .send({ username: 'britneyblankenship@quotezart.com' })
      .expect(200)
      .then((response) => {
        expect(response.body.token).toBeTruthy();
        expect(response.body.token.length).toBe(189);
        expect(response.body.type).toBeTruthy();
        expect(response.body.type).toBe('Bearer');
      });
  });

  test('LOGIN - failure', () => {
    expect.assertions(4);
    return request(app)
      .post('/login')
      .send({ username: 'nonexistinguser@email.com' })
      .expect(400)
      .then((response) => {
        expect(response.body.code).toBeTruthy();
        expect(response.body.code).toBe(400);
        expect(response.body.message).toBeTruthy();
        expect(response.body.message).toBe('User not found');
      });
  });
});
