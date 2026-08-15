import express from "express";
import morgan from "morgan";
import cors from "cors";
import config from "./config";
import apiRoutes from "./routes/api.route";

const app = express();
app.set("port", config.PORT);

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json({ limit: "8mb" }));
app.use(express.urlencoded({ extended: false }));


app.use("/api", apiRoutes);

export default app;
