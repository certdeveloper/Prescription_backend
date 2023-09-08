import { Application, Router } from "express";

import HomeController from "./controllers/home";

export default (app: Application) => {
  const router = Router();

  router.get('/', HomeController.index)

  /** Routes for Authentication */

  app.use("/", router);
}