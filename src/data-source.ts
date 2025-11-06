import mongoose from "mongoose";
import config from "./config";
import log from "./utils/logger";


const MONGO_URI = config.MONGO_URI || `mongodb://${config.MONGO_HOST}:${config.MONGO_PORT}/${config.MONGO_DB_NAME}`;

export async function initializeMongoDataSource() {
  try {
    await mongoose.connect(MONGO_URI);
    log.info("MongoDB connected successfully");
  } catch (error) {
    log.error("Error connecting to MongoDB:", error);
    throw error;
  }
}


export async function closeMongoConnection() {
  await mongoose.connection.close();
  console.log("Mongoose connection closed.");
}
