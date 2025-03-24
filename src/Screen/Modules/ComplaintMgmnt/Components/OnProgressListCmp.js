//import liraries
import React, { memo, useState, Suspense, useCallback, useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { bgColor, colorTheme, fontColor } from '../../../../Constant/Colors';
import { styles } from '../Style/Style';
import { useDispatch } from 'react-redux'
import { getDayDiffrenceIncludeTheTime, getTimeDiffrenceForLiveClock } from '../func/UtilityFun';
import LiveCmpTimeDiffrenceClock from './Modals/LiveCmpTimeDiffrenceClock';
import { getActualTicketAssingedEmp } from '../../../../Redux/ReduxSlice/ticketMagmntSlice';
import OnProgressRectify from './Modals/OnProgressRectify';

const OnProgressListCmp = ({ data }) => {
    const [openState, openModelState] = useState('')
    const dispatch = useDispatch();
    const compDetlData = useMemo(() => data, [data])
    const {
        complaint_slno, //complaint slno
        compalint_date, //complaint date
        req_type_name, // request complaint type - complaint,new requirement , modification
        complaint_type_name, // comolaint type name hardware ,software ,etc
        location, // location name in detail
        hic_policy_name,
        complaint_desc,
        compalint_priority,
        complaint_hicslno,
        assigned_date,
        em_name,
        sec_name
    } = compDetlData;

    //LIVE CLOCK FUNCTIONS
    const newDates = getTimeDiffrenceForLiveClock(compalint_date);
    const dayDiffrence = getDayDiffrenceIncludeTheTime(compalint_date);

    const cmpNewDate = useMemo(() => newDates, [newDates]);
    const newDayDiffrence = useMemo(() => dayDiffrence, [dayDiffrence])

    const onRectifyModal = useCallback(async () => {
        // dispatch(getTheActualEmployee(complaint_slno))
        dispatch(getActualTicketAssingedEmp(complaint_slno))
        openModelState(!openState)
    }, [complaint_slno])

    return (
        <View style={{ ...styles.FLCP_container, borderRadius: 10, borderWidth: 0.2, borderColor: colorTheme.switchTrack, marginHorizontal: 5, marginVertical: 2 }}>
            <OnProgressRectify
                openState={openState}
                openModelState={openModelState}
                data={complaint_slno}
            />
            <Suspense>
                {/* <RectifyModal
                    visible={visible}
                    setVisible={setVisible}
                    data={compDetlData}
                    onProgress={1}
                /> */}
            </Suspense>
            <View style={{ marginHorizontal: 5 }} >
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
                    <Text style={styles.FLCP_headStyle}>Assigned Date :</Text>
                    <Text style={styles.FLCP_cardTitle} >{assigned_date}</Text>
                </View>
                {/* display the live complant time diffrence  */}
                <View className='flex ' style={{ borderWidth: 0, borderRadius: 0, justifyContent: 'center', alignItems: 'center', marginVertical: 5, marginHorizontal: 60 }} >
                    <View className='flex' >
                        <LiveCmpTimeDiffrenceClock
                            dayDiffrence={newDayDiffrence}
                            newDates={cmpNewDate}
                        />
                    </View>
                </View>
            </View>
            <View className='pb-1' >
                <Pressable
                    onPress={onRectifyModal}
                    className='flex'
                    style={{ borderWidth: 0.3, borderRadius: 10, marginHorizontal: 25, height: 30, justifyContent: 'center', backgroundColor: colorTheme.switchTrack }}
                >
                    <Text className='text-center text-white'>Rectify tickets</Text>
                </Pressable>
            </View>
        </View>

    )
}

export default memo(OnProgressListCmp) 