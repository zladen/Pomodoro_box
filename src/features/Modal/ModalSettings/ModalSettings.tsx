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
import { motion } from 'framer-motion';

export interface IModalSetting {
    onClose?: () => void;
} 

export function ModalSetting({onClose}: IModalSetting) {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('timer');
    const navigate = useNavigate();

    const modalVariants = {
        hidden: {
            x: "-100vw"
        },
        visible: {
            x: "0"
        },
        exit: {
            x: "100vw"
        }
    };

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    }
    
    const handleBackdropClick = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    };

    const handleClose = () => {
        if (onClose) onClose();
        navigate(location.pathname.replace('/settings', ''));
    };

    const node = document.querySelector('#modal_root');
    if (!node) return null;

    return ReactDOM.createPortal(
        <motion.div 
            onClick={handleBackdropClick}
            className={styles.modalBackdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <motion.div 
                className={styles.modalSettings}
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
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
            </motion.div>
        </motion.div>,
        node
    );
}
