import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/reducers/configSlice';
import { universalFormatter } from '../../../../utils/helpers/universalFormatter';
import TaskItem from '../TaskItem/TaskItem';
import styles from './taskList.module.scss';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import { selectTasksArray } from '../Tasks';


export const TaskList = () => {
    const { t } = useTranslation();
    const tasks = useSelector(selectTasksArray);
    const durationTask = tasks.reduce((total, task) => total + task.duration, 0);
    const pomodoro = useSelector((state: RootState) => state.config.pomodoro);
    const pomodoroTask = (pomodoro * durationTask) * 1000;

    return (
        <>
            <ol className={styles.taskList}>
                <AnimatePresence>
                    {tasks.map((task, index) => (
                        <TaskItem key={index} id={task.id} nameTask={task.descr} />   
                    ))}
                </AnimatePresence>
            </ol>
            <div className={styles.taskTime}>{universalFormatter(pomodoroTask, 'totalTime', t)}</div>
        </>
    )
}

export default TaskList;