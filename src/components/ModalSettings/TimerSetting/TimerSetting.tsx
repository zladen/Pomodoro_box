import React, { useEffect } from 'react'
import styles from './timerSetting.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers/tasksSlice';
import { useForm } from 'react-hook-form';
import { settings } from '../../../store/reducers/settingsSlice';
import { useTranslation } from 'react-i18next';

export const TimerSetting = () => {
    const { t } = useTranslation();
    const setting = useSelector((state: RootState) => state.settings);
    const {pomodoro, shortBreak, longBreak} = setting;
    const { register, watch } = useForm({});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(settings({
            pomodoro: watch('pomodoro') || pomodoro,
            shortBreak: watch('shortBreak') || shortBreak,
            longBreak: watch('longBreak') || longBreak,
        }));
    }, [dispatch, watch, pomodoro, shortBreak, longBreak]);

    return (
        <>
            <form className={styles.formSettings} > {/* onSubmit={handleSubmit(onSubmit)} */}
                <div className={styles.itemForm}>
                    <label>{t("tomato")}</label>
                    <input
                        className={styles.settingsTime}
                        {...register("pomodoro")}
                        placeholder='25'
                        onChange={(e) =>
                            dispatch(settings({ pomodoro: +e.target.value }))  // обновление значени�� в Redux при изменении
                        }
                    />
                </div>

                <div className={styles.itemForm}>
                    <label>{t("short_break")}</label>
                    <input className={styles.settingsTime} 
                        {...register("shortBreak")}
                        placeholder="5"
                        onChange={(e) =>
                            dispatch(settings({ shortBreak: +e.target.value }))  // обновление значени�� в Redux при изменении
                        }
                    />
                </div>
                
                <div className={styles.itemForm}>
                    <label>{t("long_break")}</label>
                    <input className={styles.settingsTime} 
                        {...register("longBreak")}
                        placeholder="15"
                        onChange={(e) =>
                            dispatch(settings({ longBreak: +e.target.value }))  // обновление значени�� в Redux при изменении
                        }
                    />
                </div>
                
                {/* <div className={styles.autoStartPomodoro}>
                    <label>Автостарт для помидора</label>
                    <Toggle toggled={true} onClick={logState}/>
                </div>

                <div className={styles.autoStartPomodoro}>
                    <label>Автостарт для перерыва</label>
                    <Toggle toggled={true} onClick={logState}/>
                </div> */}

            </form>
        </>
    )
}
