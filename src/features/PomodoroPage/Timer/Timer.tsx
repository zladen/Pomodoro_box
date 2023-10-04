import styles from "./timer.module.scss"
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { Button } from "../../../ui/Button/Button";
import { EIcons, Icons } from "../../../ui/Icons";
import { useTimer } from "../../../hooks/useTimer";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers/configSlice";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";

export interface ITimer {
    taskId: string
    taskDescr: string;
}

export function Timer({taskId, taskDescr}: ITimer) {
    const { t } = useTranslation();
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const [scale, setScale] = useState(1);
    
    const { 
        state, 
        mode, 
        minutes, 
        seconds, 
        series,
        breaks,
        clickStart, 
        clickPause, 
        clickStopped, 
        clickMinutes,
        numberTask  
    } = useTimer({taskId});

    const min = minutes.toString().padStart(2, "0");
    const sec = seconds.toString().padStart(2, "00");

    useEffect(() => {
        setScale(1.3);
        const timer = setTimeout(() => setScale(1), 500);
        return () => clearTimeout(timer);
    }, [sec]);

    return (
        <div id={taskId} className={styles.timer} >
            <div id="timer-header" className={classNames(styles.timerHeader, 
                    {[styles.timerHeaderActive]: state == 'started' || state == 'paused'},
                    {[styles.timerHeaderBreak]: mode == 'short' || mode == 'long'},
                )}>
                <h2 className={styles.timerTitle}>{taskDescr}</h2>
                <span id='counter' className={styles.countTomato}>
                    {mode === "long" || 
                    mode === "short" && 
                    state !== 'paused' ? `${t("break")} ${breaks}` : `${t("tomato")} ${series}`}
                </span>
            </div>
            <div className={styles.timerWrapper}>
                <div className={styles.timerContainer}>
                    <div className={styles.timerBlock}>
                    <div className={styles.timeBlock}>
                        <motion.div 
                            className={classNames(styles.timerMinutes, 
                                {[styles.timerActive]: state == 'started' && mode !== 'short'}, 
                                {[styles.timerActiveBreak]: state == 'started' && mode == 'short' || mode == 'long'},
                            )} 
                                id="clock"
                                animate={{ scale }}
                                transition={{ duration: 0.5 }}
                            >
                                {min}:{sec}
                        </motion.div>
                    </div>
                    <Button id='inc' icon={<Icons name={EIcons.btnPlus} />} className={styles.btnPlus} onClick={clickMinutes}/>
                </div>
                <span className={classNames(styles.timerTask, 
                    {[styles.hideBtnBlock]: Object.keys(tasks).length === 0})}
                        >
                    {t("task")} № {numberTask} - {taskDescr}
                </span>
                    <div className={classNames(styles.btnBlock, 
                        {[styles.hideBtnBlock]: Object.keys(tasks).length === 0})}>
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
                                    {[styles.btnBreakSkip]: mode == 'short' && state == 'paused'}
                                )}

                                label={(mode == 'short' || mode == 'long' ? t("label_skip") 
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
    )
}