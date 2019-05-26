const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
var socket = require("socket.io");
var path = require("path");
const mongoose = require("./config/db_connect");

const { userController } = require("./app/controllers/user_controller");
const { channelController } = require("./app/controllers/channel_controller");
const { messageController } = require("./app/controllers/message_controller");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/users", userController);
app.use("/channels", channelController);
app.use("/messages", messageController);

app.get("/", (req, res) => {
	res.send("Welcome to your chat");
});
app.use(function(req, res) {
	// res.sendStatus(404);
	res
		.status(404)
		.send(
			"The resource you are looking for doesn’t exist." + "\n Not Found " + 404
		);
});

server = app.listen(port, () => {
	console.log("listining from", port);
});
io = socket(server);
io.on("connection", socket => {
	socket.on("JOIN_ROOM", data => {
		socket.join(data.channel);
		console.log("user joined ", data.channel);
	});
	socket.on("SEND_MESSAGE", function(data) {
		console.log(io.sockets);
		io.sockets.in(data.channel).emit("RECEIVE_MESSAGE", data);
	});

	socket.on("disconnect", () => console.log("Client disconnected"));
});
