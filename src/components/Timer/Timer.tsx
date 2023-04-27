import { useSelector } from "react-redux";
import { Button } from "../Button/Button";
import { EIcons, Icons } from "../Icons";
import styles from "./timer.module.scss"
import classNames from "classnames";
import { RootState } from "../../store/reducers/tasksSlice";
import { useTimer } from "../../hooks/useTimer";
import { useEffect } from "react";

export interface ITimer {
    taskId: string
    taskName: string;
}

export function Timer({taskId, taskName}: ITimer) {
    const defaulTime = useSelector((state: RootState) => state.settings);
    const {pomodoro, shortBreak, longBreak} = defaulTime;
    
    const {minutes,
        seconds,
        isRunning,
        isStopped,
        isShortBreak,
        isPaused,
        isLongBreak,
        counterShortBreak,
        startTimer,
        stopTimer,
        //pauseTimer,
        resetTimer} = useTimer(pomodoro, shortBreak, longBreak);

        useEffect(() => {
            resetTimer();
        }, [pomodoro, shortBreak, longBreak]);

    return (
        <div id={taskId} className={styles.timer} >
            <div id="timer-header" className={classNames(styles.timerHeader, 
                    {[styles.timerHeaderActive]: isRunning || isStopped},
                    {[styles.timerHeaderBreak]: isShortBreak},
                )}>
                <h2 className={styles.timerTitle}>{taskName}</h2>
                <span id='counter' className={styles.countTomato}>
                    {/* {isResting ? `Перерыв 1` : `Помидор 1`} */}
                    {isShortBreak ? `Перерыв 1` : `Помидор 1`}
                    {/* {isResting ? `Перерыв ${1}` : (isPaused ? `Перерыв 1` : `Помидор ${1}`)} */}
                    
                </span>
            </div>
            <div className={styles.timerWrapper}>
                <div className={styles.timerContainer}>
                    <div className={styles.timerBlock}>
                    <div className={styles.timeBlock}>
                        <span 
                            className={classNames(styles.timerMinutes, 
                                {[styles.timerActive]: isRunning && !isShortBreak}, 
                                {[styles.timerActiveBreak]: isRunning && isShortBreak},
                            )} 
                            id="minutes">
                                {minutes.toString().padStart(2, "0")}
                        </span>
                    </div>
                    <div className={styles.timerBlock}>
                        <span 
                            className={classNames(styles.timerDivider, 
                                {[styles.timerActive]: isRunning && !isShortBreak}, 
                                {[styles.timerActiveBreak]: isRunning && isShortBreak},
                            )}>:
                        </span>
                    </div>
                    <div className={styles.timeBlock}>
                        <span 
                            className={classNames(styles.timerMinutes, 
                                    {[styles.timerActive]: isRunning && !isShortBreak}, 
                                    {[styles.timerActiveBreak]: isRunning && isShortBreak},  
                                )} 
                            id="seconds">
                                {seconds.toString().padStart(2, "00")}
                        </span>
                    </div>      
                    <Button id='inc' icon={<Icons name={EIcons.btnPlus} />} className={styles.btnPlus}/>
                </div>
                <span className={styles.timerTask}>Задача 1 - {taskName}</span>
                <div className={styles.btnBlock}>
                    <div className={styles.btnTimer}>
                        <Button 
                            id="start-button"
                            className={classNames(styles.btnStart, 
                                {[styles.btnContinue]: isStopped && !isRunning},
                            )}

                            label={isRunning ? "Пауза" : (isStopped ? "Продолжить": "Старт")} 
                            onClick={isRunning ? stopTimer : startTimer}
                        />
                        <Button 
                            id="stop-button"
                            className={classNames(styles.btnStop, 
                                {[styles.btnStopActive]: isStopped && !isRunning || isRunning}, 
                                {[styles.btnMade]: isStopped && !isRunning},
                                {[styles.btnBreak]: isShortBreak},
                                {[styles.btnBreakSkip]: isShortBreak && !isRunning}
                            )}

                            label={isShortBreak ? "Пропустить" : (isRunning ? "Стоп" : (isStopped ? "Сделано" : (isPaused ? "Пропустить" : "Стоп")))}
                            onClick={() => {
                                resetTimer();
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
            
            {/* <span className={styles.timerTask}>Задача 1 - {taskName}</span> */}
            {/* <div className={styles.btnTimer}>
                <Button 
                    id="start-button"
                    className={classNames(styles.btnStart, 
                            {[styles.btnContinue]: isStopped && !isRunning},
                        )}

                    label= {isRunning ? "Пауза" : (isStopped ? "Продолжить": "Старт")} 
                    onClick={isRunning ? stopTimer : startTimer}
                />
                <Button 
                    id="stop-button"
                    className={classNames(styles.btnStop, 
                        {[styles.btnStopActive]: isStopped && !isRunning || isRunning}, 
                        {[styles.btnMade]: isStopped && !isRunning},
                        {[styles.btnBreak]: isShortBreak},
                        {[styles.btnBreakSkip]: isShortBreak && !isRunning}
                    )}

                    label={isShortBreak ? "Пропустить" : (isRunning ? "Стоп" : (isStopped ? "Сделано" : (isPaused ? "Пропустить" : "Стоп")))}
                    onClick={() => {
                        resetTimer();
                        // Удалить классы активности из кнопки "Стоп"
                        // document.getElementById("timer-header")?.classList.remove(styles.timerHeaderActive);
                        // document.getElementById("start-button")?.classList.remove(styles.btnContinue);
                        // document.getElementById("stop-button")?.classList.remove(styles.btnStopActive);
                        // document.getElementById("stop-button")?.classList.remove(styles.btnMade);
                    }}
                />
            </div> */}
        </div>
    )
}
