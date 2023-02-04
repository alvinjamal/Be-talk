const { store, list } = require("../Models/chat");

module.exports = (io, socket) => {
  socket.on("ping", (data) => {
    socket.emit("ping-response", data);
  });
  // buat join room private chat
  socket.on("join-room", (data) => {
    const { id_user, username, phone, password } = data;
    socket.join(id_user);
  });

  // Send PM
  socket.on("send-message", (data) => {
    store(data)
      .then(async () => {
        const listChat = await list(data.sender, data.receiver);
        io.to(data.receiver).emit("send-message-response", listChat.rows);
      })
      .catch((err) => {
        console.log("error send message");
        console.log(err);
      });
  });

  //Hystory chat
  socket.on("chat-history", async (data) => {
    try {
      console.log(data);
      const listChat = await list(data.sender, data.receiver);
      io.to(data.sender).emit("send-message-response", listChat.rows);
    } catch (err) {
      console.log("Error chat-history");
      console.log(err);
    }
  });
};
