import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, editTask } from '../../../store/reducers/tasksSlice';
import { Menu } from '../../Menu';
import styles from './taskItem.module.scss';

export interface TaskItemProps {
    nameTask: string;
    id?: string;
    maxLength?: number;
}

export const TaskItem = ({nameTask, id, maxLength = 100}: TaskItemProps) => {
    const [taskName, setTaskName] = useState(nameTask);
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (taskName.length === 0) {
            setTaskName(nameTask);
        }
        if (taskName.length > maxLength) {
            setTaskName(taskName.slice(0, maxLength));
        }
    }, [taskName, nameTask, maxLength]);

    const handleEditNameTask = () => {
    	setIsEditing(true);
  	};

    const handleSaveNameTask = () => {
		const task = tasks.find((task) => task.id === id);
		if (task) {
			const updatedTask = {
				...task,
				name: taskName,
			};
			dispatch(editTask(updatedTask));
			setIsEditing(false);
		}
	};

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          handleSaveNameTask();
        }
    }

    return (
        <li id={id} className={styles.itemTask} >
            {isEditing ? (
                <span >
                    <input
                        className={styles.editNameInput}
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        style={{ width: taskName.length + "ch" }}
                        ref={inputRef}
                        onKeyDown={handleKeyDown}
                    />
                    {/* <button onClick={handleSaveNameTask}>Сохранить</button> */}
                </span>
            ) : (  
                <span>{nameTask}</span> 
            )}
            <Menu taskId={id} onEditNameTask={handleEditNameTask}/> 
        </li>   
    )
}

export default TaskItem;



