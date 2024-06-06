import express from "express";

console.log(express);

const app = express();
app.use(express.json());

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log("connected to", port);
});
