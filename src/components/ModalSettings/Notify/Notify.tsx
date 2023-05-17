import React, { useEffect, useState } from 'react'
import Toggle from '../../Toggle/Toggle'
import styles from './notify.module.scss'
import { Howl } from 'howler';
import beep from '../../../assets/sounds/beep.mp3';
import сuckoo from '../../../assets/sounds/сuckoo.mp3';
import bugle from '../../../assets/sounds/bugle.mp3';
import marimba from '../../../assets/sounds/marimba.mp3';
import police from '../../../assets/sounds/police.mp3';
import rynda from '../../../assets/sounds/rynda.mp3';
import shutdown_xp from '../../../assets/sounds/shutdown_xp.mp3';
import zero from '../../../assets/sounds/zero.mp3';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../../../i18n';


export const Notify = () => {
    const { t } = useTranslation();
    const [sound, setSound] = useState('');
    //const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(false);
    // const handleSoundChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setIsSoundEnabled(event.target.checked);
    //     console.log(setIsSoundEnabled(event.target.checked));
    // };

    const logState = (state: boolean) => {
        console.log("Toggled:", state)
    }
    
    useEffect(() => {
        const sounds = {
            beep,
            сuckoo,
            bugle,
            marimba,
            police,
            rynda,
            shutdown_xp,
            zero,
        };
    
        const soundObjKey = Object.keys(sounds).find((key) => key === sound);
        const soundToPlay = sounds[soundObjKey as keyof typeof sounds];
    
        if (soundToPlay) {
            const sound = new Howl({
                src: [soundToPlay]
            });
            sound.play();
        }
    
    }, [sound]);

    return (
        <I18nextProvider i18n={i18n}>
            <div className={styles.notify}>
                <div className={styles.soundsAlert}>
                    <label>{t("alarm_sound")}</label>
                    <Toggle toggled={false} onChange={logState} />
                    <select className={styles.soundsItemList} onChange={(e) => setSound(e.target.value)}>
                        <option value="beep">{t("beep")}</option>
                        <option value="сuckoo">{t("сuckoo")}</option>
                        <option value="bugle">{t("bugle")}</option>
                        <option value="marimba">{t("marimba")}</option>
                        <option value="police">{t("police")}</option>
                        <option value="rynda">{t("rynda")}</option>
                        <option value="shutdown_xp">{t("shutdown_xp")}</option>
                        <option value="zero">{t("zero")}</option>
                    </select>
                </div>
            </div>
        </I18nextProvider>  
    )
}
