import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosApi } from '../../config/Axiox';

const getComplaintPriority = createAsyncThunk('api/ComplaintPriority', () => {
    return axiosApi.get(`/compriority/select`)
        .then((response) => {
            return response.data;
        })
})


const initialState = {
    complaintPriority: {
        priority: [],
        status: 0,
        message: "",
        loading: true
    },
    selectedPriority: {
        priority: 0
    }
}

const getComplainPrioritySlice = createSlice({
    name: 'getComplainPrioritySlice',
    initialState,
    reducers: {
        updatePriorityState: (state, { payload }) => {
            state.selectedPriority = {
                ...state.selectedPriority,
                priority: payload
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getComplaintPriority.pending, (state) => {
                state.complaintPriority.status = 0
                state.complaintPriority.message = "pending"
                state.loading = true
            })
            .addCase(getComplaintPriority.rejected, (state) => {
                state.complaintPriority.status = 2
                state.complaintPriority.message = "Error"
                state.loading = false
            })
            .addCase(getComplaintPriority.fulfilled, (state, { payload }) => {
                state.complaintPriority.status = 1
                state.complaintPriority.message = 'success'
                state.complaintPriority.loading = false
                state.complaintPriority.priority = payload.data
            })
    }
})

export {
    getComplaintPriority
}

//ACTIONS
export const { updatePriorityState } = getComplainPrioritySlice.actions
//STATES
export const selectCmpPriority = state => state.cmpPriority.complaintPriority.priority;
export const selectedCmpPriority = state => state.cmpPriority.selectedPriority.priority;

export default getComplainPrioritySlice.reducer