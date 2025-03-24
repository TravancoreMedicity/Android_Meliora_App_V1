//import liraries
import React, { memo, useCallback, useMemo, useState, } from 'react';
import { View, Text, Pressable } from 'react-native';
import { bgColor, colorTheme, fontColor } from '../../../../Constant/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles } from '../Style/Style';
import { useDispatch } from 'react-redux'
import _ from 'underscore';
import VerifyModal from './Modals/VerifyModal';

// create a component
const ForVerifyCmp = ({ data }) => {
    const dispatch = useDispatch();

    const [openState, openModelState] = useState('')
    const compDetlData = useMemo(() => data, [data])
    const {
        complaint_slno, //complaint slno
        compalint_date, //complaint date
        complaint_dept_name, //complaint register department
        req_type_name, // request complaint type - complaint,new requirement , modification
        complaint_type_name, // comolaint type name hardware ,software ,etc
        sec_name, // complaint register user section name
        location, // location name in detail
        comp_reg_emp, //  register employee name-complaint
        empdept, // registerd department 
        hic_policy_name,
        priority,
        complaint_desc,
        compalint_priority,
        compalint_status,
        assigned_date,
        cm_rectify_time,
        em_name,
        dept_sec,
        complaint_hicslno,
        rectify_pending_hold_remarks
    } = compDetlData;

    const onRectifyModal = useCallback(async () => {
        openModelState(!openState)
    }, [complaint_slno])


    return (
        <View style={{ ...styles.FLCP_container, borderRadius: 10, borderWidth: 0.2, borderColor: colorTheme.switchTrack, marginHorizontal: 5, marginVertical: 4, padding: 8 }}>
            <VerifyModal
                openState={openState}
                openModelState={openModelState}
                data={complaint_slno}
            />
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
                    <Text style={styles.FLCP_captionStyle} >{em_name}</Text>
                    <Text style={{ color: bgColor.statusbar }}>@</Text>
                    <Text style={{ ...styles.FLCP_captionStyle, fontStyle: 'italic' }} >{dept_sec}</Text>
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
                <Text style={styles.FLCP_headStyle}>Assigned Date :</Text>
                <Text style={styles.FLCP_cardTitle} >{assigned_date}</Text>
            </View>
            <View style={{
                // flex: 1,
                flexDirection: 'row'
            }} >
                <Text style={styles.FLCP_headStyle}>Rectified Time :</Text>
                <Text style={{
                    ...styles.FLCP_cardTitle,
                    fontWeight: '700'
                }} >{cm_rectify_time}</Text>
            </View>
            <View style={{
                // flex: 1,
                flexDirection: 'row'
            }} >
                <Text style={styles.FLCP_headStyle}>Remarks :</Text>
                <Text style={{
                    ...styles.FLCP_cardTitle,
                    fontWeight: '700'
                }} >{rectify_pending_hold_remarks}</Text>
            </View>
            <View className='py-1' >
                <Pressable
                    onPress={onRectifyModal}
                    className='flex'
                    style={{ borderWidth: 0.3, borderRadius: 10, marginHorizontal: 25, height: 30, justifyContent: 'center', backgroundColor: colorTheme.switchTrack }}
                >
                    <Text className='text-center text-white'>Press to Verify / Not Verify</Text>
                </Pressable>
            </View>
        </View>

        // </View>
    );
};

//make this component available to the app
export default memo(ForVerifyCmp);
