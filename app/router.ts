import { Application, Router } from "express";

import HomeController from "./controllers/home";
import authControllers from "./controllers/auth.controllers";
import storage from "./middleware/storage.middleware";
import authMiddleware from "./middleware/auth.middleware";
import profileControllers from "./controllers/profile.controllers";

export default (app: Application) => {
  const router = Router();

  router.get("/", HomeController.index)

  /** Routes for Authentication */
  router.post("/signUpWithNumber", authControllers.signUpWithNumber)
  router.post("/signInWithPassword", authControllers.signInWithPassword)
  router.post("/signInWithJWT", authControllers.signInWithJWT)
  
  /** Routes for Letter header image management */
  router.post("/letterHeadImage/add", authMiddleware.authenticate, storage('letter_head_images').single('file'), profileControllers.addLeadHeadImage)
  
  app.use("/", router);
}