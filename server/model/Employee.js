const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
	{
		firstname: {
			type: String,
			required: true,
		},
		surname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		age: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
		jobTitle: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Employee', employeeSchema);
