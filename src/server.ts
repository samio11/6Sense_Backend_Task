import { Server } from "http";
import dns from "dns";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

let server: Server;

async function startServer() {
  try {
    await mongoose.connect(config.DATABASE as string);
    console.log("MongoDB connected successfully");
    server = app.listen(config.PORT, () => {
      console.log(`Server Runs at PORT:- http://localhost:${config.PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}

(async () => {
  await startServer();
})();

process.on("unhandledRejection", (err) => {
  console.log(`UnHandled Rejection:- ${err}`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("uncaughtException", (err) => {
  console.log(`UnCaught Exception:- ${err}`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("SIGTERM", () => {
  console.log(`SIGNAL TERMINATION !!!`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});