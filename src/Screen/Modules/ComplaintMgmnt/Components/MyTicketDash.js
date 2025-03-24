//import liraries
import React, { Component, memo, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colorTheme } from '../../../../Constant/Colors';
import { ClipboardDocumentCheckIcon, BellAlertIcon } from 'react-native-heroicons/outline'
import MyDashLabel from './MyDashLabel';
import { useDispatch, useSelector } from 'react-redux';
import { getComDetlcountEmp, getEmpWiseTicket, getNotAssignedComplaintList, getNotAssignedCount, getTicketCount } from '../../../../Redux/ReduxSlice/ticketMagmntSlice';
import { getLogiEmployeeID } from '../../../../Redux/ReduxSlice/LoginSLice';
import CustomActivityIndicator from '../../../../Components/CustomActivityIndicator';

// create a component
const MyTicketDash = () => {

    const ticketCount = useSelector(getTicketCount)
    const news = useSelector(getEmpWiseTicket)
    const newTicketArray = ticketCount?.concat(news)

    const data = newTicketArray?.map((e) => {
        return {
            name: e.countype === "NT" ? "New Tickets" :
                e.countype === "AC" ? "Assigned" :
                    e.countype === "AA" ? "Assistance" :
                        e.countype === "HC" ? "On Hold" :
                            e.countype === "PC" ? "On Progress" :
                                e.countype === "RC" ? "Completed (today)" :
                                    e.countype === "SP" ? "Verification (Pending)" : null,
            count: e.countype === "NT" ? e.total :
                e.countype === "AC" ? e.total :
                    e.countype === "AA" ? e.total :
                        e.countype === "HC" ? e.total :
                            e.countype === "PC" ? e.total :
                                e.countype === "RC" ? e.total :
                                    e.countype === "SP" ? e.total : null,
        }
    }).filter((e) => e.name != null)

    return (
        <View
            className='flex flex-col rounded-2xl p-2 mb-4'
            style={{
                backgroundColor: colorTheme.secondaryBgColor,
                overflow: 'hidden',
                elevation: 3
            }}>
            {data === undefined && <CustomActivityIndicator />}
            {
                data?.map((val, index) => <MyDashLabel name={val?.name} count={val.count} key={index} />)
            }
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default memo(MyTicketDash);
