import { configureStore } from '@reduxjs/toolkit'
import commonSlice from './ReduxSlice/commonSlice';
import complaintMagmntSlice from './ReduxSlice/complaintMagmntSlice';
import LoginSLice from './ReduxSlice/LoginSLice';
import tokenSlice from './ReduxSlice/pushTokenSlice';
import ticketMagmentDeptSlice from './ReduxSlice/ticketMagmentDeptSlice';
import ticketMagmntSlice from './ReduxSlice/ticketMagmntSlice';
import ComplaintPrioritySlice from './ReduxSlice/ComplaintPrioritySlice';
import DateTimePickerSlice from './ReduxSlice/DateTimePickerSlice';
import DropDownListSlice from './ReduxSlice/DropDownListSlice';
import newTicketSlice from './ReduxSlice/newTicketSlice';

export const store = configureStore({
    reducer: {
        loginFuntion: LoginSLice,
        expoPushToken: tokenSlice,
        commonFun: commonSlice,
        complaint: complaintMagmntSlice,
        ticketUser: ticketMagmntSlice,
        ticketDept: ticketMagmentDeptSlice,
        cmpPriority: ComplaintPrioritySlice,
        dateTimePicker: DateTimePickerSlice,
        dorpDownListData: DropDownListSlice,
        newTicket: newTicketSlice
    }
})
