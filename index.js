const mainRouter = require("./src/routes/index");
const express = require("express");
const cors = require(`cors`);
const morgan = require(`morgan`);
const bodyParser = require(`body-parser`);
require(`dotenv`).config();
const upload = require("./src/middlewares/upload");
const { createServer } = require("http");
const { Server } = require("socket.io");
var moment = require("moment");

const app = express();
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const port = process.env.PORT;

io.on("connection", (socket) => {
  console.log(`user connect ${socket.id}`);

  socket.on("initialRoom", ({ room }) => {
    console.log(room);
    socket.join(`room:${room}`);
  });

  socket.on("message", (data) => {
    io.to(`room:${data.group}`).emit("messageBe", {
      sender: data.name,
      message: data.message,
      date: moment().format("HH:mm"),
    });
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

httpServer.listen(port, () => {
  console.log(` App running socket on port ${port} `);
});

// app.listen(PORT, () => {
//     console.log(` Example app listening on port ${PORT} :)`);
//   });

// socket.on("message", (data) => {
//   let time = new Date();
//   io.emit("messageBe", { message: data, date: time });
//   socket.broadcast.emit("messageBe", { message: data, date: time });
//   console.log(data);
// });
