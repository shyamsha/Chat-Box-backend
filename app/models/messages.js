const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;
const messagesSchema = new Schema({
	messages: [
		{
			type: String
		}
	],
	createdAt: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User"
	}
});
const Messages = mongoose.model("Messages", messagesSchema);
module.exports = {
	Messages
};
