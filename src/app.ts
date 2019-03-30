import bodyParser from 'body-parser';
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import Routes from './route';
import Auth from './auth/auth';
import errorMiddleware from './middlewares/error.middleware';

class App {

  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.initializeErrorHandling();
    this.initRoutes();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(session({ secret: 'abc' }));
    this.app.use(Auth.initialize());
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initRoutes(): void {
    new Routes(this.app);
  }

}

export default new App().app;