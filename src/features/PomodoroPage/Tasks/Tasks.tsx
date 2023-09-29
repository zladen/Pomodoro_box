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
    const [showAlert, setShowAlert] = useState(false);

    const handleAddTask = () => {
        const duration = 1;
        if (inputValue.trim().length > 2) {
            dispatch(addTask({ descr: inputValue, duration, created: Date.now() }));
            setInputValue('');
        } else {
            setShowAlert(true);
        }
    }
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        if (event.target.value.trim().length >= 3) {
            setShowAlert(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    }

    return (
        <div className={styles.tasksWrapper}>
            {showAlert && <div className={styles.alert}>Введите не менее 3-х символов!</div>}
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
