import { useCallback, useEffect } from 'react'
import styles from '../../ModalSettings/TimerSetting/timerSetting.module.scss'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setAlarmSound, setNotifyDuration, setRemains } from '../../../../store/reducers/configSlice';
import Switch from '../../../../ui/Switch/Switch';
import { useSoundAlerts } from '../../../../hooks/useSoundAlerts';
import { useSystemNotify } from '../../../../hooks/useSystemNotify';
import { useShowAlerts } from '../../../../hooks/useShowAlerts';

export const Notify = () => {
    const { t } = useTranslation();
    const {handlePlaySound, handlePlaySoundChange} = useSoundAlerts();
    const { handleNotify } = useSystemNotify();
    const { handleAlerts } = useShowAlerts();
    const config = useSelector((state: RootState) => state.config);
    const { playAlarmSound, notify, alerts, notify_duration, remains_minute } = config;
    const dispatch = useDispatch();

    const handleRemains = useCallback(
        (newValue: string | boolean) => {
            dispatch(setRemains(newValue));
        },
        [dispatch]
    );

    const handleNotifyDuration = (e: { target: { value: string; }; }) => {
        const newValue = parseInt(e.target.value);
        dispatch(setNotifyDuration(newValue));
    };

    useEffect(() => {
        if (playAlarmSound === true) {
            dispatch(setAlarmSound('beep'));
        }
    })

    return (
        <div className={styles.formSettings}>
            <div className={styles.soundsAlert}>
                <Switch 
                    label={t("play_finish_sound")} 
                    htmlFor={'playAlarmSound'} 
                    id={'playAlarmSound'} 
                    action={handlePlaySound}
                    value={!!playAlarmSound} 
                />
                {playAlarmSound && (
                    <select 
                        className={styles.timeZone} 
                        onChange={handlePlaySoundChange}
                        value={playAlarmSound as string}
                    >
                        <option value="beep">{t("beep")}</option>
                        <option value="сuckoo">{t("сuckoo")}</option>
                        <option value="bugle">{t("bugle")}</option>
                        <option value="marimba">{t("marimba")}</option>
                        <option value="police">{t("police")}</option>
                        <option value="rynda">{t("rynda")}</option>
                        <option value="shutdown_xp">{t("shutdown_xp")}</option>
                        <option value="zero">{t("zero")}</option>
                    </select>
                )}
            </div>

            <Switch 
                label={t("notify_one_minute")} 
                htmlFor={'remains'} 
                id={'remains'} 
                action={handleRemains}
                value={remains_minute}
            />

            <Switch 
                label={"enable_system_notifications"} 
                htmlFor={'notify'} 
                id={'notify'} 
                action={handleNotify}
                value={notify}
            />
            <div className={styles.soundsAlert}>
                <Switch 
                    label={t("enable_popup")} 
                    htmlFor={'alerts'} 
                    id={'alerts'} 
                    action={handleAlerts}
                    value={alerts}
                />
                {alerts && (
                    <div className={styles.showMenu}>
                        <label htmlFor="alerts" className={styles.labelMenu}>Прятать оповещения</label>
                        <select 
                            className={styles.timeZone} 
                            onChange={handleNotifyDuration}
                            value={notify_duration}
                        >
                            <option value="0">t("never")</option>
                            <option value="2000">t("through" 2 "seconds")</option>
                            <option value="3000">t("through" 2 "seconds")</option>
                            <option value="5000">t("through" 5 "second")</option>
                        </select>
                    </div>  
                )}
            </div>
            

        </div> 
    )
}
