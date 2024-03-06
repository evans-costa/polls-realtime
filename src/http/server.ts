import "dotenv/config";
import fastify from "fastify";
import cookie from "@fastify/cookie";
import websocket from "@fastify/websocket";
import { createPoll } from "./routes/create-poll";
import { getPoll } from "./routes/get-poll";
import { voteOnPoll } from "./routes/vote-on-poll";
import { pollResults } from "./ws/poll-results";

const app = fastify();
const PORT = process.env.PORT || 3000;

app.register(cookie, {
  secret: process.env.SECRET_KEY,
  hook: "onRequest",
});

app.register(websocket, {
  options: {
    host: "localhost",
  },
});

app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);
app.register(pollResults);

app.listen({ port: Number(PORT) }).then(() => {
  console.log(`Server is running...`);
});
