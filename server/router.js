const controllers = require('./controllers');
const mid = require('./middleware');

// hook up controller functions with middleware checks
const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getData', mid.requiresSecure, controllers.Data.getData);
  app.get('/getDescriptive', mid.requiresSecure, controllers.Descriptive.getDescriptive);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.Data.makerPage);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);

  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.post('/maker', mid.requiresLogin, controllers.Data.make);
};

// export the router function
module.exports = router;
