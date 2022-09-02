import React, { useCallback, useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHTTP from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);
  const { isLoading, error, sendRequest: handleTasks } = useHTTP();

  const transformData = (data) => {
    const loadedTasks = [];
    for (const taskKey in data) {
      loadedTasks.push({ id: taskKey, text: data[taskKey].text });
    }
    setTasks(loadedTasks);
  };

  const handleFetchItems = useCallback(() => {
    handleTasks("GET", null, transformData);
  }, [handleTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  const handleDeleteTask = (id) => {
    handleTasks("DELETE", id);
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  useEffect(() => {
    handleFetchItems();
  }, [handleFetchItems]);

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks items={tasks} loading={isLoading} error={error} onFetch={handleFetchItems} onDelete={handleDeleteTask} />
    </React.Fragment>
  );
}

export default App;
