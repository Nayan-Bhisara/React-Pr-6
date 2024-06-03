import React, { useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const Todo = () => {

  const [task, setTask] = useState("")
  const [title, setTitle] = useState("")
  let data = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : []
  const [record, setRecord] = useState(data)
  const [edit, setEdit] = useState("")

  const handleSubmite = (e) => {
    e.preventDefault()

    let obj = { 
      id: Date.now(), task, title 
    }

    if (edit) {
      let all = [...record]
      let editdatas = all.map((val) => {
        if (val.id == edit) {
          return {
            ...val,
            task: task,
            title: title,
          }
        }
        return val;
      });
      setRecord(editdatas)
      localStorage.setItem("user", JSON.stringify(editdatas))

      setEdit("")
    } else {
      let newlist = [...record, obj]
      localStorage.setItem("user", JSON.stringify(newlist))
      setRecord(newlist)
    }
    setTask("")
    setTitle("")
  }

  const handleEdit = (id) => {
    let all = [...record]
    let editdata = all.find(val => val.id == id)
    setEdit(id)
    setTitle(editdata.title)
    setTask(editdata.task)
  }

  const handleDelet = (id) => {
    let all = [...record]
    let deletdata = all.filter((val => val.id != id))
    setRecord(deletdata)
    localStorage.setItem("user",JSON.stringify(deletdata))
  }


  return (
    <div align="center">
      <div style={{width:"400px",border:"4px solid #82E0AA",borderRadius:"6px"}}>
        <h1>TODO App</h1>
        <form onSubmit={handleSubmite}>
              Title : {""} <input type="text" placeholder='Add Title' onChange={(e) => setTitle(e.target.value)} value={title} />
              Task : {""} <input type="text" placeholder='Add New Task' onChange={(e) => setTask(e.target.value)} value={task} />
              <input type="submit" />
              {
                record.map((val) => {
                  return (
                    <div key={val.id}>
                      <h3>{val.title}</h3>
                      <p>{val.task}</p>
                      <button onClick={() => handleEdit(val.id)}><FiEdit /></button>
                      <button onClick={() => handleDelet(val.id)}><RiDeleteBin6Line /></button>
                    </div>
                  )
                })
              }
        </form>
      </div>
    </div>
  )
}

export default Todo