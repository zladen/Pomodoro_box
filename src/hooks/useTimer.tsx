import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { RootState } from '../store/reducers/configSlice';
import { 
    setBreaks,
    setDuration, 
    setEndTime, 
    setInterruptions, 
    setMode, 
    setNumberTask, 
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
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();
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
        indexTask,
        breaks, 
        numberTask
    } = useSelector((state: RootState) => state.timer);

    const { handleCompletePomodoro, tasks } = useMenu({taskId});

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
    
    const { playAlarmSoundOnTickEnd } = useSoundAlerts();
    const { systemNotify } = useSystemNotify();
    const dispatch = useDispatch();
    const intervalIdRef = useRef<number | NodeJS.Timeout>();

    useEffect(() => {
        if (mode === POMODORO) {
            dispatch(setDuration(pomodoro * 1000));
            if (resumed == null) {
                dispatch(setRemains(pomodoro * 1000));
            }
        }

        if (mode === SHORT) {
            dispatch(setDuration(short * 1000))
            if (resumed == null) {
                dispatch(setRemains(short * 1000));
            }
        }

        if (mode === LONG) {
            dispatch(setDuration(long * 1000))
            if (resumed == null) {
                dispatch(setRemains(long * 1000));
            }
        }
    }, [mode, pomodoro, short, long]);

    
    useEffect(() => {

        if (state === 'started') {
            intervalIdRef.current = setInterval(() => {
                setSeconds((prevValue) => prevValue > 0 ? prevValue - 1 : 59);
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
            systemNotify(t("tomato_out"));
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
            systemNotify(t("break_over"));
        }
        playAlarmSoundOnTickEnd();
        if (mode === SHORT || LONG) {
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
                    systemNotify(t("minute_completion"));
                }
            }

            if (minutes === 0 && seconds === 0) {
                if (mode === POMODORO) {
                    handleCompletePomodoro();
                    handlePomodoroEnd();
                } else if (mode === SHORT || mode === LONG) {
                    handleBreakEnd();
                }
            }
        }
    }, [state, minutes, seconds]); 

    useEffect(() => {
        if (!lastTask || Object.keys(lastTask).length === 0) {
            // Возвращаем таймер в исходное состояние
            dispatch(stateTimer(''));
            resetTimer(); // Вызываем функцию сброса таймера
            dispatch(setMode(POMODORO));
            dispatch(setSeries(0));
            dispatch(setBreaks(1));
            dispatch(setNumberTask(1))
            clearInterval(intervalIdRef.current);
            setMinutes(Math.floor(duration / 1000 / 60));
            setSeconds(Math.floor((duration / 1000) % 60));
        }
    }, [lastTask]);

    const clickStart = () => {
        dispatch(stateTimer(STARTED));
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
        console.log(endtime - Date.now())
    }

    

    const clickStopped = () => {
        dispatch(stateTimer(STOPPED));
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
        indexTask,
        clickStart,
        clickPause,
        clickStopped,
        clickMinutes,
        numberTask
    };
}
