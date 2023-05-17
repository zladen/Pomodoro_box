import React from 'react'
import { Button } from '../../Button/Button'
import styles from './taskForm.module.scss';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../../../i18n';

export interface ITaskFormProps {
    
    handleAddTask: () => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    inputValue: string;
}

export const TaskForm = ({handleAddTask, handleInputChange, inputValue, handleKeyDown}: ITaskFormProps) => {
    const { t } = useTranslation();
    return (
        <I18nextProvider i18n={i18n}>
            <input 
            className={styles.nameTask} 
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
         </I18nextProvider>
    )
}

export default TaskForm

