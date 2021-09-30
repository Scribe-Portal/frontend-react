import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    P: {},
}
const priority = createSlice({
    name: 'priority',
    initialState,
    reducers: {
        addP(state, action) {
            state.P[action.payload.scribe_id] = true
        },
        removeP (state, action) {
            state.P[action.payload.scribe_id] = false
        }
    }

})

export const { changeFirstP, changeSecondP, changeThirdP, setNull } = priority.actions

export default priority.reducer