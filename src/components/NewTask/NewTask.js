import Section from "../UI/Section";
import TaskForm from "./TaskForm";

import useHTTP from "../../hooks/use-http";
const NewTask = (props) => {
  const { isLoading, error, sendRequest: enterTaskHandler } = useHTTP();

  const createTaskHandler = (taskText) => {
    const addTaskHandler = (data) => {
      const generatedId = data.name;
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
    };

    enterTaskHandler("POST", taskText, addTaskHandler);
  };

  return (
    <Section>
      <TaskForm onEnterTask={createTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
