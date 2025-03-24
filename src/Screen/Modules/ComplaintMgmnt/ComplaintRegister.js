//import liraries
import React, { lazy, memo, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
import _ from 'underscore';
import HearderSecondary from '../../../Components/HearderSecondary';
import { bgColor, colorTheme, fontColor } from '../../../Constant/Colors';
import { windowHeight, windowWidth } from '../../../utils/Dimentions';
import { useSelector, useDispatch } from 'react-redux'
// import { getAssignedTicketList, getAssistTicketList, getNotAssignedComplaintList } from '../../../Redux/Actions/complaintMagmt.action';
// import { getEmployeeDetlLoggedDeptWise } from '../../../Redux/Actions/common.action';
import ApiGetFun from './func/ApiGetFun';

const FlashListNotAssign = lazy(() => import('./Components/FlashListNotAssign'))
const DashBoardView = lazy(() => import('./DashBoardView'))
const MyTicketDash = lazy(() => import('./Components/MyTicketDash'))

import { XCircleIcon } from "react-native-heroicons/solid"
import { getComplaintdeptData, getEmployeeDetlLoggedDeptWise } from '../../../Redux/ReduxSlice/commonSlice';
import { getComplaintPriority } from '../../../Redux/ReduxSlice/ComplaintPrioritySlice';

// create a component
const ComplaintRegister = ({ navigation }) => {

    useEffect(() => {
        if (windowHeight > 750) {
            setCustomHeight(windowHeight - 280)
        } else if (windowHeight < 737 && windowHeight > 724) {
            setCustomHeight(windowHeight - 240)
        } else if (windowHeight < 738) {
            setCustomHeight(windowHeight - 250)
        }
    }, [windowHeight])

    const dispatch = useDispatch();

    const loggedEmpDetl = useSelector((state) => state.loginFuntion.loginInfo.loginDetl, _.isEqual);
    const loggedDetl = useMemo(() => loggedEmpDetl, [loggedEmpDetl]);
    const { emp_id, emp_dept } = loggedDetl;

    const [refresh, setRefresh] = useState(false);
    const [count, setCount] = useState(0);

    // const { dismiss, dismissAll } = useBottomSheetModal();

    const [customHeight, setCustomHeight] = useState(0)
    //not asssigned list from database
    useEffect(() => {
        dispatch(getEmployeeDetlLoggedDeptWise(emp_dept));
        dispatch(getComplaintPriority())
        dispatch(getComplaintdeptData())
    }, [emp_dept, count, emp_id, dispatch])

    return (
        <SafeAreaView style={styles.container} >
            <ApiGetFun />
            {/* Header Component */}
            <HearderSecondary navigation={navigation} name="Ticket Management" goBackButton={true} />
            <ScrollView style={styles.scrollView} >
                {/* Dash Bord Veiw Start */}
                <View style={styles.dashBord} >
                    <Suspense fallback={<ActivityIndicator />} >
                        <DashBoardView navigation={navigation} />
                    </Suspense>
                </View>
                {/* Dash Bord View End  */}
                <View style={styles.card} >
                    <View style={styles.cardHeader} >
                        <Text style={styles.cardTitle} >My Ticket's Statistics</Text>
                    </View>
                    <Suspense fallback={<ActivityIndicator />} >
                        <MyTicketDash />
                    </Suspense>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: colorTheme.mainBgColor,
        height: windowHeight,
    },
    scrollView: {
        padding: 8,
    },
    dashBord: {
        // flex: 1,
        flexDirection: 'row',
    },
    card: {
        flex: 1,
        backgroundColor: colorTheme.mainBgColor,
    },
    cardHeader: {
        backgroundColor: colorTheme.mainBgColor,
        // backgroundColor: "powderblue",
        height: (windowHeight * 4 / 100),
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        flexDirection: 'row',
        overflow: 'hidden',
        borderTopLeftRadius: 5,
        borderTopLeftRadius: 5,
    },
    cardTitle: {
        fontFamily: 'Roboto_500Medium',
        fontSize: windowWidth > 400 ? 14 : 12,
        paddingHorizontal: 5,
        overflow: 'hidden',
        color: colorTheme.mainColor
    }
});

//make this component available to the app
export default memo(ComplaintRegister);
