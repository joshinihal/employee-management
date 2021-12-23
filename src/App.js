import "./App.css";
import React, { useState, useEffect } from "react";
import CreateEmployee from "./components/CreateEmployee";
import CreateDepartment from "./components/CreateDepartment";
import EmployeeList from "./components/EmployeeList";
import DepartmentList from "./components/DepartmentList";
import btnclasses from "./components/Button.module.css";

function App() {
  const [employeeList, setEmployeeList] = useState();
  const [departmentList, setDepartmentList] = useState();

  const [mode, setMode] = useState("create");
  const [showForm, setShowForm] = useState(null);
  // save data to be passed for edit from list as editdata
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    // on first load get data from local storage
    setEmployeeList(JSON.parse(window.localStorage.getItem("employeeList")));
    setDepartmentList(
      JSON.parse(window.localStorage.getItem("departmentList"))
    );
  }, []);

  // use useffect to store employee and department data in local storage everytime they update
  useEffect(() => {
    window.localStorage.setItem("employeeList", JSON.stringify(employeeList));
  }, [employeeList]);

  useEffect(() => {
    window.localStorage.setItem(
      "departmentList",
      JSON.stringify(departmentList)
    );
  }, [departmentList]);

  const handleEmployeeCreation = (employee) => {
    setEmployeeList((prev) => {
      return prev && prev.length
        ? [
            ...prev,
            {
              id: Math.random().toString(),
              name: employee.name,
              department: employee.department,
            },
          ]
        : [
            {
              id: Math.random().toString(),
              name: employee.name,
              department: employee.department,
            },
          ];
    });
  };

  const handleDepartmentCreation = (department) => {
    setDepartmentList((prev) => {
      return prev && prev.length
        ? [...prev, { id: Math.random().toString(), name: department.name }]
        : [{ id: Math.random().toString(), name: department.name }];
    });
  };

  const onDelete = (type, item) => {
    handleHideForm();
    if (type === "employee") {
      setEmployeeList((prev) => {
        return prev.filter((el) => el.id !== item.id);
      });
    } else {
      setDepartmentList((prev) => {
        return prev.filter((el) => el.id !== item.id);
      });
    }
  };

  const onAdd = (type) => {
    setMode("create");
    onShowForm(type);
  };

  const onEdit = (type, item) => {
    setMode("edit");
    if (!showForm || !showForm.show || showForm.type !== type) {
      onShowForm(type);
    }
    setEditData(item);
  };

  // for editing do not update exisiting state directly.
  // use obj.assign on empty array target, previous (prev) as source and modify index (ind)

  const handleDepartmentUpdate = (department) => {
    const ind = departmentList.findIndex((each) => each.id === department.id);
    setDepartmentList((prev) => {
      return Object.assign([], prev, { [ind]: department });
    });
    handleHideForm();
  };

  const handleEmployeeUpdate = (employee) => {
    const ind = employeeList.findIndex((each) => each.id === employee.id);
    setEmployeeList((prev) => {
      return Object.assign([], prev, { [ind]: employee });
    });
    handleHideForm();
  };

  const onShowForm = (type) => {
    if (type === "employee") {
      setShowForm((prev) => {
        return prev && prev.show
          ? prev.type === "department"
            ? { show: true, type: "employee" }
            : { show: false, type: null }
          : { show: true, type };
      });
    } else {
      setShowForm((prev) => {
        return prev && prev.show
          ? prev.type === "employee"
            ? { show: true, type: "department" }
            : { show: false, type: null }
          : { show: true, type };
      });
    }
  };

  const handleHideForm = () => {
    setShowForm({ show: false, type: null });
  };

  return (
    <React.Fragment>
      <div className="App">
        <h1>Employee Management</h1>
        <div className="btn-container">
          <button
            className={`${btnclasses.btn} ${btnclasses.purple} ${btnclasses.large} addbtn`}
            onClick={() => onAdd("employee")}
            disabled={
              (showForm && showForm.show === true) ||
              !departmentList ||
              !departmentList.length
            }
          >
            Add Employee
          </button>
          <button
            className={`${btnclasses.btn} ${btnclasses.purple} ${btnclasses.large} addbtn`}
            onClick={() => onAdd("department")}
            disabled={showForm && showForm.show === true}
          >
            Add Department
          </button>
        </div>

        {showForm && showForm.show ? (
          <div>
            {showForm.type === "employee" ? (
              <CreateEmployee
                mode={mode}
                editData={editData}
                employees={employeeList}
                departments={departmentList}
                handleSave={handleEmployeeCreation}
                handleEdit={handleEmployeeUpdate}
                handleCancel={handleHideForm}
              ></CreateEmployee>
            ) : (
              <CreateDepartment
                mode={mode}
                editData={editData}
                departments={departmentList}
                handleSave={handleDepartmentCreation}
                handleEdit={handleDepartmentUpdate}
                handleCancel={handleHideForm}
              ></CreateDepartment>
            )}
          </div>
        ) : (
          ""
        )}
        {employeeList ? (
          <EmployeeList
            handleEdit={(el) => onEdit("employee", el)}
            employees={employeeList}
            departments={departmentList}
            handleDelete={(el) => onDelete("employee", el)}
          ></EmployeeList>
        ) : (
          <p>No employees found.</p>
        )}

        {departmentList ? (
          <DepartmentList
            handleEdit={(el) => onEdit("department", el)}
            departments={departmentList}
            handleDelete={(el) => onDelete("department", el)}
          ></DepartmentList>
        ) : (
          <p>No departments found.</p>
        )}
      </div>
    </React.Fragment>
  );
}

export default App;
