import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    selectedDate: {
        date: '',
    },
    selectedTime: {
        time: ''
    }
}

const getDateTimePickerSlice = createSlice({
    name: 'getDateTimePickerSlice',
    initialState,
    reducers: {
        setDateTimePicker: (state, { payload }) => {
            state.selectedDate.date = payload
        },
        setTimePicker: (state, { payload }) => {
            state.selectedTime.time = payload
        },
    }
})

export const getDateSelected = state => state.dateTimePicker.selectedDate.date;
export const getTimeSelected = state => state.dateTimePicker.selectedTime.time;

export const { setDateTimePicker, setTimePicker } = getDateTimePickerSlice.actions;

export default getDateTimePickerSlice.reducer