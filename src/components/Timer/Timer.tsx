import { useDispatch, useSelector } from "react-redux";
import { Button } from "../Button/Button";
import { EIcons, Icons } from "../Icons";
import styles from "./timer.module.scss"
import classNames from "classnames";
import { RootState } from "../../store/reducers/tasksSlice";
import { start, stop, pause } from "../../store/reducers/settingsSlice";
import { useTick } from "../../hooks/useTick";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "../../i18n";

export interface ITimer {
    taskId: string
    taskName: string;
}

export function Timer({taskId, taskName}: ITimer) {
    const { t } = useTranslation();
    useTick();
    const { isShortBreak, isLongBreak, isWorking, isPaused, seconds, minutes, counterShortBreak, counterPomodoro } = useSelector((state: RootState) => state.settings);
    const dispatch = useDispatch();

    //console.log(minutes);
    return (
        <I18nextProvider i18n={i18n}>
            <div id={taskId} className={styles.timer} >
                <div id="timer-header" className={classNames(styles.timerHeader, 
                        {[styles.timerHeaderActive]: isWorking || isPaused},
                        {[styles.timerHeaderBreak]: isShortBreak || isLongBreak},
                    )}>
                    <h2 className={styles.timerTitle}>{taskName}</h2>
                    <span id='counter' className={styles.countTomato}>
                        {/* {isResting ? `Перерыв 1` : `Помидор 1`} */}
                        {isShortBreak ? `${t("break")} ${counterShortBreak}` : `${t("tomato")} ${counterPomodoro}`}
                        {/* {isResting ? `Перерыв ${1}` : (isPaused ? `Перерыв 1` : `Помидор ${1}`)} */}
                        
                    </span>
                </div>
                <div className={styles.timerWrapper}>
                    <div className={styles.timerContainer}>
                        <div className={styles.timerBlock}>
                        <div className={styles.timeBlock}>
                            <span 
                                className={classNames(styles.timerMinutes, 
                                    {[styles.timerActive]: isWorking && !isShortBreak}, 
                                    {[styles.timerActiveBreak]: isWorking && isShortBreak},
                                )} 
                                id="minutes">
                                    {minutes.toString().padStart(2, "0")}
                            </span>
                        </div>
                        <div className={styles.timerBlock}>
                            <span 
                                className={classNames(styles.timerDivider, 
                                    {[styles.timerActive]: isWorking && !isShortBreak}, 
                                    {[styles.timerActiveBreak]: isWorking && isShortBreak},
                                )}>:
                            </span>
                        </div>
                        <div className={styles.timeBlock}>
                            <span 
                                className={classNames(styles.timerMinutes, 
                                        {[styles.timerActive]: isWorking && !isShortBreak}, 
                                        {[styles.timerActiveBreak]: isWorking && isShortBreak},  
                                    )} 
                                id="seconds">
                                    {seconds.toString().padStart(2, "00")}
                            </span>
                        </div>      
                        <Button id='inc' icon={<Icons name={EIcons.btnPlus} />} className={styles.btnPlus}/>
                    </div>
                    <span className={styles.timerTask}>{t("task")} 1 - {taskName}</span>
                        <div className={styles.btnBlock}>
                            <div className={styles.btnTimer}>
                                <Button 
                                    id="start-button"
                                    className={classNames(styles.btnStart, 
                                        {[styles.btnContinue]: isPaused && !isWorking},
                                    )}

                                    label={(isWorking ? t("label_pause") : (isPaused ? t("label_continue") : t("label_start"))) || ''} 
                                    onClick={isWorking ? () => dispatch(pause()) : () => dispatch(start())}
                                />
                                <Button 
                                    id="stop-button"
                                    className={classNames(styles.btnStop, 
                                        {[styles.btnStopActive]: isPaused && !isWorking || isWorking}, 
                                        {[styles.btnMade]: isPaused && !isWorking},
                                        {[styles.btnBreak]: isShortBreak},
                                        {[styles.btnBreakSkip]: isShortBreak && !isWorking}
                                    )}

                                    label={(isShortBreak ? t("label_skip") 
                                        : (isWorking ? t("label_stop") 
                                        : (isPaused ? t("label_completed") 
                                        : (isPaused ? t("label_skip") 
                                        : t("label_stop") )))) || ''}
                                    onClick={() => {
                                        () => dispatch(stop());
                                        // Удалить классы активности из кнопки "Стоп"
                                        // document.getElementById("timer-header")?.classList.remove(styles.timerHeaderActive);
                                        // document.getElementById("start-button")?.classList.remove(styles.btnContinue);
                                        // document.getElementById("stop-button")?.classList.remove(styles.btnStopActive);
                                        // document.getElementById("stop-button")?.classList.remove(styles.btnMade);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </I18nextProvider>
        
    )
}

