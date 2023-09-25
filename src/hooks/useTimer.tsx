import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { RootState } from '../store/reducers/configSlice';
import { 
    setBreaks,
    // clearCurrentTaskId,
    // setCurrentTaskId,
    setDuration, 
    setEndTime, 
    setInterruptions, 
    setMode, 
    setPaused, 
    setPausedTime, 
    setRemains, 
    setResumed, 
    setSeries, 
    setStarted, 
    setStopped, 
    stateTimer, 
} from '../store/reducers/timerSlice';
import { useSoundAlerts } from './useSoundAlerts';
import { useSystemNotify } from './useSystemNotify';
import { setCompleted } from '../store/reducers/historySlice';
import { selectLastTask } from '../features/PomodoroPage/Pomodoro';
import { useMenu } from './useMenu';

interface UseTimerProps {
	taskId?: string;
}

const STARTED = 'started';
const PAUSED = 'paused';
const STOPPED = 'stopped';
const POMODORO = 'pomodoro';
const SHORT = 'short';
const LONG = 'long';

export function useTimer({taskId}: UseTimerProps) {
    const { 
        pomodoro, 
        short, 
        long, 
        autoStartBreak, 
        autoStartPomodoro, 
        delay, 
        notify,
        remains_minute, 
    } = useSelector((state: RootState) => state.config);

    const { 
        state, 
        mode, 
        duration, 
        series, 
        started, 
        endtime, 
        remains, 
        resumed,
        interruptions, 
        paused,
        pausedTime, 
        breaks 
    } = useSelector((state: RootState) => state.timer);

    const { handleCompletePomodoro } = useMenu({taskId});

    const lastTask = useSelector(selectLastTask);
    const { descr } = lastTask ?? {};

    const initialTime = () => {
        if (remains !== null) {
            let initialMinutes = Math.floor(remains / 1000 / 60);
            let initialSeconds = Math.floor((remains / 1000) % 60);
            return [initialSeconds, initialMinutes];
        } else {
            let initialMinutes =  duration / 1000 / 60;
            let initialSeconds = 0;
            return [initialSeconds, initialMinutes];
        }
    }

    const [initialSeconds, initialMinutes] = initialTime();
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        setMinutes(initialMinutes);
        setSeconds(initialSeconds);
    }, [duration]);
    
    //const [counterBreak, setCounterBreak] = useState(1);
    const { playAlarmSoundOnTickEnd } = useSoundAlerts();
    const { systemNotify } = useSystemNotify();
    const dispatch = useDispatch();
    const intervalIdRef = useRef<number | NodeJS.Timeout>();

    useEffect(() => {
        if (mode === POMODORO) {
            dispatch(setDuration(pomodoro * 1000));
            if (remains !== null) {
                dispatch(setRemains(pomodoro * 1000));
            }
        }

        if (mode === SHORT) {
            dispatch(setDuration(short * 1000))
            if (remains !== null) {
                dispatch(setRemains(short * 1000));
            }
        }

        if (mode === LONG) {
            dispatch(setDuration(long * 1000))
            if (remains !== null) {
                dispatch(setRemains(long * 1000));
            }
        }
    }, [mode, pomodoro, short, long, remains]);

    
    useEffect(() => {

        if (state === 'started') {
            intervalIdRef.current = setInterval(() => {
                setSeconds((prevValue) => prevValue > 0 ? prevValue - 1 : 9);
                setMinutes((prevValue) => prevValue > 0 && seconds === 0 ? prevValue - 1 : prevValue);
            }, 1000);
        }
            
        return () => clearInterval(intervalIdRef.current);
    }, [state, pomodoro, short, long, minutes, seconds]);

    const resetTimer = () => {
        dispatch(setStarted(0));
        dispatch(setEndTime(0));
        dispatch(setRemains(duration));
        dispatch(setResumed(null));
        dispatch(setPaused(0));
        dispatch(setInterruptions(0));
        dispatch(setPausedTime(0));
    }

    const handlePomodoroEnd = () => {
        dispatch(setCompleted({ descr, duration: 1, created: Date.now() }));
        dispatch(setSeries(series + 1));
        resetTimer();

        if (notify) {
            systemNotify("Помидор закончился, начинаем перерыв");
        }
        playAlarmSoundOnTickEnd();

        if (breaks > 0 && breaks % delay === 0) { 
            dispatch(setMode(LONG));
        } else {
            dispatch(setMode(SHORT));
        }
        if (!autoStartBreak) {
            dispatch(stateTimer(PAUSED));
        }  
    };

    const handleBreakEnd = () => {
        resetTimer();
        if (notify) {
            systemNotify("Перерыв закончился, начинаем помидор");
        }
        playAlarmSoundOnTickEnd();
        if (mode === SHORT || LONG) {
            //setCounterBreak((prevValue) => prevValue + 1);
            dispatch(setBreaks(breaks + 1));
        }
        dispatch(setMode(POMODORO)); 
        if (!autoStartPomodoro) {
            dispatch(stateTimer(PAUSED));
        } 
    };

    useEffect(() => {
        if (state === STARTED) {
            // Срабатывает звуковой сигнал и уведомление, если осталась 1 минута
            if (minutes <= 1 && seconds === 0) {
                if (remains_minute) {
                    playAlarmSoundOnTickEnd();
                }
    
                if (notify && minutes !== 0) {
                    systemNotify("До завершения меньше одной минуты");
                }
            }

            if (minutes === 0 && seconds === 0) {
                if (mode === POMODORO) {
                    handlePomodoroEnd();
                    handleCompletePomodoro();
                } else if (mode === SHORT || mode === LONG) {
                    handleBreakEnd();
                }
            }
        }
    }, [state, minutes, seconds]); 

    useEffect(() => {
        // Если lastTask не определен или является пустым объектом
        if (!lastTask || Object.keys(lastTask).length === 0) {
            // Возвращаем таймер в исходное состояние
            dispatch(stateTimer(''));
            resetTimer(); // Вызываем функцию сброса таймера
            dispatch(setMode(POMODORO));
            dispatch(setSeries(0));
            dispatch(setBreaks(1));
            //setCounterBreak(1);
            clearInterval(intervalIdRef.current); // Очищаем текущий интервал
            setMinutes(Math.floor(duration / 1000 / 60));
            setSeconds(Math.floor((duration / 1000) % 60));
        }
    }, [lastTask]);

    const clickStart = () => {
        dispatch(stateTimer(STARTED));
        // dispatch(setCurrentTaskId(taskId));
        const nowTime = Date.now();
        if (started === 0) {
            if (series === 0) {
                dispatch(setSeries(series + 1))
            }
            dispatch(setStarted(nowTime));
            dispatch(setRemains(duration));
            dispatch(setEndTime(nowTime + duration));
        } else if (remains !== null) {
            const roundedRemains = Math.round(remains / 1000) * 1000;
            dispatch(setResumed(nowTime));
            dispatch(setEndTime(nowTime + roundedRemains));
            dispatch(setPausedTime(pausedTime + (nowTime - paused)));  
        }
    }

    const clickPause = () => {
        dispatch(stateTimer(PAUSED));
        dispatch(setPaused(Date.now()));
        dispatch(setRemains(endtime - Date.now()));
        dispatch(setInterruptions(interruptions + 1));
    }

    const clickStopped = () => {
        dispatch(stateTimer(STOPPED));
        //dispatch(clearCurrentTaskId());
        resetTimer();
        clearInterval(intervalIdRef.current);
        setMinutes(Math.floor(duration / 1000 / 60));
        setSeconds(Math.floor((duration / 1000) % 60));
        
        if (state === POMODORO) {
            dispatch(setStopped(Date.now()));
        }

        if (mode === POMODORO && state === PAUSED) {
            handleCompletePomodoro()
            dispatch(setSeries(series + 1));
            dispatch(setCompleted({ 
                descr, 
                duration: 1, 
                created: Date.now(), 
                started: started, 
                interruptions: interruptions,
                pausedTime: pausedTime + (Date.now() - paused)
            }));

        } else if (mode === SHORT || mode === LONG) {
            dispatch(setBreaks(breaks + 1));
            dispatch(setMode("pomodoro"));
        } else if (mode === POMODORO && state === STOPPED) {
            return
        } else if (mode === POMODORO && series > 0) {
            //setCounterBreak(1);
            dispatch(setSeries(series - 1));
        }
    }

    const clickMinutes = () => {
        let addMinutes = minutes + 1;
        setMinutes(addMinutes);
    }

    return {
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
        //counterBreak,
    };
}
