import styles from "./timer.module.scss"
import classNames from "classnames";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "../../../lib/i18n";
import { Button } from "../../../ui/Button/Button";
import { EIcons, Icons } from "../../../ui/Icons";
import { useTick } from "../../../hooks/useTick";

export interface ITimer {
    taskId: string
    taskDescr: string;
}

export function Timer({taskId, taskDescr}: ITimer) {
    const { t } = useTranslation();
    const { 
        state, 
        mode, 
        minutes, 
        seconds, 
        series, 
        clickStart, 
        clickPause, 
        clickStopped, 
        clickMinutes, 
        counterShort, 
    } = useTick();
    const min = minutes.toString().padStart(2, "0");
    const sec = seconds.toString().padStart(2, "00");
    return (
        <I18nextProvider i18n={i18n}>
            <div id={taskId} className={styles.timer} >
                <div id="timer-header" className={classNames(styles.timerHeader, 
                        {[styles.timerHeaderActive]: state == 'started' || state == 'paused'},
                        {[styles.timerHeaderBreak]: mode == 'short' || mode == 'long'},
                    )}>
                    <h2 className={styles.timerTitle}>{taskDescr}</h2>
                    <span id='counter' className={styles.countTomato}>
                        {/* {mode == "short" ? `${t("break")} 1` : `${t("tomato")} ${series}`} */}
                        {mode === "long" || mode === "short" && state !== 'paused' ? `${t("break")} ${counterShort}` : `${t("tomato")} ${series}`}
                    </span>
                </div>
                <div className={styles.timerWrapper}>
                    <div className={styles.timerContainer}>
                        <div className={styles.timerBlock}>
                        <div className={styles.timeBlock}>
                            <div 
                                className={classNames(styles.timerMinutes, 
                                    {[styles.timerActive]: state == 'started' && mode !== 'short'}, 
                                    {[styles.timerActiveBreak]: state == 'started' && mode == 'short' || mode == 'long'},
                                )} 
                                id="clock">
                                    {min}:{sec}
                            </div>
                        </div>
                        <Button id='inc' icon={<Icons name={EIcons.btnPlus} />} className={styles.btnPlus} onClick={clickMinutes}/>
                    </div>
                    <span className={styles.timerTask}>{t("task")} 1 - {taskDescr}</span>
                        <div className={styles.btnBlock}>
                            <div className={styles.btnTimer}>
                                <Button 
                                    id="start-button"
                                    className={classNames(styles.btnStart, 
                                        {[styles.btnContinue]: state == 'paused'},
                                    )}

                                    label={(state == 'started' ? t("label_pause") : (state == 'paused' ? t("label_continue") : t("label_start"))) || ''} 
                                    onClick={state == 'started' ? clickPause : clickStart}
                                />

                                <Button 
                                    id="stop-button"
                                    className={classNames(styles.btnStop, 
                                        {[styles.btnStopActive]: state == 'started' || state == 'stopped'}, 
                                        {[styles.btnMade]: state == 'paused'},
                                        //{[styles.btnBreak]: mode == 'short' || 'long'},
                                        {[styles.btnBreakSkip]: mode == 'short' && state == 'paused'}
                                    )}

                                    label={(mode == 'short' ? t("label_skip") 
                                        : (state == 'started' ? t("label_stop") 
                                        : (state == 'paused' ? t("label_completed") 
                                        : (state == 'paused' ? t("label_skip") 
                                        : t("label_stop") )))) || ''}
                                    onClick={clickStopped}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </I18nextProvider>
    )
}