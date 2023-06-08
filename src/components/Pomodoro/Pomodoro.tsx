import { useSelector } from 'react-redux';
import { Instructions } from '../Instructions';
import { Tasks } from '../Tasks';
import { Timer } from '../Timer/Timer';
import styles from './pomodoro.module.scss'
import { RootState } from '../../store/reducers/tasksSlice';

export function Pomodoro() {
    const lastTask = useSelector((state: RootState) => {
        const taskIds = Object.keys(state.tasks.tasks);
        const lastTaskId = taskIds.length > 0 ? taskIds[taskIds.length - 1] : null;
        return state.tasks.tasks[lastTaskId || ''];
    });

    const { id, name } = lastTask ?? {};
    return (
        <main className={styles.container}>
            <div>
                <Instructions />
                <Tasks />
            </div>
            <Timer taskId={id} taskName={name}/> 
        </main>
    );  
}