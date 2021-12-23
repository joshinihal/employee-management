import React, { useRef, useState, useEffect } from "react";
import btnclasses from "./Button.module.css";
import inputclasses from "./Input.module.css";
import classes from "./CreateDepartment.module.css";

const CreateDepartment = (props) => {
  const departmentInputRef = useRef();
  useEffect(() => {
    if (props.mode === "edit") {
      departmentInputRef.current.value = props.editData.name;
    }
  }, [props]);

  const [error, setError] = useState(null);

  const onSave = (e) => {
    e.preventDefault();
    const department = departmentInputRef.current.value;
    // only allow when department doesn't exist already
    const index =
      props.departments && props.departments.length
        ? props.departments.findIndex((each) => each.name === department.trim())
        : -1;
    if (index === -1) {
      if (props.mode === "edit") {
        props.handleEdit({ id: props.editData.id, name: department });
      } else {
        props.handleSave({ name: department });
      }
      departmentInputRef.current.value = "";
      setError({ hasError: false, message: null });
    } else {
      setError({ hasError: true, message: "Department already exists." });
    }
  };

  const onCancel = () => {
    props.handleCancel();
  };

  return (
    <React.Fragment>
      <div>
        <form onSubmit={onSave} className={classes.container}>
          <h2>{props.mode === "edit" ? "Edit" : "Create"} Department</h2>
          <span>{error && error.hasError === true ? error.message : ""}</span>
          <div className={classes.rowcontainer}>
            <label htmlFor="department">Enter Department</label>
            <input
              className={inputclasses.input}
              type="text"
              id="department"
              ref={departmentInputRef}
              required
            ></input>
          </div>
          <div>
            <button
              type="button"
              onClick={onCancel}
              className={`${btnclasses.btn} ${btnclasses.white} ${btnclasses.medium} ${classes.savebtn}`}
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

export default CreateDepartment;
