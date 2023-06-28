import express from "express";
import { json } from "body-parser";
import cors from "cors";
import path from "path";

import routes from "./src/routes";
import db from "./src/config/db";

db.init();

const app = express();
app.use(json());
app.use(
  cors({
    origin: "*",
  })
);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "./src/uploads")));

app.use("/api", routes);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
