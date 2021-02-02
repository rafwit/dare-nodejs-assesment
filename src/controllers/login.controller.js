const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'lalala this isnt secure';
const {
  renewInsuranceToken,
  fetchAllClients,
} = require('../helpers/apiService');

const {
  checkIfClientExistAndVerifyRole,
  setTokenValidTime,
} = require('../helpers/functions');

const { myCache } = require('../helpers/cache');

async function authenticateUser(req, res, next) {
  const { username } = req.body;
  let insuranceToken = myCache.get('insurance_token');
  if (insuranceToken === undefined) {
    await renewInsuranceToken();
    insuranceToken = myCache.get('insurance_token');
  }
  try {
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

      const validTill = setTokenValidTime(userToken);

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
