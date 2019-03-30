import * as jwt from 'jwt-simple';
import * as passport from 'passport';
import moment from 'moment';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '../models/users';
import { IUser} from '../interfaces/user';
import {Request ,Response} from 'express';

class Auth {

  public initialize = () => {
    passport.use('jwt', this.getStrategy());
    return passport.initialize();
  }

  public authenticate = (callback: any) => {
    passport.authenticate('jwt', { session: false, failWithError: true }, callback);
  }

  private genToken = (user: IUser): Object => {
    const expires = moment().utc().add({ days: 7 }).unix();
    const token = jwt.encode({
      exp: expires,
      username: user.email,
    }, 'process.env.JWT_SECRET');

    return {
      token: 'JWT ' + token,
      expires: moment.unix(expires).format(),
      user: user._id,
    };
  }

  public login = async (req: Request, res: Response) => {
    try {
      //req.checkBody('username', 'Invalid username').notEmpty();
      //req.checkBody('password', 'Invalid password').notEmpty();

      //const errors = req.validationErrors();
      //if (errors) throw errors;

      const user = await User.findOne({ username: req.body.username }).exec();

      if (user === null) throw 'User not found';

      const success = await user.comparePassword(req.body.password);
      if (success === false) throw "";

      res.status(200).json(this.genToken(user));
    } catch (err) {
      res.status(401).json({ message: 'Invalid credentials', errors: err });
    }
  }

  private getStrategy = (): Strategy => {
    const params = {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeader(),
      passReqToCallback: true,
    };

    return new Strategy(params, (req: any, payload: any, done: any) => {
      user.findOne({ username: payload.username }, (err: Error, user: IUser) => {
        /* istanbul ignore next: passport response */
        if (err) {
          return done(err);
        }
        /* istanbul ignore next: passport response */
        if (user === null) {
          return done(null, false, { message: 'The user in the token was not found' });
        }

        return done(null, { _id: user._id, username: user.username });
      });
    });
  }

}

export default new Auth();