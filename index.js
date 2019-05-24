const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
var socket = require("socket.io");
var path = require("path");
const mongoose = require("./config/db_connect");

const { userController } = require("./app/controllers/user_controller");
const { channelController } = require("./app/controllers/channel_controller");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/users", userController);
app.use("/channels", channelController);

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
	socket.on("SEND_MESSAGE", function(data) {
		console.log(data);
		socket.emit("RECEIVE_MESSAGE", data);
	});
	// when the client emits 'typing', we broadcast it to others
	socket.on("typing", () => {
		socket.broadcast.emit("typing", {
			username: socket.username
		});
	});

	// when the client emits 'stop typing', we broadcast it to others
	socket.on("stop typing", () => {
		socket.broadcast.emit("stop typing", {
			username: socket.username
		});
	});

	socket.on("disconnect", () => console.log("Client disconnected"));
});
