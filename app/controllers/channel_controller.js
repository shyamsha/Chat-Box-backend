const express = require("express");
const router = express.Router();
const { authenticationByUser } = require("../middlewares/authenticate");
const { ChannelList } = require("../models/channels");
let message = [];
router.get("/", authenticationByUser, (req, res) => {
	const id = req.user._id;
	ChannelList.find()
		.then(channels => {
			res.send(channels);
		})
		.catch(err => {
			res.send(err);
		});
});
router.get("/:id", authenticationByUser, (req, res) => {
	const id = req.params.id;
	ChannelList.findOne({ _id: id })
		.then(channel => {
			res.send(channel);
		})
		.catch(err => {
			res.send(err);
		});
});
router.post("/", authenticationByUser, (req, res) => {
	const channels = new ChannelList(req.body);
	channels
		.save()
		.then(channel => {
			res.send(channel);
		})
		.catch(err => {
			res.send(err);
		});
});
router.put("/:id", (req, res) => {
	const id = req.params.id;

	message.push(...req.body.messages);
	console.log(message);
	ChannelList.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true })
		.populate("messages.user")
		.then(channel => {
			//io.sockets.in(id).emit("RECEIVE_MESSAGE", response.messages);

			res.send(channel);
		})
		.catch(err => {
			res.send(err);
		});
});

router.delete("/:id", authenticationByUser, (req, res) => {
	const id = req.params.id;
	ChannelList.findOneAndUpdate(id)
		.then(channel => {
			res.send(channel);
		})
		.catch(err => {
			res.send(err);
		});
});
module.exports = {
	channelController: router
};
