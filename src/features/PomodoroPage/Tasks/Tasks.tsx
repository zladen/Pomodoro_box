import { useState } from "react";
import { useDispatch } from "react-redux";
import { RootState } from "../../../store/reducers/configSlice";
import { addTask } from "../../../store/reducers/tasksSlice";
import TaskForm from "./TaskForm/TaskForm";
import TaskList from "../Tasks/TaskList/TaskList";
import styles from './tasks.module.scss'
import { createSelector } from "@reduxjs/toolkit";

export const selectTasks = (state: RootState) => state.tasks.tasks;

export const selectTasksArray = createSelector(
    selectTasks,
    tasks => Object.values(tasks)
);

export function Tasks() {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');

    const handleAddTask = () => {
        const duration = 1;
        if (inputValue.trim().length) {
            dispatch(addTask({ descr: inputValue, duration, created: Date.now() }));
            setInputValue('');
        }
    }
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    }

    return (
        <div className={styles.tasksWrapper}>
            <TaskForm 
                handleInputChange={handleInputChange}
                handleAddTask={handleAddTask}
                inputValue={inputValue} 
                handleKeyDown={handleKeyDown}            
            />
            <TaskList />
        </div> 
    )
}
