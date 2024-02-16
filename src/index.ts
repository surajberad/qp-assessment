import express, { Express, Request, Response } from "express";

const app: Express = express();

app.listen(4000, () => {
  console.log("App running on 4000");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hiiii");
});
