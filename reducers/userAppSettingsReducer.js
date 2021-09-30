import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    lang: 'en',
    isItAScribe: false,
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
        }
    }

})

export const { changeLang, changeScribeStatus } = userAppSettingsSlice.actions

export default userAppSettingsSlice.reducer