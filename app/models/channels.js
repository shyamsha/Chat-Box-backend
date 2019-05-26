const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;
const channelListSchema = new Schema({
	channelName: {
		type: String,
		requrired: true,
		minlength: 4,
		maxlength: 24,
		validate: {
			validator: function(value) {
				validator.isEmpty(value);
			},
			message: function() {
				return "channel name should be requried";
			}
		}
	},
	description: {
		type: String,
		maxlength: 132
	},
	createdAt: {
		type: Date,
		defalut: Date.now
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	messages: [
		{
			message: {
				type: String
			},
			user: {
				type: Schema.Types.ObjectId,
				ref: "User"
			}
		}
	],
	channelUsers: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "User"
			}
		}
	]
});
const ChannelList = mongoose.model("ChannelList", channelListSchema);
module.exports = {
	ChannelList
};
