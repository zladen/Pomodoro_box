
import { useDispatch, useSelector } from "react-redux";
//import { increment } from "../../store/reducers/tasksSlice";
//import { RootState } from "../../store/store";
import { Button } from "../Button/Button";
import { EIcons, Icons } from "../Icons";
import styles from "./timer.module.scss"
import { useState, useEffect } from "react";
import classNames from "classnames";
import { RootState } from "../../store/reducers/tasksSlice";

interface TimerProps {
    nameTask: string;
    id: string;
}

function useTimer(initialMinutes = 25, initialSeconds = 0, initialTomato = 1, initialPause = 1) {
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(false);
    const [tomato, setTomato] = useState(initialTomato);
    const [pause, setPause] = useState(initialPause);

    useEffect(() => {
        let interval: string | number | NodeJS.Timeout | undefined;

        if (isRunning) {
        interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            } else if (minutes > 0) {
                setMinutes(minutes - 1);
                setSeconds(59);
            } else {
                clearInterval(interval);
            }
        }, 1000);
    }

    return () => clearInterval(interval);
    }, [isRunning, minutes, seconds]);

    const startTimer = () => {
        setIsRunning(true);
    };

    const stopTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setMinutes(initialMinutes);
        setSeconds(initialSeconds);
    };

    return { minutes, seconds, isRunning, startTimer, stopTimer, resetTimer };
}

export function Timer({nameTask, id}: TimerProps) {
    //const count = useSelector((state: RootState) => state.counter.value)
    //const dispatch = useDispatch()

    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    
    const handleClick = () => {
        tasks.filter((task) => task.id == id);
        console.log(nameTask, id);
    }

    const { minutes, seconds, isRunning, startTimer, stopTimer, resetTimer } = useTimer();

    return (
        <div id={id} className={styles.timer}>
            <div className={classNames(styles.timerHeader, { [styles.timerHeaderActive]: isRunning })}>
                <h2 className={styles.timerTitle}>Сверстать сайт</h2>
                <span id='counter' className={styles.countTomato}>Помидор 1</span>
            </div>
            <div className={styles.timerWrapper}>
                <div className={styles.timerBlock}>
                    <div className={styles.timeBlock}>
                        <span 
                            className={classNames(styles.timerMinutes, {[styles.timerActive]: isRunning })} 
                            id="minutes">{minutes.toString().padStart(2, "0")}
                        </span>
                    </div>
                    <div className={styles.timerBlock}>
                        <span 
                            className={classNames(styles.timerDivider, {[styles.timerActive]: isRunning })}>:
                        </span>
                    </div>
                    <div className={styles.timeBlock}>
                        <span 
                            className={classNames(styles.timerMinutes, {[styles.timerActive]: isRunning })} 
                            id="seconds">{seconds.toString().padStart(2, "00")}
                        </span>
                    </div>      
                    <Button id='inc' icon={<Icons name={EIcons.btnPlus} />} className={styles.btnPlus} onClick={handleClick}/>
                </div>
            </div>
            
            <span className={styles.timerTask}>Задача 1 - Сверстать сайт</span>
            <div className={styles.btnTimer}>
                <Button 
                    className={styles.btnStart}
                    label={isRunning ? "Пауза" : "Старт"}
                    onClick={isRunning ? stopTimer : startTimer}
                />
                <Button 
                    className={classNames(styles.btnStop, {[styles.btnStopActive]: isRunning })} 
                    label="Стоп" 
                    onClick={resetTimer}
                />
            </div>
        </div>
    )
}