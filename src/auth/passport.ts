import passport from 'passport';
import * as express from 'express';
export default class Auth {
  public app: express.Application;
  constructor(app: express.Application) {
    this.app = app;
    this.init();
  }

  init(): void {
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    passport.serializeUser((user, done) => {
      done(null, user);
    });
    passport.deserializeUser((user, done) => {
      done(null, user);
    });
  }

}