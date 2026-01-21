import "dotenv/config";
import app from "./app";
import express from "express";

const port = Number(process.env.PORT) || 3000;

app.listen(process.env.PORT || 3333, () => {
  console.log('Servidor rodando');
});

app.use("/uploads", express.static("uploads"));
