import { Application, Router } from "express";

import HomeController from "./controllers/home";
import authControllers from "./controllers/auth.controllers";
import storage from "./middleware/storage.middleware";
import authMiddleware from "./middleware/auth.middleware";
import profileControllers from "./controllers/profile.controllers";
import prescriptionsControllers from "./controllers/prescriptions.controllers";

export default (app: Application) => {
  const router = Router();

  router.get("/", HomeController.index)

  /** Routes for Authentication */
  router.post("/signUpWithNumber", authControllers.signUpWithNumber)
  router.post("/signInWithPassword", authControllers.signInWithPassword)
  router.post("/signInWithJWT", authControllers.signInWithJWT)
  
  /** Routes for Letter header image management */
  router.post("/letterHeadImage/add", authMiddleware.authenticate, storage('letter_head_images').single('file'), profileControllers.addLeadHeadImage)
  router.get('/letterHeadImage', profileControllers.getLetterHeadImage)
  router.post('/letterHeadImage/update', authMiddleware.authenticate, profileControllers.updateLetterHeadImage)
  
  /** Routes for Prescription history */
  router.post("/prescriptions/add", authMiddleware.authenticate, storage('prescriptions_pdf').single('file'), prescriptionsControllers.add)
  router.get('/prescription', prescriptionsControllers.get)
  router.get('/prescriptions/all', prescriptionsControllers.getAll)
  router.delete('/prescription/delete', prescriptionsControllers.deleteOne)

  app.use("/", router);
}