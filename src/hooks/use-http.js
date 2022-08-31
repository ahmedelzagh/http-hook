import { useState, useCallback } from "react";

const useHTTP = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(async (method, taskText) => {
    console.log(`start Fetching with ${method} method`);
    setIsLoading(true);
    setError(null);
    let response;
    try {
      switch (method) {
        case "GET":
          response = await fetch(`${process.env.REACT_APP_API_KEY}/tasks.json`, {
            method: `${method}`,
          });
          break;
        case "POST":
          response = await fetch(`${process.env.REACT_APP_API_KEY}/tasks.json`, {
            method: "POST",
            body: JSON.stringify({ text: taskText }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          break;
        default:
          break;
      }

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      const loadedTasks = [];
      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }

      setTasks(loadedTasks);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);
  return [isLoading, error, fetchTasks, tasks, setTasks];
};

export default useHTTP;
