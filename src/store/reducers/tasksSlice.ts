import { createSlice } from '@reduxjs/toolkit'
import { rootReducer } from '../store';
import { nanoid } from 'nanoid';

export type RootState = ReturnType<typeof rootReducer>
export interface Task {
    id: string;
    name: string;
    time: number;
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [] as Task[],
    },

    reducers: {
        addTask(state, action) {
            const id = nanoid(8);
            state.tasks.push({
                id,
                name: action.payload.name,
                time: action.payload.time,
                //tomato: action.payload.tomato,
            });
        },

        addTime(state, action) {
            const { id, time } = action.payload;
            const timeTotask = state.tasks.find(task => task.id === id);

            if (timeTotask) {
                timeTotask.time = time;
            } else {
                console.error(`Task with id ${id} not found`);
            }
        },

        editTask(state, action) {
            const { id, name } = action.payload;
            const editTaskName = state.tasks.find(task => task.id === id);

            if (editTaskName) {
                editTaskName.name = name;
            } else {
                console.error(`Task with id ${id} not found`);
            }
        },

        removeTask(state, action) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
        }
    },
});

export const {addTask, removeTask, editTask, addTime} = tasksSlice.actions;
export default tasksSlice.reducer;

