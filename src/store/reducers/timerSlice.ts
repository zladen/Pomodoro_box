import { createSlice } from '@reduxjs/toolkit'

export interface TimerState {
    duration: number
    endtime: number
    mode: string
    remains: number | null
    resumed: number | null
    series: number 
    started: number
    stopped: number    
    state: string
    interruptions: number,
    paused: number,
    pausedTime: number,
    breaks: number;
    indexTask: number;
    numberTask: number;
}

export const initialState: TimerState = {
    duration: 0,
    endtime: 0,
    mode: 'pomodoro',
    remains: null,
    resumed: null,
    series: 0, 
    started: 0,
    stopped: 0,    
    state: '',
    interruptions: 0,
    paused: 0,
    pausedTime: 0,
    breaks: 1,
    indexTask: 1,
    numberTask: 1
};

const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {

        stateTimer: (state, action) => {
            state.state = action.payload;
        },

        setDuration: (state, action) => {
            state.duration = action.payload;
        },

        setStarted: (state, action) => {
            state.started = action.payload;
        },

        setEndTime: (state, action) => {
            state.endtime = action.payload;
        },

        setRemains: (state, action) => {
            state.remains = action.payload;
        },

        setResumed: (state, action) => {
            state.resumed = action.payload;
        },

        setMode: (state, action) => {
            state.mode = action.payload;
        },

        setSeries: (state, action) => {
            state.series = action.payload;
        },

        setStopped: (state, action) => {
            state.stopped = action.payload;
        },

        setInterruptions: (state, action) => {
            state.interruptions = action.payload
        },

        setPaused: (state, action) => {
            state.paused = action.payload;
        },

        setPausedTime: (state, action) => {
            state.pausedTime = action.payload;
        },

        setBreaks: (state, action) => {
            state.breaks = action.payload;
        },

        setIndex: (state) => {
            state.indexTask += 1;  // Увеличьте счетчик на 1 при завершении задачи
            // const totalNumberOfTasks = action.payload;
            // if (state.indexTask >= totalNumberOfTasks) {
            //     state.indexTask = +1; // Сбросить на 1 только после завершения последней задачи
            // } else {
            //     state.indexTask = 1; // Иначе просто увеличьте индекс
            // }
        },

        setNumberTask: (state, action) => {
            state.numberTask = action.payload;
        },
    },
});

export const {
    stateTimer,
    setDuration, 
    setStarted, 
    setEndTime, 
    setRemains, 
    setResumed, 
    setMode, 
    setSeries,
    setStopped,
    setInterruptions,
    setPaused,
    setPausedTime,
    setBreaks,
    setIndex,
    setNumberTask
} = timerSlice.actions;
export default timerSlice.reducer;