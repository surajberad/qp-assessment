import express, { Application } from "express";
import router from "./router";
import mongoose from "mongoose";
import bodyParser from "body-parser";

export default class Server {
  public app: Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
  }

  public init(): void {
    this.setupRoutes();
    this.setupMongoDb();
  }

  private async setupMongoDb(): Promise<void> {
    mongoose.connect(process.env.MONGODB_URL as string).then(() => {
      console.log("Connected to database");
    });
  }

  private setupRoutes(): void {
    this.app.use("/api", bodyParser.json(), router);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}
