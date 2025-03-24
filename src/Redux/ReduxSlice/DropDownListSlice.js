import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    selectedEmployees: {
        empId: [],
    }
}

const getDropDownListDataSlice = createSlice({
    name: 'getDropDownListDataSlice',
    initialState,
    reducers: {
        updateSelectedEmployeeDropDown: (state, { payload }) => {
            state.selectedEmployees = {
                ...state.selectedEmployees,
                empId: [...payload]
            }
        }
    }
})

export const selectedEmpListDropDown = state => state.dorpDownListData.selectedEmployees.empId;

export const { updateSelectedEmployeeDropDown } = getDropDownListDataSlice.actions;

export default getDropDownListDataSlice.reducer