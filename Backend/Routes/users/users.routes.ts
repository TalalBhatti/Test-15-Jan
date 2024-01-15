import { Router } from 'express';

// Controller
import UserController from './users.controller';

const routes = Router();

//all the routes to be configured here
routes.post("/login",UserController.login);
routes.post("/register",UserController.SignUp);
routes.get('/users',UserController.users);
routes.delete('/users/:id',UserController.deleteUser);


export default routes;
