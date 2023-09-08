import { Application, Router } from "express";

import HomeController from "./controllers/home";
export default (app: Application) => {
  const router = Router();

  /**  NFT retrieve API from OpenSea */
  router.get('/', HomeController.index)

  app.use("/", router);
}