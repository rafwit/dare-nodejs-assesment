const router = require('express').Router();
const {
  getAllClients,
  getClientsById,
  getClientPoliecies,
} = require('./controllers/clients.controllers');
const { loginUser } = require('./controllers/login.controller');
const {
  getAllPolicies,
  getPolicyClientDetails,
} = require('./controllers/policies.controller');

router.post('/login', loginUser);

router.get('/policies', getAllPolicies);
router.get('/policies/:id', getPolicyClientDetails);

router.get('/clients', getAllClients);
router.get('/clients/:id', getClientsById);
router.get('/clients/:id/policies', getClientPoliecies);

router.get('*', (req, res) => {
  res.status(404).send('Sorry, not found 😞');
});

module.exports = router;
