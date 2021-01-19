const jwt = require('jsonwebtoken');

const { getClientsById } = require('../controllers/clients.controllers');
let { fetchAllClients, fetchAllPolicies } = require('../helpers/apiService');
let { authorizeUser } = require('../helpers/functions');
const { mockClients, mockPolicies } = require('../mocks');

const { CLIENT_SECRET } = process.env;
describe('Clients controller', () => {
  const req = {};
  const res = {
    send: jest.fn(() => res).mockName('send'),
    status: jest.fn(() => res).mockName('status'),
  };

  describe('getClientsById test', () => {
    const payload = mockClients.email;
    const token = jwt.sign({ payload }, CLIENT_SECRET);
    req.headers = { authorization: token };
    req.params = {
      id: 'a0ece5db-cd14-4f21-812f-966633e7be86',
    };

    fetchAllClients = jest.fn();
    fetchAllClients.mockResolvedValue(mockClients);

    fetchAllPolicies = jest.fn();
    fetchAllPolicies.mockResolvedValue(mockPolicies);

    authorizeUser = jest.fn();
    authorizeUser.mockResolvedValue([
      'britneyblankenship@quotezart.com',
      'admin',
    ]);

    test('getClientsById should be called once', async () => {
      await getClientsById(req, res);
      expect.assertions(2);
      expect(fetchAllClients).toHaveBeenCalled();
      expect(fetchAllPolicies).toHaveBeenCalled();
    });

    test('should call res.send with client and set correct status', async () => {
      await getClientsById(req, res);
      expect.assertions(2);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockClients[0]);
    });
  });
});
