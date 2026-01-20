import express from "express";
import cors from "cors";
import routes from "./routes";
import usersRoutes from "./modules/users/user.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);


app.use("/users", usersRoutes);

import path from "path";

app.use(
    "/uploads",
    express.static(path.resolve(__dirname, "..", "uploads"))
);
app.use("/uploads", express.static("uploads"));




export default app;
