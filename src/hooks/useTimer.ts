import { useState, useEffect, useRef } from "react";

export function useTimer(pomodoro = 0, shortBreak = 0, longBreak = 0, initialSeconds = 0) {
    const [minutes, setMinutes] = useState(pomodoro);
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(false);
    const [isShortBreak, setIsShortBreak] = useState(false);
    const [isStopped, setIsStopped] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isLongBreak, setIsLongBreak] = useState(false);
    const [counterShortBreak, setCounterShortBreak] = useState(1);

    const intervalId = useRef<NodeJS.Timeout>();

    useEffect(() => {
        let intervalId: string | number | NodeJS.Timeout | undefined;
    
        if (isRunning) {
            intervalId = setInterval(() => {
                setSeconds((prevValue) => prevValue > 0 ? prevValue - 1 : 59);
                setMinutes((prevValue) => prevValue > 0 && seconds === 0 ? prevValue - 1 : prevValue);
            }, 1000);
        }
    
        return () => clearInterval(intervalId);
    }, [isRunning, seconds]);

    useEffect(() => {
        if (minutes === 0 && seconds === 0) {
            setIsRunning(true);
        
            if (!isShortBreak) {
                setIsShortBreak(true);
                setIsLongBreak(counterShortBreak % 4 === 0);
                setMinutes(isLongBreak ? longBreak : shortBreak);
                setSeconds(0);
            } else {
                setIsShortBreak(false);
                setIsLongBreak(false);
                setMinutes(pomodoro);
                setSeconds(initialSeconds);
                setCounterShortBreak((prevState) => prevState + 1);
            }
        }
    }, [
        shortBreak, 
        counterShortBreak, 
        pomodoro, 
        initialSeconds, 
        isLongBreak,
        isRunning, 
        isShortBreak, 
        longBreak, 
        minutes, 
        seconds,
    ]);

    const startTimer = () => {
        setIsRunning(true);
        setIsStopped(false);
        //console.log("Start", "isRunning:", isRunning, "isResting", isResting, "isStopped", isStopped, "isPaused", isPaused);
    }

    const stopTimer = () => {
        setIsRunning(false);
        setIsStopped(true);
        // setIsResting(false);
        // console.log("Пауза", "isRunning:", isRunning, "isResting", isResting, "isStopped", isStopped, "isPaused", isPaused);
    };

    //console.log(isRunning, '- Работает', isStopped, '- Остановлен', isShortBreak, '- Перерыв', isPaused, '-На паузе');

    const resetTimer = () => {
        setMinutes(pomodoro);
        setSeconds(initialSeconds);
        setIsRunning(false);
        //setIsPaused(false);
        clearInterval(intervalId.current as NodeJS.Timeout);
        //workCountRef.current = 0;
    };

    //const pauseTimer = () => setIsPaused((prevState) => !prevState);

    return {
        minutes,
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
        resetTimer,
    };
}
