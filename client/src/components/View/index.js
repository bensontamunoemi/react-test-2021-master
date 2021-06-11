/* eslint no-underscore-dangle: 0 */
import React, { useMemo, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useHistory } from "react-router";

import DataTable from "react-data-table-component";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { GET_EMPLOYEES } from "../../apollo/queries";
import { DELETE_EMPLOYEE } from "../../apollo/mutations";
import { getEmployees, deleteEmployee } from "../../redux/employees/actionCreators";
import columns from "./column";
import { Button, Flex, Header } from "../styled";

import Main from "./main";

const View = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [deleteRecord, { loading: isDeleting }] = useMutation(DELETE_EMPLOYEE, {
    onCompleted: data => {
      dispatch(deleteEmployee(data.deleteEmployee));
      toast.success("✔️Employee deleted", { position: "top-center" });
    },
    onError: err => {
      toast.error(`❎${err.message}`, { position: "top-center" });
    },
  });
  const employeesRecords = useSelector(state => state.employees.employeesRecords);
  const [fetchAllEmployee, { data, loading }] = useLazyQuery(GET_EMPLOYEES);
  useEffect(() => {
    fetchAllEmployee();
  }, [dispatch]);
  const handleDelete = record => {
    Swal.fire({
      icon: "warning",
      showCancelButton: true,
      title: "Are you sure?",
      text: `You want to delete ${record.firstname} ${record.surname}`,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        deleteRecord({ variables: { employeeId: record.employeeId } });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };
  // const columns = [
  //   {
  //     name: "Avatar",
  //     selector: "image",
  //     cell: row => (
  //       <div data-tag="allowRowEvents">
  //         <Avatar name={`${row.firstname} ${row.surname}`} size="40" round="40px" />
  //       </div>
  //     ),
  //   },

  //   {
  //     name: "First Name",
  //     selector: "firstname",
  //     sortable: true,
  //   },
  //   {
  //     name: "Last Name",
  //     selector: "surname",
  //     sortable: true,
  //   },
  //   {
  //     name: "Age",
  //     selector: "age",
  //     sortable: true,
  //   },
  //   {
  //     name: "Email",
  //     selector: "email",
  //     sortable: true,
  //   },
  //   {
  //     name: "Status",
  //     selector: "status",
  //     sortable: true,
  //     cell: row => {
  //       if (row.status === "ACTIVE") {
  //         return <StatusSuccess>{row.status}</StatusSuccess>;
  //       }
  //       if (row.status === "TERMINATED") {
  //         return <StatusTerminated>{row.status}</StatusTerminated>;
  //       }
  //       return <StatusLeave>{row.status}</StatusLeave>;
  //     },
  //   },
  //   {
  //     cell: row => (
  //       <div data-tag="allowRowEvents">
  //         <Link to={`/edit/${row.employeeId}`}>
  //           <i className="fas fa-user-edit" />
  //         </Link>
  //       </div>
  //     ),
  //   },
  //   {
  //     cell: row => (
  //       <div data-tag="allowRowEvents">
  //         <Delete isDeleting={isDeleting} onDelete={() => handleDelete(row)} />
  //       </div>
  //     ),
  //   },
  // ];

  useMemo(() => {
    if (data) {
      const filteredData = data.allEmployees.map((employee, index) => {
        return {
          id: index,
          employeeId: employee._id,
          firstname: employee.firstname,
          surname: employee.surname,
          age: employee.age,
          email: employee.email,
          status: employee.status,
        };
      });
      dispatch(getEmployees(filteredData));
    }
  }, [dispatch, data]);

  if (loading)
    return (
      <Flex direction="column" alignItems="center" justifyContent="center" marginTop="lg">
        <ReactLoading type="balls" color="#3f78b1" height="10%" width="10%" />
        <p>Loading Employee data</p>
      </Flex>
    );
  return (
    <>
      <Header data-cy="header">View Employees</Header>

      <Main>
        <Flex direction="column" alignItems="center" justifyContent="center" marginTop="lg">
          {employeesRecords && (
            <DataTable
              Clicked
              pagination
              title="Employee Data"
              columns={columns({ handleDelete, isDeleting })}
              data={employeesRecords}
            />
          )}
          <br />
          <Button data-cy="backButton" onClick={() => history.push("/")}>
            Back
          </Button>
        </Flex>
      </Main>
    </>
  );
};

export default View;
