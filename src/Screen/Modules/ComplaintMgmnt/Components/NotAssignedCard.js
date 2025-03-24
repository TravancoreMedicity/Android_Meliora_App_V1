//import liraries
import React, { memo, useState, lazy, Suspense, useCallback, useMemo, useRef } from 'react';
import { View, Text, Alert } from 'react-native';
import { bgColor, colorTheme, fontColor } from '../../../../Constant/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Button } from 'react-native-paper'
import { styles } from '../Style/Style';
import _ from 'underscore';
import { useSelector } from 'react-redux'
import { format } from 'date-fns'
import { axiosApi } from '../../../../config/Axiox';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal'
import AlertModal from './Modals/AlertModal';
import TicketAssignModal from './Modals/TicketAssignModal';
import BaseModal from '../../../../Components/BaseModal';
import ComplainDeptTransfer from './Modals/ComplainDeptTransfer';

const CustmDIalog = lazy(() => import('./CustmDIalog'));
const CmpTransfer = lazy(() => import('./CmpTransfer'));


// create a component
const NotAssignedCard = ({ data, setCount }) => {

    const [modalVisible, setModalVisible] = useState(false);

    const loggedEmpDetl = useSelector((state) => state.loginFuntion.loginInfo.loginDetl, _.isEqual);
    const loggedDetl = useMemo(() => loggedEmpDetl, [loggedEmpDetl]);
    const { emp_id, supervisor } = loggedDetl;

    const navigation = useNavigation();

    //for assign modal
    const [visible, setVisible] = useState(false);
    //for transfer modal
    const [trVisible, setTrVisible] = useState(false);

    const {
        compalint_date,
        complaint_desc,
        complaint_hicslno,
        complaint_slno,
        complaint_type_name,
        create_employee,
        dept_sec,
        location,
        priority_check,
        priority_reason,
        req_type_name
    } = data;

    const assignData = useMemo(() => data, [data]);

    const postData = useMemo(() => {
        return {
            complaint_slno: complaint_slno,
            assigned_emp: emp_id,
            assigned_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            assign_rect_status: 0,
            assigned_user: emp_id,
            assign_status: 1
        }
    }, [complaint_slno, emp_id])

    //quick assign function
    const quickAssignMent = useCallback(async () => {
        setModalVisible(true)
        // const result = await axiosApi.post('/complaintassign', postData);
        // const { message, success } = result.data;
        // if (success === 1) {
        //     setCount(complaint_slno)
        //     setModalVisible(true)
        // } else if (success === 0) {
        //     Alert.alert('Caution !!', message, [
        //         { text: 'OK' },
        //     ]);
        // } else {
        //     Alert.alert('Caution !!', message, [
        //         { text: 'OK' },
        //     ]);
        // }

    }, [])

    // const quickAsign = useCallback(() => quickAssignMent, [quickAssignMent]);

    // detailed assignment
    const assign = useCallback(() => {
        setVisible(true)
    }, [assignData])

    //complaint deparemnt transfer
    const transferFun = useCallback(() => {
        // navigation.navigate('AssignCompDetl')
        // setModalVisible(true)
        setTrVisible(true)
    })

    return (
        <View style={{
            ...styles.FLCP_container,
            // backgroundColor: complaint_hicslno === 1 ? colorTheme.deptColor4 : colorTheme.secondaryBgColor,
            marginVertical: 1,
        }}>
            <AlertModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                postData={postData}
            />
            <TicketAssignModal
                openModelState={setVisible}
                openState={visible}
                data={data}
            />
            {/* <BaseModal
                openModelState={setTrVisible}
                openState={trVisible}
                height={80}
            /> */}
            <ComplainDeptTransfer
                openModelState={setTrVisible}
                openState={trVisible}
                data={data}
            />
            <Suspense>
                {/* <CustmDIalog
                    visible={visible}
                    setVisible={setVisible}
                    data={assignData}
                    user={emp_id}
                    setCount={setCount}
                /> */}
                {/* <CmpTransfer
                    visible={trVisible}
                    setVisible={setTrVisible}
                    slno={complaint_slno}
                    setCount={setCount}
                /> */}
            </Suspense>
            <View style={{
                marginHorizontal: 5
            }} >

                {/* icra recommention warniong */}

                {complaint_hicslno === 1 && <View className='flex-1' >
                    <Text
                        style={{ fontFamily: 'Roboto_900Black', color: colorTheme.iconColor }}
                        className='text-[11px] text-center' >Infection Control Risk Assessment (ICRA) Recommended</Text>

                </View>
                }

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
                        <Text style={{ ...styles.FLCP_captionStyle, fontStyle: 'italic' }} >{dept_sec}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignContent: 'center',
                        alignItems: 'center'
                    }} className='animate-spin' >
                        {
                            priority_check === 1 ?
                                <MaterialCommunityIcons
                                    name='alarm-light'
                                    color="red"
                                    size={15}
                                /> : null
                        }
                    </View>
                </View>

                {/* Priority Reason */}

                {
                    priority_check === 1 &&
                    <View>
                        <View style={{
                            flexGrow: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                        >
                            <View style={{
                                flexGrow: 1,
                                flexDirection: 'row',
                                alignContent: 'center',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                            }} >
                                <Text style={{ ...styles.FLCP_headStyle }} >Priority Reason :</Text>
                                <Text style={{ ...styles.FLCP_cardTitle, color: colorTheme.iconColor, }} >{priority_reason}</Text>
                            </View>
                        </View>
                    </View>
                }


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
                {/* <View style={{
                    // flex: 1,
                    flexDirection: 'row'
                }} >
                    <Text style={styles.FLCP_headStyle}>ICRA Recommentation :</Text>
                    <Text style={styles.FLCP_cardTitle} >{hic_policy_name}</Text>
                </View> */}
            </View>
            <View style={{
                flexGrow: 1,
                flexDirection: 'row',
                paddingHorizontal: 6,
                justifyContent: 'space-between',
                marginVertical: 5
            }} >
                <View style={{ flex: 1 }} >
                    <Button
                        icon={() => <AntDesign
                            name='rightcircle'
                            color={colorTheme.secondaryBgColor}
                            size={20}
                        />
                        }
                        mode='elevated'
                        style={{
                            borderRadius: 0,
                            borderTopLeftRadius: 10,
                            borderBottomLeftRadius: 10,
                            backgroundColor: colorTheme.mainColor,
                            borderWidth: 0.5,
                            borderColor: 'white',
                        }}
                        labelStyle={{ color: colorTheme.secondaryBgColor }}
                        onPress={() => quickAssignMent()}
                    >
                        Quick
                    </Button>
                </View>
                {
                    supervisor === 1 ?
                        <View style={{ flex: 1, }}>
                            <Button
                                icon={() => <MaterialIcons
                                    name='assignment-ind'
                                    size={21}
                                    style={{ color: colorTheme.secondaryBgColor }}
                                />
                                }
                                // loading={true}
                                mode='elevated'
                                style={{
                                    borderRadius: 0,
                                    backgroundColor: colorTheme.mainColor,
                                    borderWidth: 0.5,
                                    borderColor: 'white'
                                }}
                                labelStyle={{ color: colorTheme.secondaryBgColor }}
                                onPress={assign}
                            >
                                Assign
                            </Button>
                        </View> : null
                }
                <View style={{ flex: 1, }}>
                    <Button
                        icon={() => <Ionicons
                            name='arrow-redo-sharp'
                            color={colorTheme.secondaryBgColor}
                            size={21}
                        />
                        }
                        elevation={10}
                        mode='elevated'
                        style={{
                            borderRadius: 0,
                            borderTopEndRadius: 10,
                            borderBottomRightRadius: 10,
                            backgroundColor: colorTheme.mainColor,
                            borderColor: 'white',
                            borderWidth: 0.5
                        }}
                        labelStyle={{ color: colorTheme.secondaryBgColor }}
                        onPress={() => transferFun()}
                    >
                        Transfer
                    </Button>
                </View>
            </View>
        </View>
    );
};

//make this component available to the app
export default memo(NotAssignedCard);
