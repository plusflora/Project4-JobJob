const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		cName: {
			type: String,
			required: true,
		},
		aDate: {
			type: Date,
		},
		aStatus: {
			type: Boolean,
			default: true,
		},
		interview: {
			type: Boolean,
			default: false,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Application', applicationSchema)