import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (!username || !avatar) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  users.push(req.body);
  res.status(201).send("OK");
  return;
});

app.post("/tweet", (req, res) => {});

const PORT = 5000;
app.listen(PORT, console.log(`Rodando na PORTA => ${PORT}`));
