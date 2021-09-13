import * as express from 'express';
import Router from './routers/index';

class App {
  public express: any;
  constructor () {
    this.express = express()
    this.mountRoutes()
  }
  private mountRoutes (): void {
    this.express.use(express.json())
    this.express.use('/', new Router().routerDevOps)
  }
}
export default new App().express