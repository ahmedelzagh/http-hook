import { useState, useCallback } from "react";

const useHTTP = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (method, payLoad, payLoadFn) => {
    console.log(`now using '${method}' method`);
    if (method === "GET" || method === "POST") {
      setIsLoading(true);
    }
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
            body: JSON.stringify({ text: payLoad }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          break;
        case "DELETE":
          response = await fetch(`${process.env.REACT_APP_API_KEY}/tasks/${payLoad}.json`, {
            method: "DELETE",
          });
          break;
        default:
          break;
      }

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      if (method === "GET" || method === "POST") {
        payLoadFn(data);
      }
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);
  return { isLoading, error, sendRequest };
};

export default useHTTP;
