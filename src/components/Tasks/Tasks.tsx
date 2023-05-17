import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, addTask, updateTask } from "../../store/reducers/tasksSlice";
import TaskForm from "./TaskForm/TaskForm";
import TaskList from "./TaskList/TaskList";
import styles from './tasks.module.scss'

export function Tasks() {
    const pomodoro = useSelector((state: RootState) => state.settings.pomodoro);
    const shortBreak = useSelector((state: RootState) => state.settings.shortBreak);
    const longBreak = useSelector((state: RootState) => state.settings.longBreak);
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        dispatch(updateTask({
            pomodoro,
            shortBreak,
            longBreak,
        }));
    }, [dispatch, pomodoro, shortBreak, longBreak]);

    const handleAddTask = () => {
        if (inputValue.trim().length) {
            dispatch(addTask({ name: inputValue, pomodoro, shortBreak, longBreak }));
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
