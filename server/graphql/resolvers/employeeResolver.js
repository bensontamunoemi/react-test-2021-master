const { UserInputError } = require('apollo-server-errors');
const Employee = require('../../model/Employee');
const { DateTimeResolver } = require('graphql-scalars');

const allEmployees = async (_, __, ___) => {
	return await Employee.find().exec();
};

const singleEmployee = async (_, args) => {
	return await Employee.findOne({ _id: args.employeeId }).exec();
};

const createEmployee = async (_, args) => {
	const employee = await Employee.findOne({ email: args.input.email });

	if (employee) throw new UserInputError('Employee Already exist');
	let newEmployee = new Employee({
		...args.input,
	});
	await newEmployee.save();
	return newEmployee;
};

const updateEmployee = async (_, args) => {
	let updatedEmployee = await Employee.findByIdAndUpdate(
		args.input._id,
		{ ...args.input },
		{ new: true }
	).exec();
	return updatedEmployee;
};

const deleteEmployee = async (_, args) => {
	const employeeToDelete = await Employee.findById(args.employeeId);
	if (!employeeToDelete) throw new UserInputError('Invalid action');
	let deletedEmployee = await Employee.findByIdAndRemove({
		_id: args.employeeId,
	}).exec();
	return deletedEmployee;
};

module.exports = {
	Query: {
		allEmployees,
		singleEmployee,
	},
	Mutation: {
		createEmployee,
		updateEmployee,
		deleteEmployee,
	},
};
