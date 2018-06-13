const apicall = require('./controllers/apicall');

module.exports = app => {
  app.post('/city', apicall.weather);
};
