//import liraries
import React, { memo, Suspense, useEffect, useMemo, useState, lazy, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import HearderSecondary from '../../../Components/HearderSecondary';
import { bgColor, colorTheme, fontColor } from '../../../Constant/Colors';
import { getTheAssignedListOnly } from '../../../Redux/Actions/complaintMagmt.action';
import { windowHeight, windowWidth } from '../../../utils/Dimentions';
import { useDispatch, useSelector } from 'react-redux'
import _ from 'underscore';
import FlashListCmp from './Components/FlashListCmp';
import ApiGetFun from './func/ApiGetFun';
import { getLogiEmployeeID } from '../../../Redux/ReduxSlice/LoginSLice';
import { assignedListUserWise, getAssignListEmp } from '../../../Redux/ReduxSlice/ticketMagmntSlice';
import OverLayLoading from './Components/OverLayLoading';
// import { assignedListUserWise, getAssignedTicketList } from '../../../Redux/ReduxSlice/complaintMagmntSlice';

const AssignedListCmp = lazy(() => import('./Components/AssignedListCmp'))

// create a component
const FlashListAssign = ({ navigation }) => {

    const dispatch = useDispatch();
    const [loding, setLoading] = useState(true)

    // user logged information
    const empId = useSelector(getLogiEmployeeID);
    const emId = useMemo(() => empId, [empId])

    useEffect(() => {
        dispatch(getAssignListEmp(emId))
    }, [emId])

    const assignedList = useSelector(assignedListUserWise)
    const newAssignList = useMemo(() => assignedList, [assignedList])

    const [count, setCount] = useState(0)
    const [refresh, setRefresh] = useState(false)

    return (
        <KeyboardAvoidingView enabled behavior='height' >
            <SafeAreaView style={styles.container} >
                {/* Header  */}
                <HearderSecondary
                    navigation={navigation}
                    name="Assigned Tickets"
                    goBackButton={false}
                />
                <View style={styles.card} >
                    {loding && <OverLayLoading />}
                    <View style={{
                        flex: 1,
                        maxWidth: windowWidth,
                        height: (windowHeight * 70 / 100)
                    }} >
                        <Suspense fallback={<ActivityIndicator />} >
                            <FlashListCmp
                                FlashRenderCmp={AssignedListCmp}
                                Assigned={newAssignList}
                                setCount={useCallback(() => setCount, [setCount])}
                                refresh={refresh}
                                count={count}
                                setLoading={setLoading}
                            />
                        </Suspense>
                    </View>
                </View>
                <View style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colorTheme.mainBgColor,
                    // minHeight: (windowHeight * 5 / 100)
                }} >
                    <Text style={{
                        fontFamily: 'Roboto_500Medium',
                        fontSize: windowWidth > 400 ? 14 : 12,
                        paddingHorizontal: 5,
                        overflow: 'hidden',
                        color: colorTheme.mainColor,
                        fontFamily: 'Roboto_100Thin',
                        fontSize: 10,
                    }} >Pull Down To Refresh</Text>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: bgColor.cardBg,
        height: windowHeight
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
        backgroundColor: '#fffdff',
        borderRadius: 5,
        overflow: 'hidden'
    },
    cardHeader: {
        backgroundColor: bgColor.cardBg,
        // backgroundColor: "powderblue",
        minHeight: (windowHeight * 3 / 100),
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        flexDirection: 'row',
        overflow: 'hidden',
        borderTopLeftRadius: 5,
        borderTopLeftRadius: 5
    },
    cardTitle: {
        fontFamily: 'Roboto_500Medium',
        fontSize: windowWidth > 400 ? 14 : 12,
        paddingHorizontal: 5,
        overflow: 'hidden',
        color: fontColor.inActiveFont
    }
});

//make this component available to the app
export default memo(FlashListAssign);
