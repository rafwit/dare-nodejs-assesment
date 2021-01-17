const router = require('express').Router();
const { getAllClients } = require('./controllers/clients.controller');

router.post('/login', getAllClients);

router.get('/policies', (req, res) => {
  res.send("you hit the endpoint 'policies'");
});
router.get('/policies/:id', (req, res) => {
  res.send("you hit the endpoint 'policies/:id'");
});

router.get('/clients', (req, res) => {
  res.send("you hit the endpoint 'clients'");
});
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
