import { Application, Router } from "express";

import HomeController from "./controllers/home";
import authControllers from "./controllers/auth.controllers";

export default (app: Application) => {
  const router = Router();

  router.get("/", HomeController.index)

  /** Routes for Authentication */
  router.post("/signUpWithNumber", authControllers.signUpWithNumber)
  router.post("/signInWithPassword", authControllers.signInWithPassword)

  app.use("/", router);
}