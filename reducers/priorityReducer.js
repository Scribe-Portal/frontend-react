import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    P: {},
    num: 0,
}
const priority = createSlice({
    name: 'priority',
    initialState,
    reducers: {
        addP(state, action) {
            state.num += 1
            if (state.P[action.payload.scribe_id]) state.num-=1
            state.P[action.payload.scribe_id] = true
        },
        removeP (state, action) {
            if (state.P[action.payload.scribe_id]) state.num-=1
            state.P[action.payload.scribe_id] = false
        },
        removeAll(state, action) {
            state.num=0
            state.P = {}
        }
    }

})

export const { addP, removeP, removeAll } = priority.actions

export default priority.reducer