const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const socketController = require("./src/socket/index");
const helmet = require("helmet");
const http = require("http");
const socket = require("socket.io");
const mainRouter = require("./src/routes/index");
const upload = require("./src/middlewares/upload");
// const io = require("socket.io")(server, { origins: "*:*" });
const { resp } = require("./src/middlewares/common");
const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", mainRouter);

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);

app.use(bodyParser.json());
app.use("/img", express.static("./upload"));
app.use(upload.array());

const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origins: "*",
  },
});

io.on("connection", (socket) => {
  console.log("new user connect");
  socketController(io, socket);
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`app running on ${PORT}`);
});
