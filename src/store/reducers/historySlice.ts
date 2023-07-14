import { createSlice } from '@reduxjs/toolkit'
import { rootReducer } from '../store';
import { customAlphabet } from 'nanoid';

export type RootState = ReturnType<typeof rootReducer>

export interface Task {
    id: string;
    descr: string;
    duration: number;
    created: number;
    interruptions: number;
    pausedTime: number;
}
  
export interface TasksState {
    data: {
        [taskId: string]: Task;
    };
}

const historySlice = createSlice({
    name: 'history',
    initialState: {
        data: {},
    } as TasksState,

    reducers: {
        setCompleted(state, action) {
            const id = customAlphabet('1234567890abcdef', 10)();
            const newPomodoro = {
                id,
                created: action.payload.created,
                descr: action.payload.descr,
                duration: action.payload.duration,
                started: action.payload.started,
                interruptions: action.payload.interruptions,
                pausedTime: action.payload.pausedTime
            };
            state.data[id] = newPomodoro;
        },
    },
});

export const { setCompleted } = historySlice.actions;
export default historySlice.reducer;