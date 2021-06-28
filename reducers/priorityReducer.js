import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    firstP: null,
    secondP: null,
    thirdP: null,
}
const priority = createSlice({
    name: 'priority',
    initialState,
    reducers: {
        changeFirstP(state, action) {
            state.firstP = action.payload.scribe_id
        },
        changeSecondP(state, action) {
            state.secondP = action.payload.scribe_id
        },
        changeThirdP(state, action) {
            state.thirdP = action.payload.scribe_id
        },
        setNull (state, action) {
            state.firstP = null
            state.secondP = null
            state.thirdP = null
        }
    }

})

export const { changeFirstP, changeSecondP, changeThirdP, setNull } = priority.actions

export default priority.reducer