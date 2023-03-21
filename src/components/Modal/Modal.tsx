import { Button } from '../Button/Button';
import styles from './modal.module.scss'
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";


export interface IModal {
    onClose?: () => void;
    postId?: string;
} 

export function Modal(props: IModal) {
    const ref = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (event.target instanceof Node && !ref.current?.contains(event.target)) {
                navigate('/modal');
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
        <div className={styles.modal}>
            <div className={styles.close}>&#9747;</div>
            <span className={styles.modalText}>Удалить задачу?</span>
			<Button className={styles.modalBtnDel} label='Удалить'/>
            <Button className={styles.modalBtnСancel} label='Отмена'/>
		</div>
    ), node);
}