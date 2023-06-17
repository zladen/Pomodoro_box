import { createSlice } from '@reduxjs/toolkit'
import { rootReducer } from '../store';

export type RootState = ReturnType<typeof rootReducer>

export interface TimerState {
    duration: number
    endtime: number
    mode: string,
    remains: number
    resumed: number
    series: number 
    started: number
    stopped: number    
    state: string
}

export const initialState: TimerState = {
    duration: 0,
    endtime: 0,
    mode: 'pomodoro',
    remains: 0,
    resumed: 0,
    series: 1, 
    started: 0,
    stopped: 0,    
    state: '',
};

const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {

        startedTimer: (state, action) => {
            state.state = action.payload;
        },

        pausedTimer: (state, action) => {
            state.state = action.payload;
        },

        stoppedTimer: (state, action) => {
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
    },
});

export const {
    startedTimer, 
    pausedTimer, 
    stoppedTimer, 
    setDuration, 
    setStarted, 
    setEndTime, 
    setRemains, 
    setResumed, 
    setMode, 
    setSeries
} = timerSlice.actions;
export default timerSlice.reducer;