import React, { useState, useRef, useEffect } from "react";
import btnclasses from "./Button.module.css";
import inputclasses from "./Input.module.css";
import classes from "./CreateEmployee.module.css";

const CreateEmployee = (props) => {
  const nameInputRef = useRef();
  const departmentInputRef = useRef(props.departments[0]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (props.mode === "edit") {
      nameInputRef.current.value = props.editData.name;
      departmentInputRef.current.value = props.editData.department;
    }
  }, [props]);

  const onSave = (e) => {
    e.preventDefault();
    const name = nameInputRef.current.value;
    const department = departmentInputRef.current.value;
    if (props.mode === "edit") {
      props.handleEdit({ id: props.editData.id, name, department });
      setError({ hasError: false, message: null });
    } else {
        // only allow if the employee doesn't already exist
      const index =
        props.employees && props.employees.length
          ? props.employees.findIndex(
              (employee) => employee.name === name.trim()
            )
          : -1;
      if (index === -1) {
        props.handleSave({ name, department });
        setError({ hasError: false, message: null });
      } else {
        setError({ hasError: true, message: "Employee already exists." });
      }
    }
  };

  const onCancel = () => {
    props.handleCancel();
  };

  return (
    <React.Fragment>
      <div>
        <form onSubmit={onSave} className={classes.container}>
          <h2>{props.mode === "edit" ? "Edit" : "Create"} Employee</h2>
          <span>{error && error.hasError === true ? error.message : ""}</span>
          <div className={classes.rowcontainer}>
            <label htmlFor="name">Enter Name</label>
            <input
              className={inputclasses.input}
              type="text"
              id="name"
              ref={nameInputRef}
              required
            ></input>
          </div>
          <div className={classes.rowcontainer}>
            <label htmlFor="department">Enter Department</label>
            <select
              className={inputclasses.input}
              id="department"
              ref={departmentInputRef}
              required
            >
              {props.departments.map((el) => (
                <option key={el.id}>{el.name}</option>
              ))}
            </select>
          </div>
          <div>
            <button
              className={`${btnclasses.btn} ${btnclasses.white} ${btnclasses.medium} ${classes.savebtn}`}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className={`${btnclasses.btn} ${btnclasses.green} ${btnclasses.medium} ${classes.savebtn}`}
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default CreateEmployee;
