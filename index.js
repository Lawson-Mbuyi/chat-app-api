import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import passport from "passport";
import userModel from "./models/userModel.js";
import passportLocal from "passport-local";
import authRoute from "./routes/authRoute.js";
import chatRoute from "./routes/ChatRoute.js";
import MessageRoute from "./routes/MessageRoute.js";
import strategyLocal from "./strategies/strategyLocal.js";
import session from "express-session";
dotenv.config();
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
//passport config
strategyLocal(passport);

mongoose
  .connect(process.env.LOCAL_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("LOcally connected!"))
  .catch(() => console.log("Failed to connect to mongodb !"));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  session({
    secret: process.env.SECRETE_KEY,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(authRoute);
app.use(chatRoute);
app.use(MessageRoute);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("a user connected");
  // add-user event
  socket.on("add-user", (userId) => {
    addUser(userId, socket.id);
    io.emit("get-users", users);
  });

  socket.on(
    "send-message",
    ({ senderId, receiverId, messageText, secureUrl }) => {
      const user = getUser(receiverId);
      if (user) {
        io.to(user.socketId).emit("get-message", {
          senderId,
          messageText,
          secureUrl,
        });
      }
    }
  );
  io.on("disconnect", (socket) => {
    console.log("a user disconnected");
    removeUser(socket.id);
    io.emit("get-users", users);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
