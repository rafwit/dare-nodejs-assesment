const axios = require('axios');
const authenticateUser = require('../middleware/authentication');

function retrieveAllPoliecies() {
  authenticateUser()
    .then((res) => {
      axios
        .get('https://dare-nodejs-assessment.herokuapp.com/api/policies', {
          headers: {
            Authorization: `Bearer ${res.data.token}`,
          },
        })
        .then((resp) => console.log(resp));
    })
    .catch((error) => console.log(error));
}

module.exports = { retrieveAllPoliecies };
