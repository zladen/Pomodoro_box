import { Button } from '../Button/Button';
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { removeTask, RootState } from '../../store/reducers/tasksSlice';
import styles from './modal.module.scss'

export interface IModal {
    onClose?: () => void;
    id?: string;
} 

export function Modal({id, onClose}: IModal) {
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

    const tasks = useSelector((state: RootState) => state.tasks.tasks);
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
        <div className={styles.modalBackdrop}>
            <div className={styles.modal}>
                <div className={styles.modalСontent}>
                    <span className={styles.close} onClick={handleClose}>&times;</span>
                    <h3 className={styles.modalTitle}>Удалить задачу?</h3>
                    <Button className={styles.modalBtnDel} onClick={handleRemoveTask} label='Удалить'/>
                    <Button className={styles.modalBtnСancel} onClick={handleClose} label='Отмена'/>
                </div>
            </div>
        </div>
           
    ), node);
}