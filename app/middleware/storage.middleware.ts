import { Request } from "express";
import { existsSync, mkdirSync } from "fs";
import { mkdir } from "fs/promises";
import multer from "multer";
/**
 * @param directory : sub directory of uploads folder
 * @returns multer.Multer
 * 
 * @example
 * storage("images").single("file")
 */
const storage = (directory: string) => {
  const diskStorage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
      console.log(req.body, 'body')
      const path = "uploads/" + directory;
      if (!existsSync(path)) {
        mkdir(path);
      }
      cb(null, path)
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  })
  return multer({storage: diskStorage})
}

export default storage;