import React from 'react'
import { Button } from '../../Button/Button'
import styles from './taskForm.module.scss';

export interface ITaskFormProps {
    handleAddTask: () => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    inputValue: string;
}

export const TaskForm = ({handleAddTask, handleInputChange, inputValue, handleKeyDown}: ITaskFormProps) => {

    return (
        <>
            <input 
                className={styles.nameTask} 
                type="text" placeholder='Название задачи' 
                value={inputValue} 
                onChange={handleInputChange} 
                onKeyDown={handleKeyDown}
            />
            <Button 
                onClick={handleAddTask} 
                className={styles.btnAddTask} 
                label='Добавить'
            />
        </>  
    )
}

export default TaskForm

