import { createSlice } from '@reduxjs/toolkit'
import { rootReducer } from '../store';

export type RootState = ReturnType<typeof rootReducer>

export interface Task {
    id: string;
    name: string;
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: { items: [] as Task[] },
    reducers: {
        addTask(state, action) {
            const newTask: Task = {
                id: new Date().toISOString(),
                name: action.payload.name
            };
            state.items.push(newTask);
        },
        removeTask(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        }
    },
});

export const {addTask, removeTask} = tasksSlice.actions;
export default tasksSlice.reducer;

// export interface CounterState {
//   	value: number
// }

// const initialState: CounterState = {
//   	value: 1,
// }

// export const counterSlice = createSlice({
//     name: 'counter',
//     initialState,
//     reducers: {
//         increment: (state) => {
//             state.value += 1
//         },
//         decrement: (state) => {
//             state.value -= 1
//         },
//         incrementByAmount: (state, action: PayloadAction<number>) => {
//         state.value += action.payload
//         },
//     },
// })

// export const { increment, decrement, incrementByAmount } = counterSlice.actions

// export default counterSlice.reducer