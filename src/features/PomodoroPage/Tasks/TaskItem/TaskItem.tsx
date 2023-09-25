import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editTask } from '../../../../store/reducers/tasksSlice';
import { Menu } from '../../Menu';
import { selectTasksArray } from '../Tasks';
import styles from './taskItem.module.scss';
import { motion } from 'framer-motion';

export interface TaskItemProps {
    nameTask: string;
    id?: string;
    maxLength?: number;
}

export const TaskItem = ({nameTask, id, maxLength = 100}: TaskItemProps) => {
    const [taskName, setTaskName] = useState(nameTask);
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const tasks = useSelector(selectTasksArray);
    const inputRef = useRef<HTMLInputElement>(null);

    const listItemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 10 }
    };

    useEffect(() => {
        if (typeof taskName !== 'undefined') {
            if (taskName.length > maxLength) {
                setTaskName(taskName.slice(0, maxLength));
            }
        }
    }, [taskName, maxLength]);

    const handleEditNameTask = () => {
    	setIsEditing(true);
  	};

    const handleSaveNameTask = () => {
		const task = tasks.find((task) => task.id === id);
		if (task) {
			const updatedTask = {
				...task,
				descr: taskName,
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
        <>
            <motion.li id={id} className={styles.itemTask} 
                key={id}
                variants={listItemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
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
                    </span>
                ) : (  
                    <span>{nameTask}</span> 
                )}
                <Menu taskId={id} onEditNameTask={handleEditNameTask} /> 
            </motion.li> 
        </>
        
    )
}

export default TaskItem;



