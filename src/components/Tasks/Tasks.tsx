import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../store/reducers/tasksSlice";
import TaskForm from "./TaskForm/TaskForm";
import TaskList from "./TaskList/TaskList";
import styles from './tasks.module.scss'

export function Tasks() {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');

    const handleAddTask = () => {
        if (inputValue.trim().length) {
            dispatch(addTask({ name: inputValue }));
            setInputValue('');
        }
    }
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <div className={styles.tasksWrapper}>
            <TaskForm 
                handleInputChange={handleInputChange}
                handleAddTask={handleAddTask}
                inputValue={inputValue}
            />
            <TaskList />
        </div> 
    )
}
