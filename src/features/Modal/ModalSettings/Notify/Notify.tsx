import { useCallback, useEffect } from 'react'
import styles from '../../ModalSettings/TimerSetting/timerSetting.module.scss'
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../../../../lib/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setAlarmSound, setAlerts, setNotifyDuration, setRemains } from '../../../../store/reducers/configSlice';
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
    const { playAlarmSound, notify, alerts, remains, notify_duration } = config;
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
        <I18nextProvider i18n={i18n}>
            <div className={styles.formSettings}>
                <div className={styles.soundsAlert}>
                    <Switch 
                        label={'Проигрывать финишный звук'} 
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
                    label={'Оповещать за минуту до завершения'} 
                    htmlFor={'remains'} 
                    id={'remains'} 
                    action={handleRemains}
                    value={remains}
                />

                <Switch 
                    label={'Включить системные уведомления'} 
                    htmlFor={'notify'} 
                    id={'notify'} 
                    action={handleNotify}
                    value={notify}
                />
                <div className={styles.soundsAlert}>
                    <Switch 
                        label={'Включить всплывающие окна'} 
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
                                <option value="0">Никогда</option>
                                <option value="2000">через 2 секунды</option>
                                <option value="3000">через 3 секунды</option>
                                <option value="5000">через 5 секунд</option>
                            </select>
                        </div>  
                    )}
                </div>
                

            </div>
        </I18nextProvider>  
    )
}
