import { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import styles from './modalSettings.module.scss'
import { Button } from "../../../ui/Button/Button";
import { Notify } from "./Notify/Notify";
import { TimerSetting } from "./TimerSetting/TimerSetting";
import { Navbar } from "./Navbar/Navbar";
import { Application } from "./Application/Application";
import { useTranslation } from "react-i18next";
export interface IModalSetting {
    onClose?: () => void;
} 

export function ModalSetting({onClose}: IModalSetting) {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('timer');
    const ref = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    }

    const handleBackdropClick = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
            navigate('.');
        }
    };
    
    const handleClose = () => {
        if (onClose) onClose();
        navigate(location.pathname.replace('/settings', ''));
    };

    const node = document.querySelector('#modal_root');
    if (!node) return null;

    return ReactDOM.createPortal((
        <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
            <div className={styles.modalSettings}>
                <div className={styles.headerSettings}>
                    <h3 className={styles.modalTitle}>{t("settings")}</h3>
                </div>
                <Navbar onTabClick={handleTabClick} activeTab={activeTab}/>
                    {activeTab === 'timer' && (
                        <TimerSetting />
                    )}

                    {activeTab === 'notify' && (
                        <Notify />
                    )}

                    {activeTab === 'app' && (
                        <Application />
                    )}
                <div className={styles.btnBlock}>
                    <Button className={styles.btnSave} label={t("label_cls") || ''} onClick={handleClose}/>
                </div>
            </div> 
        </div>         
    ), node);
}