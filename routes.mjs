import db from './models/index.mjs';

// import your controllers here
import initRoutesController from './controllers/routes.mjs';
import initTripsController from './controllers/trips.mjs';
import initLoginController from './controllers/login.mjs';
import initSignupController from './controllers/signup.mjs';

export default function bindRoutes(app) {
  // pass in the db for all items callbacks
  const RoutesController = initRoutesController(db);
  const TripsController = initTripsController(db);
  const SignupController = initSignupController(db);
  const LoginController = initLoginController(db);

  // ROUTES
  app.get('/routes', RoutesController.index);

  // TRIP
  app.get('/trips', TripsController.index);
  app.post('/createtrip', TripsController.create);

  // USER CONTROL
  app.post('/signup', SignupController.create);
  app.post('/login', LoginController.create);
  app.delete('/logout', LoginController.destroy);
}
