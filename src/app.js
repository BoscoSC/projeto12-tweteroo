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

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;

  if (!username || !tweet) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  const userExists = users.find((user) => user.username === username);

  if (!userExists) {
    res.status(400).send("UNAUTHORIZED");
    return;
  }

  tweets.push(req.body);
  res.status(201).send("OK");
  return;
});

app.get("/tweets", (req, res) => {
  const { page } = req.query.page;

  tweets.forEach((tweet) => {
    const { avatar } = users.find((user) => user.username === tweet.username);
    tweet.avatar = avatar;
  });

  if (page < 1 && !page) {
    res.status(400).send("Informe uma página válida!");
    return;
  }

  const limitTweets = 10;
  const firstTweet = (page - 1) * limitTweets;
  const finalTweet = page * limitTweets;

  if (page) {
    res.status(200).send(filteredTweets.slice(firstTweet, finalTweet));
  }

  const shownTweets = tweets.slice(-10);
  res.status(200).send(shownTweets);
});

const PORT = 5000;
app.listen(PORT, console.log(`Rodando na PORTA => ${PORT}`));
