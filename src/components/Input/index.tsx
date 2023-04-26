import { useState } from "react";

import type { Dispatch, SetStateAction } from "react";

import { ITask } from "types/models";

import styles from "./index.module.scss";

type Props = {
  setTasksList: Dispatch<SetStateAction<ITask[]>>;
};

const Input = ({ setTasksList }: Props) => {
  const [inputValue, setInputValue] = useState("");

  const addTask = () => {
    if (!inputValue) return;
    const newItem = {
      id: Date.now(),
      label: inputValue,
      completed: false,
      order: 0,
    };
    setTasksList((prev) => [newItem, ...prev]);
    setInputValue("");
  };

  const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      addTask();
    }
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        className={styles.input}
        type='text'
        placeholder='Type here'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleEnterKey}
      />
      <button className={styles.addBtn} onClick={addTask}>
        Add
      </button>
    </div>
  );
};

export default Input;
