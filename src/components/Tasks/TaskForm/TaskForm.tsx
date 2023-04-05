import React from 'react'
import { Button } from '../../Button/Button'
import styles from './taskForm.module.scss';

export interface ITaskFormProps {
    handleAddTask: () => void;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    inputValue: string;
}

export const TaskForm = ({handleAddTask, handleInputChange, inputValue}: ITaskFormProps) => {

    return (
        <>
            <input className={styles.nameTask} type="text" placeholder='Название задачи' value={inputValue} onChange={handleInputChange}/>
            <Button onClick={handleAddTask} className={styles.btnAddTask} label='Добавить'/>
        </>  
    )
}

export default TaskForm

