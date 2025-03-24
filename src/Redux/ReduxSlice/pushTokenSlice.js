import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    pushToken: {}
};

export const tokenSlice = createSlice({
    name: "pushToknSlice",
    initialState,
    reducers: {
        getExpoPushToken: (state, { payload }) => {
            state.pushToken = payload
        }
    }
})

export const getPushToken = state => state.expoPushToken.pushToken;

export const { getExpoPushToken } = tokenSlice.actions;

export default tokenSlice.reducer