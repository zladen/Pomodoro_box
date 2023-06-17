import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import styles from './modalPopup.module.scss'
import classNames from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers/tasksSlice";
export interface IModal {
    onClose?: () => void;
    id?: string;
    message?: string;
} 

export function ModalPopup({ onClose, message }: IModal) {
    const ref = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { mode } = useSelector((state: RootState) => state.timer);


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

    const node = document.querySelector('#modal_root');
    if (!node) return null;

    return ReactDOM.createPortal((
        <div className= 
            {classNames(styles.modalPopup, 
                {[styles.modalPopupBreak]: mode === 'short' || mode === 'long'}, 
            )} 
            ref={ref}
            onClick={onClose}
        >
            <div className={styles.modalPopupСontent}>
                <h3 className={styles.modalTitle}>{message}</h3>
            </div>
        </div>
    ), node);
}