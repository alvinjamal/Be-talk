const express = require("express");
const cors = require(`cors`);
const morgan = require(`morgan`);
const { createServer } = require("http");
const { Server } = require("socket.io");
const bodyParser = require(`body-parser`);
require(`dotenv`).config();
const upload = require("./src/middlewares/upload");

const mainRouter = require("./src/routes/index");
const app = express();
const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:4000",
//   },
// });

const PORT = process.env.PORT;

const Port = 3500;

io.on("connection", (socket) => {
  console.log(`user connect ${socket.id}`);

  socket.on("message", (data) => {
    let time = new Date();
    io.emit("messageBe", { message: data, date: time });
    socket.broadcast.emit("messageBe", { message: data, date: time });
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log(`user disconnect ${socket.id}`);
  });
});

app.use(cors("*"));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", mainRouter);

app.use("/img", express.static("./upload"));
app.use(upload.array());

app.all("*", (req, res, next) => {
  res.status(404).json({ status: "error", statusCode: 404 });
});

app.use("/", (req, res, next) => {
  res.status(200).json({ status: "success", statusCode: 200 });
});

app.listen(PORT, () => {
  console.log(` Example app listening on port ${PORT}`);
});

httpServer.listen(Port, () => {
  console.log(`app running on ${Port}`);
});
