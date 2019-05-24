const express = require("express");
const router = express.Router();
const { authenticationByUser } = require("../middlewares/authenticate");
const { ChannelList } = require("../models/channels");
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
	ChannelList.findOne({ id: id })
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
	ChannelList.findOneAndUpdate(id, { $set: req.body }, { new: true })
		.then(channel => {
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
