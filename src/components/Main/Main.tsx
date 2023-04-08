import { Instructions } from '../Instructions';
import { Tasks } from '../Tasks';
import { Timer } from '../Timer/Timer';
import styles from './main.module.scss'

export function Main() {
    return (
        <main className={styles.container}>
            <div>
                <Instructions />
                <Tasks />
            </div>
            <Timer nameTask={''} id={''} />   
        </main>
    );  
}