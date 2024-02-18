import Server from "./server";
import dotenv from "dotenv";
dotenv.config();

const server = new Server(4000);

server.listen();
server.init();
