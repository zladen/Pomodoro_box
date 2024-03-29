import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { customAlphabet } from 'nanoid';
export interface Task {
    id: string;
    descr: string;
    duration: number;
    created: number;
}

interface TasksState {
    tasks: Record<string, Task>;
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: {},
    } as TasksState,

    reducers: {
        addTask(state, action) {
            const id = customAlphabet('1234567890abcdef', 10)();
            const newTask = {
                id,
                created: action.payload.created,
                descr: action.payload.descr,
                duration: action.payload.duration,
            };
            state.tasks[id] = newTask;
        },

        updateTime(state, action) {
            const { id, duration } = action.payload;
            state.tasks[id].duration = duration;
        },

        editTask(state, action) {
            const { id, descr } = action.payload;
            state.tasks[id].descr = descr;
        },

        removeTask(state, action) {
            delete state.tasks[action.payload.id];
        },

        updateTask(state, action) {
            const { id, duration } = action.payload;
            state.tasks[id] = {
                ...state.tasks[id],
                duration: duration ?? state.tasks[id].duration,
            };
        },
    },
});

export const {addTask, removeTask, editTask, updateTime, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;

