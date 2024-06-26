import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import entityRoutes from "./routes/entity.routes.js";
import webscrapRoutes from "./routes/webscrap.routes.js";
import { limitto20 } from "./validators/rateLimit.js";

dotenv.config();
const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

app.use(limitto20);
/* Routes */
app.use(entityRoutes);
app.use(webscrapRoutes);

app.listen(process.env.SV_PORT);
console.log(`Server is listening on port ${process.env.SV_PORT}`);
