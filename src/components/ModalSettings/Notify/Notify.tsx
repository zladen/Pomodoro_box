import { useCallback, useEffect } from 'react'
//import styles from './notify.module.scss'
import styles from '../../ModalSettings/TimerSetting/timerSetting.module.scss'
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
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setAlarmSound, setAlerts, setNotify, setRemains, setTickTockSound } from '../../../store/reducers/configSlice';
import Switch from '../../Switch/Switch';


export const Notify = () => {
    const { t } = useTranslation();
    const config = useSelector((state: RootState) => state.config);
    const { playAlarmSound, playTickTockSound, notify, alerts, remains } = config;

    const dispatch = useDispatch();

    const handlePlaySound = useCallback(
        (newValue: string | boolean) => {
            dispatch(setAlarmSound(newValue));
            console.log(newValue);
        },
        [dispatch]
    );
    
    const handlePlaySoundChange = (e: { target: { value: string; }; }) => {
        const newSound = e.target.value;
        dispatch(setAlarmSound(newSound));
    };

    const handleTickTockPlaySound = useCallback(
        (newValue: string | boolean) => {
            dispatch(setTickTockSound(newValue));
            console.log(newValue);
        },
        [dispatch]
    );
    
    const handleTickTockPlaySoundChange = (e: { target: { value: string; }; }) => {
        const newSound = e.target.value;
        dispatch(setTickTockSound(newSound));
    };

    // const handleNotify = useCallback(
    //     (newValue: string | boolean) => {
    //         dispatch(setNotify(newValue));
    //         console.log(newValue);
    //     },
    //     [dispatch]
    // );

    const handleNotify = useCallback(
        (newValue: string | boolean) => {
            dispatch(setNotify(newValue));
            if (newValue === true) {
                if ("Notification" in window) {
                    Notification.requestPermission().then((permission) => {
                        if (permission === "granted") {
                            new Notification("Уведомление", {
                                body: "Изменения сохранены",
                            });
                        }
                    });
                }
            }
        },
        [dispatch]
    );

    const handleAlerts = useCallback(
        (newValue: string | boolean) => {
            dispatch(setAlerts(newValue));
            console.log(newValue);
        },
        [dispatch]
    );

    const handleRemains = useCallback(
        (newValue: string | boolean) => {
            dispatch(setRemains(newValue));
            console.log(newValue);
        },
        [dispatch]
    );

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
    
        const soundObjKey = Object.keys(sounds).find((key) => key === playAlarmSound);
        const soundToPlay = sounds[soundObjKey as keyof typeof sounds];
    
        if (soundToPlay) {
            const sound = new Howl({
                src: [soundToPlay]
            });
            sound.play();
        }
    
    }, [playAlarmSound]);

    return (
        <I18nextProvider i18n={i18n}>
            <div className={styles.formSettings}>
                <div className={styles.soundsAlert}>
                    <Switch 
                        label={'Проигрывать финишный звук'} 
                        htmlFor={'playAlarmSound'} 
                        id={'playAlarmSound'} 
                        action={handlePlaySound}
                        value={!!playAlarmSound}
                        // onChange={handleSwitchChange} 
                    />
                    {playAlarmSound && (
                        <select 
                            className={styles.timeZone} 
                            //defaultValue={playAlarmSound as string} 
                            onChange={handlePlaySoundChange}
                            value={playAlarmSound as string}
                        >
                            <option value="beep">{t("beep")}</option>
                            <option value="сuckoo">{t("сuckoo")}</option>
                            <option value="bugle">{t("bugle")}</option>
                            <option selected value="marimba">{t("marimba")}</option>
                            <option value="police">{t("police")}</option>
                            <option value="rynda">{t("rynda")}</option>
                            <option value="shutdown_xp">{t("shutdown_xp")}</option>
                            <option value="zero">{t("zero")}</option>
                        </select>
                    )}
                </div>
                <div className={styles.soundsAlert}>
                    <Switch 
                        label={'Проигрывать звук таймера'} 
                        htmlFor={'playTickTockSound'} 
                        id={'playTickTockSound'} 
                        action={handleTickTockPlaySound}
                        value={!!playTickTockSound}
                    />
                    {playTickTockSound && (
                        <select 
                            className={styles.timeZone} 
                            onChange={handleTickTockPlaySoundChange}
                            value={playTickTockSound as string}
                        >
                            <option value="beep">{t("beep")}</option>
                            <option value="сuckoo">{t("сuckoo")}</option>
                            <option value="bugle">{t("bugle")}</option>
                            <option selected value="marimba">{t("marimba")}</option>
                            <option value="police">{t("police")}</option>
                            <option value="rynda">{t("rynda")}</option>
                            <option value="shutdown_xp">{t("shutdown_xp")}</option>
                            <option value="zero">{t("zero")}</option>
                        </select>
                    )}
                </div>
                <Switch 
                    label={'Включить системные уведомления'} 
                    htmlFor={'notify'} 
                    id={'notify'} 
                    action={handleNotify}
                    value={notify}
                />

                <Switch 
                    label={'Включить всплывающие окна'} 
                    htmlFor={'alerts'} 
                    id={'alerts'} 
                    action={handleAlerts}
                    value={alerts}
                />

                <Switch 
                    label={'Оповещать за минуту до завершения'} 
                    htmlFor={'remains'} 
                    id={'remains'} 
                    action={handleRemains}
                    value={remains}
                />
            </div>
        </I18nextProvider>  
    )
}
