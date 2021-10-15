import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    lang: 'none',
    isItAScribe: "none",
    uid: 'none',
}
const userAppSettingsSlice = createSlice({
    name: 'userAppSettings',
    initialState,
    reducers: {
        changeLang(state, action) {
            state.lang = action.payload.newLang
        },
        changeScribeStatus(state, action) {
            state.isItAScribe = action.payload.newScribeStatus
        },
        changeUid(state, action) {
            state.uid = action.payload.newUid
        }
    }

})

export const { changeLang, changeScribeStatus, changeUid } = userAppSettingsSlice.actions

export default userAppSettingsSlice.reducer