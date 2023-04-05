import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeTask, RootState } from '../../../store/reducers/tasksSlice';
import { EIcons } from '../../Icons';
import { Menu } from '../../Menu';
import styles from './taskItem.module.scss';

export interface TaskItemProps {
    nameTask: string;
    id?: string;
}

export const TaskItem = ({nameTask, id}: TaskItemProps) => {
    //const tasks = useSelector((state: RootState) => state.tasks.tasks);
    
    // const handleClick = () => {
    //     tasks.filter((task) => task.id == id);
    //     console.log(nameTask, id);
    // }

    return (
        <li id={id} className={styles.itemTask} >
            <span className={styles.textTask}>{nameTask}</span>
            <Menu taskId={id} /> 
        </li>
        
    )
}

export default TaskItem