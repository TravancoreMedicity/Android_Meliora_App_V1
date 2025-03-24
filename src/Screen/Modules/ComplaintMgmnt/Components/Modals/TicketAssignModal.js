import { Modal, Pressable, Switch, Text, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native'
import React, { memo, useCallback, useState } from 'react'
import { colorTheme } from '../../../../../Constant/Colors';
import { HandThumbUpIcon, XCircleIcon, ClockIcon, BellSnoozeIcon, ExclamationTriangleIcon, ShieldExclamationIcon, ChevronDoubleRightIcon } from 'react-native-heroicons/outline'
import Clock from "react-live-clock"
import moment from "moment"
import { getDayDiffrenceIncludeTheTime, getTimeDiffrenceForLiveClock } from '../../func/UtilityFun';
import { ScrollView } from 'react-native-gesture-handler';
import MutlilineTextInput from '../../../../../Components/MutlilineTextInput';
import DropDownList from '../../../../../Components/DropDownList';
import DateTimePicker from '../../../../../Components/DateTimePickers';
import { useDispatch, useSelector } from 'react-redux';
import { getDateSelected, getTimeSelected } from '../../../../../Redux/ReduxSlice/DateTimePickerSlice';
import DropDownListMultiSelect from '../../../../../Components/DropDownListMultiSelect';
import { selectedComplaintPriority, selectedEmpListDropDown } from '../../../../../Redux/ReduxSlice/DropDownListSlice';
import { getLogiEmployeeID } from '../../../../../Redux/ReduxSlice/LoginSLice';
import { selectedCmpPriority } from '../../../../../Redux/ReduxSlice/ComplaintPrioritySlice';
import { axiosApi } from '../../../../../config/Axiox';
import { reduxUpdation } from '../../../../../Redux/ReduxSlice/commonSlice';

const TicketAssignModal = ({ openModelState, openState, data }) => {
    const dispatch = useDispatch()
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
        complaint_hicslno,
        priority,
        complaint_desc,
        priority_check,
        priority_reason,
        compalint_priority
    } = data;

    const RegisterTime = moment(compalint_date).format('DD-MM-yyyy HH:mm:ss');
    const newDate = getTimeDiffrenceForLiveClock(compalint_date)
    const dayDiffs = getDayDiffrenceIncludeTheTime(compalint_date)

    //ON HOLD FUNCTION 

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const selectedDate = useSelector(getDateSelected)
    const SelectedTime = useSelector(getTimeSelected)
    const selectedEmployee = useSelector(selectedEmpListDropDown)
    const loginEmpId = useSelector(getLogiEmployeeID)
    const compPriority = useSelector(selectedCmpPriority)

    //ASSIGN FUNCTION 

    const [holdRemark, setHoldRemark] = useState('')
    const [ticketRemark, setTicketRemark] = useState('')

    const ticketAssignFun = useCallback(async () => {
        if (selectedEmployee?.length === 0) {
            alert('At least one employee needed to be selected')
        } else {
            const postAssignData = selectedEmployee?.map((emp) => {
                return {
                    complaint_remark: ticketRemark,
                    complaint_slno: complaint_slno,
                    assigned_emp: emp,
                    assigned_date: moment().format('yyyy-MM-DD HH:mm:ss'),
                    assign_rect_status: 0,
                    assigned_user: loginEmpId,
                    compalint_priority: compPriority,
                    aprrox_date: selectedDate === '' ? moment().format('yyyy-MM-DD HH:mm:ss') : selectedDate,
                    assign_status: 1
                }
            })

            const updateAssignStatus = await axiosApi.post(`/complaintassign/detailassign`, postAssignData)
            const { message, success } = await updateAssignStatus.data;

            if (success === 1) {
                alert(message)
                dispatch(reduxUpdation())
                openModelState(!openState)
            } else {
                alert('Contact IT !!')
                openModelState(!openState)
            }
        }
    }, [selectedEmployee, ticketRemark, complaint_slno, loginEmpId, compPriority, selectedDate])

    const ticketOnHoldFun = useCallback(async () => {
        if (holdRemark === '') {
            alert('Remark feild is blank')
        } else {
            const postData = {
                complaint_slno: complaint_slno,
                cm_rectify_status: 'O',
                rectify_pending_hold_remarks: holdRemark,
                pending_onhold_time: moment().format('yyyy-MM-DD HH:mm:ss'),
                pending_onhold_user: loginEmpId,
                assigned_emp: loginEmpId,
                assigned_date: moment().format('yyyy-MM-DD HH:mm:ss'),
                assign_rect_status: 0,
                assign_status: 1,
                assigned_user: loginEmpId
            }

            const updateTicketOnhold = await axiosApi.post(`/complaintassign/hold/beforAssign`, postData)
            const { message, success } = await updateTicketOnhold.data;
            if (success === 1) {
                alert(message)
                dispatch(reduxUpdation())
                openModelState(!openState)
            } else {
                alert('Contact IT !!')
                openModelState(!openState)
            }
        }
    }, [complaint_slno, loginEmpId, holdRemark])

    return (
        <View style={{
            flex: 1,
            // justifyContent: 'flex-end',
            alignItems: 'center',
        }} >
            <Modal
                animationType="slide"
                transparent={true}
                visible={openState}
                presentationStyle='overFullScreen'
                statusBarTranslucent={true}
                onRequestClose={() => {
                    openModelState(!openState);
                }}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginTop: 22,
                }} >
                    <View style={{
                        flex: 1,
                        height: '85%',
                        width: '100%',
                        backgroundColor: 'white',
                        borderTopStartRadius: 25,
                        borderTopEndRadius: 25,
                        // padding: 5,
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                        overflow: 'hidden'
                    }}>
                        <View className='flex-1 w-full' >
                            <View className="p-2 border-b bg-white shadow-xs " style={{ borderColor: colorTheme.iconColor }} >
                                <View>
                                    <Text className='text-lg text-center' style={{ fontFamily: 'Roboto_500Medium' }} >Ticket Assign</Text>
                                    <Text className='text-center text-gray-400 text-sm font-bold' style={{ fontFamily: 'Roboto_100Thin' }}  >
                                        Detailed Ticket Assignment
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={useCallback(() => openModelState(!openState), [openState])}
                                    className='rounded-full bg-gray-100 absolute top-3 right-5'
                                >
                                    <XCircleIcon color={colorTheme.switchThumb} height={35} width={35} />
                                </TouchableOpacity>
                            </View>
                            <KeyboardAvoidingView
                                // behavior={Platform.OS === "ios" ? "padding" : "position"}
                                behavior='padding'
                                style={{ flex: 1 }}
                                keyboardVerticalOffset={40}
                                contentContainerStyle={{
                                    flex: 1
                                    // justifyContent: 'flex-end'
                                }}
                                enabled
                            >
                                <ScrollView className='flex-1 bg-white px-5 pt-3' keyboardShouldPersistTaps='always'  >
                                    <View className='flex flex-1 grow' >
                                        <View className='flex flex-row justify-between'>
                                            <Text
                                                style={{ fontFamily: 'Roboto_500Medium', fontSize: 17, color: colorTheme.fontColorGreyBlack }}
                                                className='antialiased' >Description</Text>
                                            {
                                                priority_check === 1 &&
                                                <View className='flex justify-center px-1 rounded-md grow items-end pr-2' >
                                                    <Text style={{ fontFamily: 'Roboto_500Medium', fontSize: 12, color: colorTheme.iconColor }}
                                                        className='antialiased'>ICRA</Text>
                                                </View>
                                            }
                                            {
                                                complaint_hicslno === 1 &&
                                                <View className='flex justify-center px-2 rounded-md' style={{ borderWidth: 0.5, borderColor: 'red' }} >
                                                    <Text style={{ fontFamily: 'Roboto_500Medium', fontSize: 12 }}
                                                        className='antialiased text-red-600'>Priority ticket</Text>
                                                </View>
                                            }
                                        </View>
                                        <View className='pt-2 ' >
                                            <Text style={{ color: colorTheme.fontColorLightGrey, fontFamily: 'Roboto_500Medium', fontSize: 15 }} className='antialiased capitalize' >
                                                {complaint_desc}</Text>
                                        </View>
                                        <View className='flex flex-row pt-5 gap-3' >
                                            <View className='flex justify-center items-center rounded-full border border-gray-200 p-2'>
                                                <ClockIcon width={25} height={25} color="black" />
                                            </View>
                                            <View className='flex grow'>
                                                <View className='flex grow justify-center' >
                                                    <Text style={{ fontFamily: 'Roboto_300Light' }}>Ticket registerd time</Text>
                                                </View>
                                                <View className='flex grow' >
                                                    <Text
                                                        style={{
                                                            fontFamily: 'Roboto_700Bold',
                                                            color: colorTheme.fontColorGreyBlack,
                                                            fontSize: 15
                                                        }}
                                                    >{RegisterTime}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View className='flex flex-row pt-5 gap-3' >
                                            <View className='flex justify-center items-center rounded-full border border-gray-200 p-2'>
                                                <BellSnoozeIcon width={25} height={25} color="black" />
                                            </View>
                                            <View className='flex grow'>
                                                <View className='flex grow justify-center' >
                                                    <Text style={{ fontFamily: 'Roboto_300Light' }}>Escalated in</Text>
                                                </View>
                                                <View className='flex grow' >
                                                    {/* <Text style={{ fontFamily: 'Roboto_700Bold', color: colorTheme.fontColorLightBlue }} className='text-lg' >{compalint_date}</Text> */}
                                                    <Clock
                                                        element={Text}
                                                        ticking={true}
                                                        format="DD-MM-yyyy HH:mm:ss"
                                                        style={{
                                                            fontFamily: 'Roboto_700Bold',
                                                            color: colorTheme.fontColorLightBlue,
                                                            fontSize: 15
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                        <View className='flex flex-row pt-5 gap-3' >
                                            <View className='flex justify-center items-center rounded-full border border-gray-200 p-2'>
                                                <ExclamationTriangleIcon width={25} height={25} color="#F25F5F" />
                                            </View>
                                            <View className='flex grow'>
                                                <View className='flex flex-row grow items-center' >
                                                    <Text style={{
                                                        fontFamily: 'Roboto_700Bold',
                                                        color: '#F25F5F',
                                                        fontSize: 16,
                                                        paddingRight: 8
                                                    }}>{`${dayDiffs} days`}</Text>
                                                    {/* <Text style={{ fontFamily: 'Roboto_700Bold', color: colorTheme.fontColorLightBlue }} className='text-lg' >{compalint_date}</Text> */}
                                                    <Clock
                                                        element={Text}
                                                        ticking={true}
                                                        date={newDate}
                                                        format="HH:mm:ss"
                                                        style={{
                                                            fontFamily: 'Roboto_700Bold',
                                                            color: '#F25F5F',
                                                            fontSize: 15
                                                        }}
                                                    />
                                                    <Text style={{
                                                        fontFamily: 'Roboto_700Bold',
                                                        color: '#F25F5F',
                                                        fontSize: 16,
                                                        paddingLeft: 8
                                                    }}>hours</Text>
                                                </View>
                                            </View>
                                        </View>
                                        {
                                            priority_check === 1 &&
                                            <View className='flex flex-co mt-1 p-1 rounded-md' style={{ backgroundColor: colorTheme.mainBgColor }} >
                                                <View className='flex flex-row gap-1 items-center'>
                                                    <ShieldExclamationIcon width={25} height={25} color={colorTheme.iconColor} />
                                                    <Text className=' font-medium' style={{ color: colorTheme.iconColor }} >Priority reason</Text>
                                                </View>
                                                <Text className=' capitalize ' style={{ color: colorTheme.fontColorLightGrey }}>{priority_reason}</Text>
                                            </View>
                                        }
                                        <View className='flex-1 px-5 flex-row item-center justify-items-center mt-2' >
                                            <Switch
                                                trackColor={{ false: '#254b6e', true: '#254b6e' }}
                                                thumbColor={isEnabled ? '#132851' : '#132851'}
                                                onValueChange={toggleSwitch}
                                                value={isEnabled}
                                                style={{ width: 50, height: 30, }}
                                            />
                                            <View className='justify-center pl-1 pb-4' >
                                                <Text className='flex' style={{ fontWeight: '500' }} >Change Ticket status to Hold</Text>
                                            </View>
                                        </View>
                                        {
                                            isEnabled &&
                                            <MutlilineTextInput
                                                placeholder={'On hold remarks'}
                                                value={holdRemark}
                                                onChange={setHoldRemark}
                                            />
                                        }
                                        <View className='mt-1' style={{ display: isEnabled ? 'none' : 'flex' }} >
                                            <View>
                                                <View style={{ pb: 0.5 }} >
                                                    <Text style={{ fontFamily: 'Roboto_100Thin' }} >Select Ticket Priority</Text>
                                                </View>
                                                <DropDownList />
                                            </View>
                                            <View className='pt-1'>
                                                <View style={{ pb: 0.5 }} >
                                                    <Text style={{ fontFamily: 'Roboto_100Thin' }} >Expected completion date</Text>
                                                </View>
                                                <DateTimePicker minDate={new Date()} />
                                            </View>
                                            <View>
                                                <View style={{ pb: 0.5 }}  >
                                                    <Text style={{ fontFamily: 'Roboto_100Thin' }} >Select Employees</Text>
                                                </View>
                                                <DropDownListMultiSelect />
                                            </View>
                                            <View style={{ paddingTop: 5 }} >
                                                <MutlilineTextInput
                                                    placeholder={'Ticket Assign remarks'}
                                                    value={ticketRemark}
                                                    onChange={setTicketRemark}
                                                />
                                            </View>
                                        </View>
                                        <View className='flex-1 items-center pt-3' style={{ display: isEnabled ? 'none' : 'flex' }} >
                                            <Pressable
                                                className='w-full flex-row items-center h-10 justify-center rounded-lg'
                                                style={{ borderColor: colorTheme.switchThumb, borderWidth: 0.5 }}
                                                onPress={ticketAssignFun}>
                                                <ChevronDoubleRightIcon width={30} height={30} color={colorTheme.switchTrack} />
                                                <View style={{ paddingLeft: 10 }} >
                                                    <Text>Press to Assign Ticket</Text>
                                                </View>
                                            </Pressable>
                                        </View>
                                        <View className='flex-1 items-center pt-3' style={{ display: isEnabled ? 'flex' : 'none' }} >
                                            <Pressable
                                                className='w-full flex-row items-center h-10 justify-center rounded-lg'
                                                style={{ borderColor: colorTheme.switchThumb, borderWidth: 0.5 }}
                                                onPress={ticketOnHoldFun}>
                                                <ChevronDoubleRightIcon width={30} height={30} color={colorTheme.switchTrack} />
                                                <View style={{ paddingLeft: 10 }} >
                                                    <Text>Press to on hold - ticket</Text>
                                                </View>
                                            </Pressable>
                                        </View>
                                        <View style={{ height: 100 }} ></View>
                                    </View>
                                </ScrollView>
                            </KeyboardAvoidingView>
                        </View>
                    </View>
                </View>
            </Modal >
        </View >

    )
}

export default memo(TicketAssignModal) 