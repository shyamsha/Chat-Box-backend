const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	ChannelList.find()
		.then(channels => {
			res.send(channels);
		})
		.catch(err => {
			res.send(err);
		});
});
router.get("/:id", (req, res) => {
	const id = req.params.id;
	ChannelList.findByOne(id)
		.then(channel => {
			res.send(channel);
		})
		.catch(err => {
			res.send(err);
		});
});
router.post("/create", (req, res) => {
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
router.delete("/:id", (req, res) => {
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
