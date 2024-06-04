import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import "./todo.css"

const Todo = () => {
  const [task, setTask] = useState("");
  const [title, setTitle] = useState("");
  let data = localStorage.getItem("user")
? JSON.parse(localStorage.getItem("user"))
: [];
  const [record, setRecord] = useState(data);
  const [editId, setEditId] = useState("");
  const [single, setSingle] = useState(null);

  

  useEffect(() => {
    if (single) {
      setTask(single.task);
      setTitle(single.title);
    } else {
      setTask("");
      setTitle("");
    }
  }, [single]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let obj = { id: Date.now(), task, title };

    if (editId) {
      let updatedRecords = record.map((val) => {
        if (val.id === editId) {
          return {
            ...val,
            task,
            title,
          };
        }
        return val;
      });
      setRecord(updatedRecords);
      localStorage.setItem("user", JSON.stringify(updatedRecords));
      setEditId("");
      setSingle(null);
    } else {
      let all = [...record, obj];
      setRecord(all);
      localStorage.setItem("user", JSON.stringify(all));
    }
    setTask("");
    setTitle("");
  };

  const handleEdit = (id) => {
    let editData = record.find((val) => val.id === id);
    setEditId(id);
    setSingle(editData);
  };

  const handleDelete = (id) => {
    let updatedRecords = record.filter((val) => val.id !== id);
    setRecord(updatedRecords);
    localStorage.setItem("user", JSON.stringify(updatedRecords));
  };

  return (
    <div className="todo" align="center">
      <div className="todomain">
        <h1>TODO App</h1>
        <form onSubmit={handleSubmit}>
          <div className="todocontent">
            <input className="todotitle"
              type="text"
              placeholder="Add Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            /><br></br><br></br>
            <input className="todotask"
              type="text"
              placeholder="Add New Task"
              onChange={(e) => setTask(e.target.value)}
              value={task}
            />
            <button className="todobtn" type="submit"><FaPlus /></button>
          </div>
        </form>
        <h4>Tasks</h4>
        {record.map((val) => (
          <div className="todonotes" key={val.id}>
            <div className="notescontent">
              <h3>{val.title}</h3>
              <p>{val.task}</p>
            </div>
            <div className="notesbtn">
              <button onClick={() => handleEdit(val.id)}>
                <FiEdit />
              </button>
              <button onClick={() => handleDelete(val.id)}>
                <RiDeleteBin6Line />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;