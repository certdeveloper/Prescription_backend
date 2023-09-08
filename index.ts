import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import router from "./app/router";
import helmet from "helmet";
import hpp from "hpp";

dotenv.config();
const app: Express = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
router(app);

app.listen(port || 3000, () => {
  return console.log("Server :: running on " + port);
});