import { Request, Response, NextFunction } from "express";
import { IUser } from "../../interfaces/user";
import { UserNotFoundException } from "../../exceptions/UserNotFoundException";
//import { userModel } from '../../models/users';
class UserController {
  createUser(req: Request, res: Response, next: NextFunction) {
    let user: IUser = req.body;
    // let createUser = new userModel(user);
    // createUser.save().then(savedPost:any=> {
    //   res.send(savedPost);
    // })
    next(new UserNotFoundException(id));
    res.send("Hello");
  }
}

export default new UserController();
