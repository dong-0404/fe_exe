import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from '../features/counter'
import findTutorReducer from '../features/findTutor/findTutorSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        findTutor: findTutorReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

