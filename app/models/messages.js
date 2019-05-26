const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;
const messagesSchema = new Schema({
	messages: [
		{
			message: {
				type: String
			},
			user: {
				type: Schema.Types.ObjectId,
				ref: "User"
			},
			Channel: {
				type: Schema.Types.ObjectId,
				ref: "ChannelList"
			}
		}
	],
	createdAt: {
		type: Date,
		default: Date.now
	}
});
const Messages = mongoose.model("Messages", messagesSchema);
module.exports = {
	Messages
};
