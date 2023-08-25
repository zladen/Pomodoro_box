import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { RootState } from '../store/reducers/configSlice';
import { 
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
import { useShowAlerts } from './useShowAlerts';
import { setCompleted } from '../store/reducers/historySlice';
import { selectLastTask } from '../features/PomodoroPage/Pomodoro';

export function useTick() {
    const { 
        pomodoro, 
        short, 
        long, 
        autoStartBreak, 
        autoStartPomodoro, 
        delay, 
        notify, 
        remains_minute, 
        alerts 
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
        pausedTime 
    } = useSelector((state: RootState) => state.timer);

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

    useEffect(() => {
        setMinutes(initialMinutes);
        setSeconds(initialSeconds);
    }, [mode, duration, resumed, series]);
  
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);
    const [counterShort, setСounterShort] = useState(1);
    const { playAlarmSoundOnTickEnd } = useSoundAlerts();
    const { systemNotify } = useSystemNotify();
    const { showAlertModal } = useShowAlerts();
    const dispatch = useDispatch();

    const intervalIdRef = useRef<number | NodeJS.Timeout>();

    useEffect(() => {
        
        if (mode === "pomodoro") {
            dispatch(setDuration(pomodoro * 1000));
        }

        if (mode === 'short') {
            dispatch(setDuration(short * 1000))
        }

        if (mode === 'long') {
            dispatch(setDuration(long * 1000))
        }

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
    
    useEffect(() => {
        if (state === "started") {
            if (minutes <= 1 && seconds === 0) {
                if (remains_minute) {
                    playAlarmSoundOnTickEnd();
                }

                if (notify && minutes !== 0) {
                    systemNotify("До завершения меньше одной минуты");
                }
            }

            if (mode === "pomodoro" && minutes === 0 && seconds === 0) {
                //dispatch(setSeries(series + 1))

                dispatch(setCompleted({ descr, duration: 1, created: Date.now() }));
                resetTimer();
                if (notify) {
                    systemNotify("Помидор закончился, начинаем перерыв");
                }

                playAlarmSoundOnTickEnd();
                if (counterShort % delay === 0) {
                    dispatch(setMode("long"));
                    setСounterShort(0);
                } else {
                    dispatch(setMode("short"))
                }
                if (!autoStartBreak) {
                    dispatch(stateTimer("paused"));
                }  

            } else if ((mode === "short" || mode === "long") && minutes === 0 && seconds === 0) {
                resetTimer();
                if (notify) {
                    systemNotify("Перерыв закончился, начинаем помидор");
                }

                playAlarmSoundOnTickEnd();
                if (mode === "short") {
                    setСounterShort((prevValue) => prevValue + 1);
                }
                dispatch(setMode("pomodoro")); 
                if (!autoStartPomodoro) {
                    dispatch(stateTimer("paused"));
                } 
            }
        }
    }, [seconds, minutes]);

    const clickStart = () => {
        dispatch(stateTimer('started'));
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
        dispatch(stateTimer('paused'));
        dispatch(setPaused(Date.now()));
        dispatch(setRemains(endtime - Date.now()));
        dispatch(setInterruptions(interruptions + 1));
    }

    const clickStopped = () => {
        dispatch(stateTimer('stopped'));
        resetTimer();
        clearInterval(intervalIdRef.current);
        setMinutes(initialMinutes);
        setSeconds(initialSeconds);
        

        if (state === 'pomodoro') {
            dispatch(setStopped(Date.now()));
        }

        if (mode === 'pomodoro' && state === 'paused') {
            dispatch(setSeries(series + 1));
            dispatch(setCompleted({ 
                descr, 
                duration: 1, 
                created: Date.now(), 
                started: started, 
                interruptions: interruptions,
                pausedTime: pausedTime + (Date.now() - paused)
            }));
        } else if (mode === 'short' || mode === 'long') {
            dispatch(setMode("pomodoro"));
        } else if (mode === 'pomodoro' && series > 0) {
            setСounterShort(1);
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
        clickStart,
        clickPause,
        clickStopped,
        clickMinutes,
        counterShort,
    };
}
