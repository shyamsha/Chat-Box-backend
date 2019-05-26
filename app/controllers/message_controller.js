const express = require("express");
const router = express.Router();
const { Messages } = require("../models/messages");
router.get("/", (req, res) => {
	const id = req.user._id;
	Messages.find()
		.then(message => {
			res.send(message);
		})
		.catch(err => {
			res.send(err);
		});
});
router.post("/", (req, res) => {
	const messages = new Messages(req.body);
	messages
		.save()
		.then(message => {
			res.send(message);
		})
		.catch(err => {
			res.send(err);
		});
});
module.exports = {
	messageController: router
};
