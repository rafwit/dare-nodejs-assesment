const router = require('express').Router();
const { retrieveAllClients } = require('./controllers/clients.controller');
const { loginUser } = require('./controllers/login.controller');

router.post('/login', loginUser);

router.get('/policies', (req, res) => {
  res.send("you hit the endpoint 'policies'");
});
router.get('/policies/:id', (req, res) => {
  res.send("you hit the endpoint 'policies/:id'");
});

router.get('/clients', retrieveAllClients);
router.get('/clients/:id', (req, res) => {
  res.send("you hit the endpoint 'clients/:id'");
});
router.get('/clients/:id/policies', (req, res) => {
  res.send("you hit the endpoint 'clients:id/policies'");
});
router.get('*', (req, res) => {
  res.status(404).send('Sorry, not found 😞');
});

module.exports = router;
