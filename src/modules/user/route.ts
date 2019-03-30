import { Router } from 'express';
import UserController  from './controller';
class UserRouter {

  router: Router;
  
  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.get('/', UserController.createUser);
  }
}

const userRouter = new UserRouter();
userRouter.init();

export default userRouter.router;