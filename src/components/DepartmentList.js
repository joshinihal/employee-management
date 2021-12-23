import React from "react";
import classes from "./List.module.css";
import btnclasses from "./Button.module.css";

const DepartmentList = (props) => {
  const onDelete = (department) => {
    props.handleDelete(department);
  };

  const onEdit = (department) => {
    props.handleEdit(department);
  };

  return (
    <React.Fragment>
      <h2>Department List</h2>
      <table className={classes.table}>
        <tbody>
          <tr>
            <th className={classes.tableHeader}>Sr. No.</th>
            <th className={classes.tableHeader}>Department Name</th>
            <th className={classes.tableHeader}>Options</th>
          </tr>
          {props.departments.map((el) => (
            <tr key={el.id}>
              <td className={classes.tableData}>
                {props.departments.indexOf(el) + 1}
              </td>
              <td className={classes.tableData}>{el.name}</td>
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

export default DepartmentList;
