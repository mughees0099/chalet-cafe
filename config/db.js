import mongoose, { connect } from "mongoose";

async function DatabaseConnection() {
  try {
    await connect(process.env.MONGODB_URI);
    console.log(" connected successfully");
  } catch (error) {
    console.log();
  }
}

export default DatabaseConnection;
