const booksResulvers = require('./booksResulvers');
const createEmployee = require('./employeeResolver');
const allEmployees = require('./employeeResolver');
const updateEmployee = require('./employeeResolver');
const deleteEmployee = require('./employeeResolver');
const singleEmployee = require('./employeeResolver');

module.exports = {
	Query: {
		...booksResulvers.Query,
		...allEmployees.Query,
		...singleEmployee.Query,
	},
	Mutation: {
		...createEmployee.Mutation,
		...updateEmployee.Mutation,
		...deleteEmployee.Mutation,
	},
};
