import React, { useEffect, useState } from "react";
import classes from "./List.module.css";
import btnclasses from "./Button.module.css";
import inputclasses from "./Input.module.css";

const EmployeeList = (props) => {
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [employees, setEmployees] = useState(props.employees);

  const onDelete = (employee) => {
    props.handleDelete(employee);
  };

  const onEdit = (employee) => {
    props.handleEdit(employee);
  };

  const onChange = (value) => {
    setDepartmentFilter(value);
  };

  useEffect(() => {
    // 'only filter when department is selected; else allow all employees
    if (departmentFilter && departmentFilter !== "No Filter selected") {
      setEmployees((prev) => {
        return props.employees.filter(
          (each) => each.department === departmentFilter
        );
      });
    } else {
      setEmployees(props.employees, departmentFilter);
    }
  }, [props, departmentFilter]);

  return (
    <React.Fragment>
      <h2>Employee List</h2>
      <p>
        Filter By Department:{" "}
        <select
          className={inputclasses.input}
          id="department"
          onChange={(e) => onChange(e.target.value)}
          value={departmentFilter}
        >
          <option
            defaultValue={"No Filter selected"}
            value={"No Filter selected"}
          >
            All
          </option>
          {props.departments.map((el) => (
            <option key={el.id}>{el.name}</option>
          ))}
        </select>
      </p>
      <table className={classes.table}>
        <tbody>
          <tr>
            <th className={classes.tableHeader}>Sr. No.</th>
            <th className={classes.tableHeader}>Employee Name</th>
            <th className={classes.tableHeader}>Department</th>
            <th className={classes.tableHeader}>Options</th>
          </tr>
          {employees.map((el) => (
            <tr key={el.id}>
              <td className={classes.tableData}>{employees.indexOf(el) + 1}</td>
              <td className={classes.tableData}>{el.name}</td>
              <td className={classes.tableData}>{el.department}</td>
              <td className={classes.tableData}>
                <button
                  className={`${btnclasses.btn} ${btnclasses.darkblue} ${btnclasses.medium} ${classes.optionsBtn}`}
                  onClick={() => onEdit(el)}
                >
                  Edit
                </button>
                <button
                  className={`${btnclasses.btn} ${btnclasses.red} ${btnclasses.medium} ${classes.optionsBtn}`}
                  onClick={() => onDelete(el)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default EmployeeList;
