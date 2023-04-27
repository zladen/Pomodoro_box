import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, addTask } from "../../store/reducers/tasksSlice";
import TaskForm from "./TaskForm/TaskForm";
import TaskList from "./TaskList/TaskList";
import styles from './tasks.module.scss'

export function Tasks() {
    //const tasks = useSelector((state: RootState) => state.tasks.tasks);
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
