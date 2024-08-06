import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';

function App() { 
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const taskString = localStorage.getItem("tasks");
    if (taskString) {
      const tasks = JSON.parse(taskString);
      setTasks(tasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    setTask(taskToEdit.task);
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  };

  const handleDelete = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  };

  const handleAdd = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: uuidv4(), task, isCompleted: false }]);
      setTask("");
    }
  };

  const handleChange = (e) => { 
    setTask(e.target.value);
  };

  const handleCheckbox = (id) => { 
    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(newTasks);
  };

  return (
    <>
      <Header/>
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
        <h1 className='font-bold text-center text-3xl'>Task-Tracker</h1>
        <div className="addTask my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add Your Task</h2>
          <div className="flex">
            <input onChange={handleChange} value={task}type="text"className='w-full rounded-full px-5 py-1'/>
            
            <button onClick={handleAdd} disabled={!task.trim() || tasks.length >= 10}
              className='bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white'>
            Add Task
            </button>
          </div>
        </div>
        <input
          className='my-4'
          id='show'
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        /> 
        <label className='mx-2' htmlFor="show">Show Finished</label> 
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className='text-2xl font-bold'>Your Tasks</h2>
        <div className="Tasks">
          {tasks.length === 0 && <div className='m-5'>No Task To Display</div>}
          {tasks.map(item => (
            (showFinished || !item.isCompleted) && (
              <div key={item.id} className="task flex my-3 justify-between">
                <div className='flex gap-5'> 
                  <input
                    name={item.id}
                    onChange={() => handleCheckbox(item.id)}
                    type="checkbox"
                    checked={item.isCompleted}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.task}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'
                  >
                    <AiFillDelete />
                  </button>
                </div> 
              </div>
            )
          ))}
        </div>
      </div>
    </>
  );
}
export default App;
