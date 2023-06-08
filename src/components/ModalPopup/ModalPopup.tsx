import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import styles from './modalPopup.module.scss'
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../../i18n';

export interface IModal {
    onClose?: () => void;
    id?: string;
} 

export function ModalPopup({id, onClose}: IModal) {
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
    
    const node = document.querySelector('#modal_root');
    if (!node) return null;

    return ReactDOM.createPortal((
        <I18nextProvider i18n={i18n}>
            <div className={styles.modalPopup}>
                <div className={styles.modalPopupСontent}>
                    <h3 className={styles.modalTitle}>Настройки сохранены</h3>
                </div>
            </div>
        </I18nextProvider>
    ), node);
}