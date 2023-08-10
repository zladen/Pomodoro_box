import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/reducers/tasksSlice';
import TaskItem from '../TaskItem/TaskItem';
import styles from './taskList.module.scss';
import { useTranslation } from 'react-i18next';
import { selectTasksArray } from '../Tasks';

export interface Props {
    totalTaskCount: string;
}

export const TaskList = () => {
    const { t } = useTranslation();
    const tasks = useSelector(selectTasksArray);
    const durationTask = tasks.reduce((total, task) => total + task.duration, 0);
    const pomodoro = useSelector((state: RootState) => state.config.pomodoro);
    const pomodoroTask = (pomodoro * durationTask) / 60;
    

    const totalTaskCount = () => {
        let hours = Math.floor( pomodoroTask / 60 );
        let minutes = Math.floor( pomodoroTask % 60 );

        let result = "";
        if (hours == 1 || hours == 21) {
            result+= `${hours} ${t("hour")}`
        } else if (hours > 1 
            && hours <= 4 
            || hours >=  22 
            && hours <= 24) {
            result+= `${hours} ${t("hours")}` 
        } else if (hours && hours >= 5) {
            result+= `${hours} ${t("hours2")}` 
        }

        if (minutes 
            && minutes == 1 
            || minutes == 21 
            || minutes == 31 
            || minutes == 41 
            || minutes == 51) {
            result+= ` ${minutes} ${t("minute")}` 
        } else if (minutes && minutes > 1 
            && minutes <= 4 || minutes >=  22 
            && minutes <= 24 || minutes >=  32 
            && minutes <= 34 || minutes >=  42 
            && minutes <= 44 || minutes >=  52 
            && minutes <= 54) {
            result+= ` ${minutes} ${t("minutes")}` 
        } else if (minutes && minutes >= 5) {
            result+= ` ${minutes} ${t("minutes2")}` 
        }

        return result;
    }  

    return (
        <>
            <ol className={styles.taskList}>
                {tasks.map((task, index) => (
                    <TaskItem key={index} id={task.id} nameTask={task.descr} />
                ))}
            </ol>
            <div className={styles.taskTime}>{totalTaskCount()}</div>
        </>
    )
}

export default TaskList;