import { useState, useRef } from "react";
import cn from "classnames";
import { useDrag, useDrop } from "react-dnd";

import type { Dispatch, SetStateAction } from "react";

import DragSVG from "assets/images/drag-indicator.svg";

import { ITask } from "types/models";

import styles from "./index.module.scss";

type Props = {
  task: ITask;
  setTasksList: Dispatch<SetStateAction<ITask[]>>;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  index: number;
};

const TaskItem = ({ task, setTasksList, moveItem, index }: Props) => {
  const ref = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.label);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(event.target.value);
  };

  const handleEditSubmit = () => {
    setTasksList((prev) =>
      prev.map((item) =>
        item.id === task.id ? { ...item, label: editValue || task.label } : item
      )
    );
    setIsEditing(false);
  };

  const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      handleEditSubmit();
    }
  };

  const handleDeleteTask = () => {
    setTasksList((prev) => prev.filter((item) => item.id !== task.id));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const completed = event.target.checked;
    setTasksList((prev) =>
      prev.map((item) =>
        item.id === task.id ? { ...item, completed: completed } : item
      )
    );
  };

  const [, drag] = useDrag({
    type: "TASK",
    item: { task, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop<ITask & { index: number }>({
    accept: "TASK",
    hover: (item, monitor) => {
      if (!monitor.isOver({ shallow: true })) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },

    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  });

  drop(drag(ref));

  return (
    <li
      className={cn(styles.wrapper, {
        [styles.completed]: task.completed,
      })}
      draggable={true}
      ref={ref}
    >
      <img className={styles.dragIcon} src={DragSVG} alt='' />
      <input
        type='checkbox'
        checked={task.completed}
        className={styles.checkbox}
        onChange={handleCheckboxChange}
        onKeyDown={handleEnterKey}
      />
      {isEditing ? (
        <input
          className={styles.input}
          value={editValue}
          onChange={handleEditChange}
          onBlur={handleEditSubmit}
          autoFocus
        />
      ) : (
        <span
          className={cn(styles.label, {
            [styles.completed]: task.completed,
          })}
          onClick={handleEditClick}
        >
          {task.label}
        </span>
      )}
      <button className={styles.deleteBtn} onClick={handleDeleteTask} />
    </li>
  );
};

export default TaskItem;
