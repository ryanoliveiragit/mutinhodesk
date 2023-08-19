import express from "express";
import cors from "cors";
import useRoutes from "./routes/products.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", useRoutes);

app.listen(3300);
