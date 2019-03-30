import express from 'express';
import userRouter from './modules/user/route';

export default class Routes {

  public app: express.Application;
  constructor(app: express.Application) {
    this.app = app;
    this.init();
  }

  private init(): void {
    this.app.get('/', (req, res) => {
      res.status(200).json({message: 'Welcome to the TODO API .'});
    });
    this.app.use('/users', userRouter);
  }
}