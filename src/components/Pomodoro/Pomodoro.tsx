import { useSelector } from 'react-redux';
import { Instructions } from '../Instructions';
import { Tasks } from '../Tasks';
import { Timer } from '../Timer/Timer';
import styles from './pomodoro.module.scss'
import { RootState } from '../../store/reducers/tasksSlice';

export function Pomodoro() {
    const lastTask = useSelector((state: RootState) => state.tasks.tasks.slice(-1)[0]);
    const { id, name } = lastTask ?? {};
    //console.log(lastTask);
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