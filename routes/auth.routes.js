import { login, register } from '../controllers/auth.controllers';

const routes = (app, prefix) => {
   //login route
   app.route(`${prefix}/login`).get(login);

  //  register route
   app.route(`${prefix}/register`).post(register);
};

export default routes;
