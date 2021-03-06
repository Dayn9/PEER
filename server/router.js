const controllers = require('./controllers');
const mid = require('./middleware');

// hook up controller functions with middleware checks
const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getData', mid.requiresSecure, controllers.Data.getData);
  app.get('/getRecentData', mid.requiresSecure, controllers.Data.getRecentData);
  app.get('/getDescriptiveNumeric', mid.requiresSecure, controllers.Descriptive.getDescriptiveNumeric);
  app.get('/getDescriptiveCategorical', mid.requiresSecure, controllers.Descriptive.getDescriptiveCategorical);
  // app.get('/retrieve', mid.requiresLogin, controllers.File.retrieveFile);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.Data.makerPage);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);

  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.post('/maker', mid.requiresLogin, controllers.Data.make);
  app.post('/upload', mid.requiresLogin, controllers.File.uploadFile);
};

// export the router function
module.exports = router;
