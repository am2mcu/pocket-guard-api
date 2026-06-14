import { connect } from "mongoose";

export default {
  uri: process.env.DB_URI,
  async conn() {
    try {
      await connect(this.uri);
      console.log("Connected to DB...");
    } catch (err) {
      console.log("Coudln't connect to DB...");
      process.exit(1);
    }
  },
};
