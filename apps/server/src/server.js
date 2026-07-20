import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api", router);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`HoloTap API running on port ${port}`);
});
