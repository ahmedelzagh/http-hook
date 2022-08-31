import useHTTP from "../../hooks/use-http";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";
const NewTask = () => {
  const [isLoading, error, fetchTasks] = useHTTP("POST");

  return (
    <Section>
      <TaskForm onEnterTask={fetchTasks} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
