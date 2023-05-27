import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import styles from './modalSettings.module.scss'
import { Button } from "../Button/Button";
import { Notify } from "./Notify/Notify";
import { TimerSetting } from "./TimerSetting/TimerSetting";
import { Navbar } from "./Navbar/Navbar";
import { Application } from "./Application/Application";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "../../i18n";
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

    // const handleItemClicks = (item: string) => {
    //     setActiveTab(item);
    //     console.log(activeTab);
    // }
    
    const node = document.querySelector('#modal_root');
    if (!node) return null;

    return ReactDOM.createPortal((
        <I18nextProvider i18n={i18n}>
            <div className={styles.modalBackdrop}>
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
        </I18nextProvider>        
    ), node);
}
