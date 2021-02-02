const router = require('express').Router();
const {
  getAllClients,
  getClientsById,
  getClientPoliecies,
} = require('./controllers/clients.controllers');
const { authenticateUser } = require('./controllers/login.controller');
const {
  getAllPolicies,
  getPolicyClientDetails,
} = require('./controllers/policies.controller');
const { authorizeUser } = require('./middleware/authorization');
const { handleError } = require('./middleware/handle.errors');

router.post('/login', authenticateUser);

router.get('*', authorizeUser);

router.get('/policies', getAllPolicies);
router.get('/policies/:id', getPolicyClientDetails);

router.get('/clients', getAllClients);
router.get('/clients/:id', getClientsById);
router.get('/clients/:id/policies', getClientPoliecies);

router.get('*', handleError);

module.exports = router;
