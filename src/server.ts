import "dotenv/config";
import app from "./app";
import express from "express";

const port = Number(process.env.PORT) || 3000;

app.listen(port, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${port}`);
});

app.use("/uploads", express.static("uploads"));
