import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { ITask } from "types/models";

import Input from "components/Input";
import TaskItem from "components/TaskItem";

import styles from "./index.module.scss";

const TasksList = () => {
  const [tasksList, setTasksList] = useState<ITask[]>([]);

  useEffect(() => {
    const storedTasksList = JSON.parse(
      localStorage.getItem("tasksList") || "[]"
    );

    if (!!storedTasksList?.length) {
      setTasksList(storedTasksList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
  }, [tasksList]);

  const [showIncompleted, setShowIncompleted] = useState(false);

  const filteredTasks = showIncompleted
    ? tasksList.filter((item) => !item.completed)
    : tasksList;

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const newSelectedOptions = [...tasksList];
    const dragItem = newSelectedOptions[dragIndex];

    newSelectedOptions.splice(dragIndex, 1);
    newSelectedOptions.splice(hoverIndex, 0, dragItem);

    setTasksList(newSelectedOptions);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <h1 className={styles.heading}>ToDo List</h1>
        <Input setTasksList={setTasksList} />
        <label className={styles.toggle}>
          <input
            type='checkbox'
            checked={showIncompleted}
            onChange={() => setShowIncompleted((prev) => !prev)}
          />
          Show only incompleted
        </label>
      </div>
      <DndProvider backend={HTML5Backend}>
        <ul className={styles.tasksList}>
          {!!filteredTasks.length ? (
            filteredTasks.map((task, index) => (
              <TaskItem
                key={task.id}
                task={task}
                setTasksList={setTasksList}
                moveItem={moveItem}
                index={index}
              />
            ))
          ) : (
            <li className={styles.placeholder}>There is no tasks</li>
          )}
        </ul>
      </DndProvider>
    </div>
  );
};

export default TasksList;
