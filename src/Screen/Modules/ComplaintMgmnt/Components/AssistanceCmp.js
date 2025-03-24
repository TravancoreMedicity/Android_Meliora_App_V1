//import liraries
import React, { memo, useCallback, useMemo } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { bgColor, colorTheme, fontColor } from '../../../../Constant/Colors';
import { styles } from '../Style/Style';
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns';
import { getLogiEmployeeID } from '../../../../Redux/ReduxSlice/LoginSLice';
import { axiosApi } from '../../../../config/Axiox';
import { reduxUpdation } from '../../../../Redux/ReduxSlice/commonSlice';

// create a component
const AssistanceCmp = ({ data }) => {

    const dispatch = useDispatch();

    const compDetlData = useMemo(() => data, [data])
    const emp_id = useSelector(getLogiEmployeeID)

    const {
        complaint_slno, //complaint slno
        compalint_date, //complaint date
        req_type_name, // request complaint type - complaint,new requirement , modification
        complaint_type_name, // comolaint type name hardware ,software ,etc
        location, // location name in detail
        hic_policy_name,
        complaint_desc,
        compalint_priority,
        create_employee,
        sec_name,
        complaint_hicslno,
        requsted_date,
        assist_requested_emp
    } = compDetlData;

    const onRectifyModal = useCallback(async () => {
        const postData = {
            assigned_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            assist_receive: 1,
            complaint_slno: complaint_slno,
            assigned_emp: emp_id
        }

        const result = await axiosApi.patch('/complaintassign/assistant/recieved', postData);
        const { success } = result.data;
        if (success === 1) {
            Alert.alert("Assistance Accepted")
            dispatch(reduxUpdation())
        } else {
            Alert.alert("Error ! , Contact System Administrator")
        }
    }, [emp_id, complaint_slno])

    return (
        <View style={{ ...styles.FLCP_container, borderRadius: 10, borderWidth: 0.2, borderColor: colorTheme.switchTrack, marginHorizontal: 5, marginVertical: 2 }}>
            <View style={{
                marginHorizontal: 5
            }} >
                {/* name and department section */}
                <View style={{
                    flexDirection: 'row',
                    paddingVertical: 5
                }} >
                    <View style={{
                        flexDirection: 'row',
                        alignContent: 'center',
                        alignItems: 'center'
                    }} >
                        <Text style={styles.FLCP_captionStyle} >{create_employee}</Text>
                        <Text style={{ color: bgColor.statusbar }}>@</Text>
                        <Text style={{ ...styles.FLCP_captionStyle, fontStyle: 'italic' }} >{sec_name}</Text>
                    </View>
                    <View className='flex grow' style={{
                        flexDirection: 'row',
                        alignContent: 'center',
                        justifyContent: 'flex-end',

                    }} >
                        {
                            compalint_priority === 1 && <View className='flex justify-center px-2 rounded-md' style={{ borderWidth: 0.2, borderColor: 'red' }} >
                                <Text style={{ fontFamily: 'Roboto_500Medium', fontSize: 12 }}
                                    className='antialiased text-red-600'>Priority ticket</Text>
                            </View>
                        }
                    </View>
                </View>
                {/* register time and numeber section */}
                <View>
                    <View style={{
                        flexGrow: 1,
                        flexDirection: 'row',
                        borderColor: fontColor.inActiveFont,
                        justifyContent: 'space-between'
                    }} >
                        <View style={{
                            flexGrow: 1,
                            flexDirection: 'row',
                            alignContent: 'center',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            // textTransform: 'capitalize'
                        }} >
                            {/* <Text style={styles.cardTitle} >Register Time :</Text> */}
                            <Text style={styles.FLCP_cardTitle} >{compalint_date}</Text>
                        </View>
                        <View style={{
                            flexGrow: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            // paddingHorizontal: 5
                        }} >
                            {/* <Text style={styles.cardTitle} >complaint description :</Text> */}
                            <Text style={styles.FLCP_cardTitle} >{`#${complaint_slno}/2023`}</Text>
                        </View>
                    </View>
                </View>
                {/* request type and complaint type */}
                <View>
                    <View style={{
                        flexGrow: 1,
                        flexDirection: 'row',
                        borderColor: fontColor.inActiveFont,
                        justifyContent: 'space-between'
                    }} >
                        <View style={{
                            flexGrow: 1,
                            flexDirection: 'row',
                            alignContent: 'center',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            // textTransform: 'capitalize'
                        }} >
                            <Text style={styles.FLCP_headStyle} >request Type :</Text>
                            <Text style={styles.FLCP_cardTitle} >{req_type_name}</Text>
                        </View>
                        <View style={{
                            flexGrow: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            // paddingHorizontal: 5
                        }} >
                            {/* <Text style={styles.cardTitle} >complaint description :</Text> */}
                            <Text style={styles.FLCP_cardTitle} >{complaint_type_name}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 5 }} >
                    <View>
                        <Text style={styles.FLCP_headStyle} >complaint description :
                            <Text style={styles.FLCP_cardTitle}> {` ${complaint_desc}`}</Text>
                        </Text>
                    </View>
                </View>
                <View style={{
                    // flex: 1,
                    flexDirection: 'row'
                }} >
                    <Text style={styles.FLCP_headStyle}>Location :</Text>
                    <Text style={styles.FLCP_cardTitle} >{location}</Text>
                </View>
                {
                    complaint_hicslno === 1 &&
                    <View style={{
                        // flex: 1,
                        flexDirection: 'row'
                    }} >
                        <Text style={styles.FLCP_headStyle}>ICRA Recommentation :</Text>
                        <Text style={styles.FLCP_cardTitle} >{hic_policy_name}</Text>
                    </View>
                }
                <View style={{
                    // flex: 1,
                    flexDirection: 'row'
                }} >
                    <Text style={styles.FLCP_headStyle}>Assistance requested date:</Text>
                    <Text style={styles.FLCP_cardTitle} >{requsted_date}</Text>
                </View>
                <View style={{
                    // flex: 1,
                    flexDirection: 'row'
                }} >
                    <Text style={styles.FLCP_headStyle}>Assist requested Employee</Text>
                    <Text style={styles.FLCP_cardTitle} >{assist_requested_emp}</Text>
                </View>
            </View>
            <View className='pb-1 pt-1' >
                <Pressable
                    onPress={onRectifyModal}
                    className='flex'
                    style={{ borderWidth: 0.3, borderRadius: 10, marginHorizontal: 25, height: 30, justifyContent: 'center', backgroundColor: colorTheme.switchTrack }}
                >
                    <Text className='text-center text-white'>Press to accept the Assistance</Text>
                </Pressable>
            </View>
        </View>
    );
};

//make this component available to the app
export default memo(AssistanceCmp);
