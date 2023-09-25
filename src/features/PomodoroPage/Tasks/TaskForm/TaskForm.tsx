import React from 'react'
import { Button } from '../../../../ui/Button/Button'
import styles from './taskForm.module.scss';
import { useTranslation } from 'react-i18next';

export interface ITaskFormProps {
    handleAddTask: () => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    inputValue: string;
}

export const TaskForm = ({handleAddTask, handleInputChange, inputValue, handleKeyDown}: ITaskFormProps) => {
    const { t } = useTranslation();
    return (
        <>
            <input 
                className={`${styles.nameTask} task-enter`} 
                type="text" placeholder={t('task_name') || ''} 
                value={inputValue} 
                onChange={handleInputChange} 
                onKeyDown={handleKeyDown}
            />
            <Button 
                onClick={handleAddTask} 
                className={styles.btnAddTask} 
                label={t("label_add") || ''}
            />
        </>
    )
}

export default TaskForm

