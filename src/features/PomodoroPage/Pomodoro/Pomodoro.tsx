import { useSelector } from 'react-redux';
import { Instructions } from '../Instructions';
import { Tasks } from '../Tasks';
import { Timer } from '../Timer';
import styles from './pomodoro.module.scss'
import { RootState } from '../../../store/reducers/configSlice';
import { createSelector } from '@reduxjs/toolkit';
import { ModalPopup } from '../../Modal/ModalPopup/ModalPopup';

export const selectTasksState = (state: RootState) => state.tasks.tasks;
export const selectLastTask = createSelector(
    selectTasksState,
    (tasks) => {
        const taskIds = Object.keys(tasks);
        const lastTaskId = taskIds.length > 0 ? taskIds[taskIds.length - 1] : null;
        return tasks[lastTaskId || ''];
    }
);

export function Pomodoro() {
    const lastTask = useSelector(selectLastTask);
    const { id, descr } = lastTask ?? {};

    return (
        <main className={styles.container}>
            <div>
                <Instructions />
                <Tasks />
            </div>
            <Timer taskId={id} taskDescr={descr}/>
            {/* <ModalPopup />  */}
        </main>
    );  
}