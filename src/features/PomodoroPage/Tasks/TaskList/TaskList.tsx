import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/reducers/configSlice';
import { selectTasksArray } from '../Tasks';
import { formatedDuration } from '../../../../utils/helpers/formatedDuration';
import TaskItem from '../TaskItem/TaskItem';
import styles from './taskList.module.scss';

export const TaskList = () => {
    const tasks = useSelector(selectTasksArray);
    const durationTask = tasks.reduce((total, task) => total + task.duration, 0);
    const pomodoro = useSelector((state: RootState) => state.config.pomodoro);
    const pomodoroTask = (pomodoro * durationTask) * 60000;

    return (
        <>
            <ol className={styles.taskList}>
                {tasks.map((task, index) => (
                    <TaskItem key={index} id={task.id} nameTask={task.descr} />
                ))}
            </ol>
            <div className={styles.taskTime}>{formatedDuration(pomodoroTask)}</div>
        </>
    )
}

export default TaskList;