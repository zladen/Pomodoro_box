import { Button } from '../Button/Button';
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { removeTask, RootState } from '../../store/reducers/tasksSlice';
import styles from './modalRemoveTask.module.scss'
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../../i18n';

export interface IModal {
    onClose?: () => void;
    id?: string;
} 

export function ModalRemoveTask({id, onClose}: IModal) {
    const { t } = useTranslation();
    const ref = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (event.target instanceof Node && !ref.current?.contains(event.target)) {
                navigate('/');
            }
        }

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick)
        }

    }, []);

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    const tasks = useSelector((state: RootState) => Object.values(state.tasks.tasks));
    const dispatch = useDispatch();

	const handleRemoveTask = () => {
        const task = tasks.find(task => task.id === id);
        if (task) {
            dispatch(removeTask({ id }));
        }

        handleClose();
    }
    
    const node = document.querySelector('#modal_root');
    if (!node) return null;

    return ReactDOM.createPortal((
        <I18nextProvider i18n={i18n}>
            <div className={styles.modalBackdrop}>
                <div className={styles.modal}>
                    <div className={styles.modalСontent}>
                        <span className={styles.close} onClick={handleClose}>&times;</span>
                        <h3 className={styles.modalTitle}>{t("task_del")}</h3>
                        <Button className={styles.modalBtnDel} onClick={handleRemoveTask} label={(t("label_del")) || ''}/>
                        <Button className={styles.modalBtnСancel} onClick={handleClose} label={(t("label_cls")) || ''}/>
                    </div>
                </div>
            </div>
        </I18nextProvider>
    ), node);
}