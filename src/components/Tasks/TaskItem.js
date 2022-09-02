import classes from "./TaskItem.module.css";

const TaskItem = (props) => {
  const deleteItemHandler = () => {
    props.onDelete(props.id);
  };

  return (
    <li className={classes.task}>
      {props.children}
      <button onClick={deleteItemHandler}>Delete</button>
    </li>
  );
};

export default TaskItem;
