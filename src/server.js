import "dotenv/config";
import app from "./app.js";
import db from "./config/db.js";

await db.conn();

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}...`);
});
