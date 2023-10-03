import { Button } from "../../../ui/Button/Button";
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers/configSlice';
import { removeTask } from '../../../store/reducers/tasksSlice';
import styles from './modalRemoveTask.module.scss'
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export interface IModal {
    onClose?: () => void;
    id?: string;
} 

export function ModalRemoveTask({id, onClose}: IModal) {
    const { t } = useTranslation();
    const modalContentRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    const task = useSelector((state: RootState) => state.tasks.tasks);
    const dispatch = useDispatch();

    const modalVariants = {
        hidden: {
            opacity: 0,
            y: -50
        },
        visible: {
            opacity: 1,
            y: 0
        }
    };

    const backdropVariants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1
        }
    };

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (event.target instanceof Node && !modalContentRef.current?.contains(event.target)) {
                navigate('/');
            }
        }

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, []);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Проверяем, что клик был сделан не по содержимому модального окна
        if (modalContentRef.current && !modalContentRef.current.contains(e.target as Node)) {
            handleClose();
        }
    }

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    const handleRemoveTask = () => {
        if (task) {
            dispatch(removeTask({ id }));
        }
        handleClose();
    }
    
    const node = document.querySelector('#modal_root');
    if (!node) return null;

    return ReactDOM.createPortal(
        <motion.div 
            className={styles.modalBackdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            onClick={handleBackdropClick}
        >
            <motion.div 
                className={styles.modal}
                variants={modalVariants}
                ref={modalContentRef}
            >
                <div className={styles.modalСontent}>
                    <span className={styles.close} onClick={handleClose}>&times;</span>
                    <h3 className={styles.modalTitle}>{t("task_del")}</h3>
                    <Button className={styles.modalBtnDel} onClick={handleRemoveTask} label={(t("label_del")) || ''}/>
                    <Button className={styles.modalBtnСancel} onClick={handleClose} label={(t("label_cls")) || ''}/>
                </div>
            </motion.div>
        </motion.div>,
        node
    );
}
