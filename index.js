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

const app = express();
//passport config
strategyLocal(passport);

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());
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
app.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`);
});
let users = [];

// const httpServer = createServer();
// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });
// httpServer.listen(5000);
// io.on("connection", (socket) => {
//   console.log("a user connected");
// });
// const addUser = (userId, socketId) => {
//   !users.some((user) => user.userId === userId) &&
//     users.push({ userId, socketId });
// };
// const removeUser = (socketId) => {
//   users = users.filter((user) => user.socketId != socketId);
// };
// const getUser = (userId) => {
//   return users.find((user) => user.userId === userId);
// };
// io.on("sendMessage", ({ senderId, receiverId, tex }) => {
//   const user = getUser(receiverId);
//   io.to(user.socketId).emit("getMessage", {
//     senderId,
//     text,
//   });
// });

// io.on("disconnect", () => {
//   console.log("a user disconnected!");
//   removeUser(socketId);
//   socket.emit("getUsers", users);
// });
