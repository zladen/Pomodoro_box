import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers/tasksSlice';
import TaskItem from '../TaskItem/TaskItem';
import styles from './taskList.module.scss';

export interface Props {
    totalTaskCount: string;
}

const TaskList = () => {
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const totalTaskTime = tasks.reduce((total, task) => total + task.time, 0);
    const totalTaskCount = () => {
        const t = totalTaskTime;
        let hours = Math.floor( t / 60 );
        let minutes = Math.floor( t % 60 );

        let result = "";
        if (hours == 1 || hours == 21) {
            result+= `${hours} час`
        } else if (hours > 1 && hours <= 4 || hours >=  22 && hours <= 24) {
            result+= `${hours} часа` 
        } else if (hours && hours >= 5) {
            result+= `${hours} часов` 
        }

        if (minutes && minutes == 1 || minutes == 21 || minutes == 31 || minutes == 41 || minutes == 51) {
            result+= ` ${minutes} минута` 
        } else if (minutes && minutes > 1 && minutes <= 4 || minutes >=  22 && minutes <= 24 || minutes >=  32 && minutes <= 34 || minutes >=  42 && minutes <= 44 || minutes >=  52 && minutes <= 54) {
            result+= ` ${minutes} минуты` 
        } else if (minutes && minutes >= 5) {
            result+= ` ${minutes} минут` 
        }

        return result;
    }  

    return (
        <>
            <ol className={styles.taskList}>
                {tasks.map((task, index) => (
                    <TaskItem nameTask={task.name} key={index} id={task.id} />
                ))}
            </ol>
            <div className={styles.taskTime}>{totalTaskCount()}</div>
        </>
    )
}

export default TaskList;
