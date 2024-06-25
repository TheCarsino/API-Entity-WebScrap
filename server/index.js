import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import entityRoutes from "./routes/entity.routes.js";

dotenv.config();
const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
/* Routes */
app.use(entityRoutes);

app.listen(process.env.SV_PORT);
console.log(`Server is listening on port ${process.env.SV_PORT}`);
