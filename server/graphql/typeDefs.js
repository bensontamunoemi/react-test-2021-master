const { gql } = require('apollo-server');

module.exports = gql`
	scalar DataTime
	type Book {
		title: String
		author: String
	}
	type Employee {
		_id: ID!
		firstname: String!
		surname: String!
		email: String!
		age: String!
		status: String!
		jobTitle: String!
		createdAt: DataTime
		updatedAt: DataTime
	}
	input EmployeeInput {
		firstname: String!
		surname: String!
		email: String!
		age: String!
		status: String!
		jobTitle: String!
	}
	input UpdateEmployeeInput {
		_id: String!
		firstname: String!
		surname: String!
		email: String!
		age: String!
		status: String!
		jobTitle: String!
	}

	type Query {
		books: [Book]
		allEmployees: [Employee]
		singleEmployee(employeeId: ID): Employee!
	}
	type Mutation {
		createEmployee(input: EmployeeInput!): Employee!
		updateEmployee(input: UpdateEmployeeInput!): Employee!
		deleteEmployee(employeeId: ID!): Employee!
	}
`;
