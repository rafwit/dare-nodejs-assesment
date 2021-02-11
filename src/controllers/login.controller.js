const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'lalala this isnt secure';
const { fetchAllClients } = require('../helpers/apiService');

const {
  checkIfClientExistAndVerifyRole,
  provideInsuranceToken,
} = require('../helpers/functions');

const { myCache } = require('../helpers/cache');
const { getTokenValidTime } = require('../helpers/get-token-valid-time');

async function authenticateUser(req, res, next) {
  const { username } = req.body;

  try {
    const insuranceToken = await provideInsuranceToken();

    const clients = await fetchAllClients(
      insuranceToken.type,
      insuranceToken.token
    );
    const user = checkIfClientExistAndVerifyRole(clients.data, username);

    if (!user) {
      res.status(400).send({ code: 400, message: 'User not found' });
    } else {
      const userToken = jwt.sign({ username }, SECRET_KEY, {
        expiresIn: '0.5h',
      });

      const validTill = getTokenValidTime(userToken);

      myCache.set(username, `${username} ${user.role} ${user.id}`);
      res.status(200).send({
        token: userToken,
        type: 'Bearer',
        expires_in: validTill,
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { authenticateUser };
