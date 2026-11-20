
import express from "express";
import { firestore } from "./src/config/firebase";
import sequelize from "./src/config/database";
import "./src/model/relationships";
import router from "./src/services/app";
import dotenv from "dotenv";

dotenv.config();
/* PostgreDB Connection Established */
async function startDBServer() {
  try {
    console.log("Connecting to PostgreSQL...");

    await sequelize.authenticate();
    if(process.env.DB_SYNC=="true"){
      await sequelize.sync({force: true})
    }

    console.log("PostgreSQL connected successfully!");

  } catch (error) {
    console.error("PostgreSQL connection failed:", error);
    process.exit(1);
  }
}

startDBServer();

/* Firebase Connection Established */
async function startFBServer() {
  try {
    await firestore
      .collection("test")
      .limit(1)
      .get();

    console.log("Firebase connected successfully!")
  } catch (error) {
    console.error(error);
    console.log("Firebase connection failed")
  }
}

startFBServer();

/* Router Initiated */
const app = express();

app.use(express.json());

/* app.get("/", (req, res) => {
  res.send("Server is running!");
}); */

app.use("/", router)

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});