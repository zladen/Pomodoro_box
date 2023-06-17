import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { rootReducer } from '../store';
import { nanoid } from 'nanoid';

export type RootState = ReturnType<typeof rootReducer>
export interface Task {
    id: string;
    name: string;
    duration: number;
}
  
export interface TasksState {
    tasks: {
        [taskId: string]: Task;
    };
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: {},
    } as TasksState,

    reducers: {
        addTask(state, action) {
            const id = nanoid(8);
            const newTask = {
                id,
                name: action.payload.name,
                duration: action.payload.duration,
            };
            state.tasks[id] = newTask;
        },

        updateTime(state, action) {
            const { id, duration } = action.payload;
            state.tasks[id].duration = duration;
        },

        editTask(state, action) {
            const { id, name } = action.payload;
            state.tasks[id].name = name;
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

