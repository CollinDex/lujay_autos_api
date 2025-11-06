import "reflect-metadata";
import dotenv from "dotenv";
import app from "./app";
import config from "./config";
import log from "./utils/logger";
import { initializeMongoDataSource } from "./data-source";

dotenv.config();

const port = config.port;


initializeMongoDataSource()
  .then(() => {
    app.listen(port, () => {
      log.info(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => {
    log.error("Error initializing MongoDB connection:", error);
    process.exit(1);
  });
