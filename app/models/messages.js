const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;
const messagesSchema = new Schema({
	messages: [
	text:{
			type: String
		},
	],
	createdAt: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	ChannelList:{
			type: Schema.Types.ObjectId,
			ref: "ChannelList"
		}
});
const Messages = mongoose.model("Messages", messagesSchema);
module.exports = {
	Messages
};
