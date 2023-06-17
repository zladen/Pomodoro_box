import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Task, addTask, updateTask, updateTime } from "../../store/reducers/tasksSlice";
import TaskForm from "./TaskForm/TaskForm";
import TaskList from "./TaskList/TaskList";
import styles from './tasks.module.scss'

export function Tasks() {
    const config = useSelector((state: RootState) => state.config);
    const tasks = useSelector((state: RootState) => Object.values(state.tasks.tasks));
    const {pomodoro} = config;
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        tasks.forEach(task => {
            const updatedPomodoro = {
                ...task,
                duration: pomodoro / 60,
            };
            dispatch(updateTime(updatedPomodoro));
        });
    }, [dispatch, pomodoro]);


    const handleAddTask = () => {
        const duration = pomodoro / 60
        if (inputValue.trim().length) {
            dispatch(addTask({ name: inputValue, duration }));
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
