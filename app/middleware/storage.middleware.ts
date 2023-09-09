import { Request } from "express";
import multer from "multer";

const letterHeadImageStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, 'uploads/lead_head_image/')
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const prescriptionStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, 'uploads/prescriptions/')
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export default {
  letterHead: multer({storage: letterHeadImageStorage}),
  prescriptions: multer({storage: prescriptionStorage})
}
