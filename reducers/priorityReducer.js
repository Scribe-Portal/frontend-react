import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    P: [],
}
const priority = createSlice({
    name: 'priority',
    initialState,
    reducers: {
        addP(state, action) {
            state.P.append(action.payload.scribe_id)
        },
        removeP (state, action) {
            // state.P.
        }
    }

})

export const { changeFirstP, changeSecondP, changeThirdP, setNull } = priority.actions

export default priority.reducer