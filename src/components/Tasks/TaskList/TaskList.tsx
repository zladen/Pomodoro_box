import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers/tasksSlice';
import TaskItem from '../TaskItem/TaskItem';
import styles from './taskList.module.scss';

const TaskList = () => {
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    
    return (
        <ol className={styles.taskList}>
            {tasks.map((task, index) => (
                <TaskItem nameTask={task.name} key={index} id={task.id}/> //{...tasks}
            ))}
        </ol>
    )
}

export default TaskList