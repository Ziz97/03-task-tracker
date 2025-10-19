import { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import AddTask from "./components/AddTask";
import ToDo from "./components/ToDo";

function App() {
  const [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem('taskList')) || []);
  const [completed, setCompleted] = useState(JSON.parse(localStorage.getItem('completed')) || []);
  const [{isOver}, drop] = useDrop(() => ({
    accept: 'todo',
    drop: (item) => addCompleted(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  useEffect(() => {
    const taskListLocalStorage = localStorage.getItem('taskList');
    if (taskListLocalStorage) {
      setTaskList(JSON.parse(taskListLocalStorage));
    }
    const completedLocalStorage = localStorage.getItem('completed');
    if (completedLocalStorage) {
      setCompleted(JSON.parse(completedLocalStorage));
    }
  }, []);

  const addCompleted = (item) => {
    localStorage.setItem('completed', JSON.stringify([...completed, item]));
    window.location.reload();
  };

  return (
    <>
      <h1 className="text-2xl font-bold py-4 pl-6">03 - The Task Tracker</h1>
      <p className="text-xl pl-6">Hi there!</p> 
      <div className="flex flex-row items-center">
        <p className="text-xl pl-6">Click</p>
        <AddTask taskList={taskList} setTaskList={setTaskList}/>
        <p className="text-xl my-2">to add a new task</p>
      </div>
      <div className="flex flex-row">
        <div className="w-full ml-6">
          <h2 className="text-xl font-semibold w-3/4 max-w-lg my-4 py-2 px-2 bg-gray-300">To Do:</h2>
          <div className="flex flex-col-reverse">
            {taskList.map((task, i) => (
              <ToDo key={i} task={task} index={i} taskList={taskList} setTaskList={setTaskList} />
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col" ref={drop}>
          <h2 className="text-xl font-semibold w-3/4 max-w-lg my-4 py-2 px-2 bg-gray-300">Completed:</h2>
          <div className="flex flex-col-reverse">
            {completed.map((task, i) => (
              <ToDo key={i} task={task} taskList={completed} setTaskList={setCompleted} completed={true} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
