import { Request, Response } from "express";
import axios from 'axios';

const index = async (req: Request, res: Response) => {
  res.json("Hello World")
}


export default {
  index
}