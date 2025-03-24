import { View, Text, KeyboardAvoidingView, ScrollView, Pressable, TouchableOpacity, Alert } from 'react-native'
import React, { memo, useCallback, useEffect, useState } from 'react'
import BaseRadioButton from '../../../Components/BaseRadioButton'
import { useDispatch, useSelector } from 'react-redux'
import { getCmpSlno, getComplaintDept, getComplaintDeptList, getComplaintSlno, getComplaintType, getComplaintTypeList, getLocationVal, updateLocationValue } from '../../../Redux/ReduxSlice/newTicketSlice'
import CustomActivityIndicator from '../../../Components/CustomActivityIndicator'
import LocationDropDown from '../../../Components/LocationDropDown'
import BaseCheckBoxOne from '../../../Components/BaseCheckBoxOne'
import MutlilineTextInput from '../../../Components/MutlilineTextInput'
import { colorTheme } from '../../../Constant/Colors'
import { ChevronDoubleRightIcon } from 'react-native-heroicons/outline'
import { getLogiEmpDEPT, getLogiEmployeeID, selectLoginInform } from '../../../Redux/ReduxSlice/LoginSLice'
import { axiosApi } from '../../../config/Axiox'
import { useNavigation } from '@react-navigation/native'
import { XCircleIcon } from 'react-native-heroicons/outline'
import ModalLoding from './Components/Modals/ModalLoding'

const NewTickets = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation()
    const [cmpDept, setCmpDept] = useState(0)
    const [type, setType] = useState([])
    const [selectedtype, setSelectedType] = useState(0)
    const [icra, setIcra] = useState(false)
    const [priority, setPriority] = useState(false)
    const [priorityRemark, setPriorityRemark] = useState('')
    const [desc, setDesc] = useState('')

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        dispatch(getComplaintDept())
        dispatch(getComplaintType())
        dispatch(getCmpSlno())
    }, [])

    const complaintDept = useSelector(getComplaintDeptList)
    const complaintType = useSelector(getComplaintTypeList)
    const compSlno = useSelector(getComplaintSlno)
    const location = useSelector(getLocationVal)
    const emp_ID = useSelector(getLogiEmployeeID)
    const emp_dept = useSelector(getLogiEmpDEPT)

    useEffect(() => {
        let type = complaintType?.filter((e) => e.complaint_dept_slno === cmpDept)
            .map((e) => {
                return { id: e.complaint_type_slno, value: e.complaint_type_slno, label: e.complaint_type_name }
            })
        setType(type)
    }, [cmpDept, complaintType])

    const registerTicket = useCallback(async () => {
        dispatch(getCmpSlno())
        const postData = {
            complaint_slno: compSlno,
            complaint_desc: desc,
            complaint_dept_secslno: emp_dept,
            complaint_request_slno: 1,
            complaint_deptslno: cmpDept,
            complaint_typeslno: selectedtype,
            priority_check: priority === true ? 1 : 0,
            complaint_hicslno: icra === true ? 1 : 0,
            compalint_status: 0,
            cm_location: location?.sec_id,
            create_user: emp_ID,
            priority_reason: priority === true ? priorityRemark : null,
            priority: priority === true ? 'Priority Ticket' : "Normal Ticket",
            locationName: location.sec_name
        }
        if (compSlno === undefined) {
            Alert.alert("complaint slno is undefined")
        } else if (desc === "") {
            Alert.alert("Description is null")
        } else if (cmpDept === 0) {
            Alert.alert("Complaint is null")
        } else if (selectedtype === 0) {
            Alert.alert("Complaint type is null")
        } else if (priority === true && priorityRemark === "") {
            Alert.alert("Priority remarks is mandatory ")
        } else if (location === 0) {
            Alert.alert("Location is mandatory ")
        } else {
            setVisible(true)
            const result = await axiosApi.post('/complaintreg', postData);
            const { message, success } = await result.data;
            if (success === 1) {
                setCmpDept(0)
                setDesc("")
                setSelectedType(0)
                setPriority(false)
                setPriorityRemark("")
                dispatch(getCmpSlno())
                dispatch(updateLocationValue(0))
                Alert.alert(message)
                setVisible(false)
                navigation.goBack()
            } else {
                Alert.alert("Ticket not registerd- contact IT")
                setVisible(false)
                navigation.goBack()
            }
        }

    }, [compSlno, desc, emp_dept, cmpDept, selectedtype, priority, icra, location, emp_ID, priorityRemark, navigation])

    return (
        <KeyboardAvoidingView enabled behavior='height' keyboardVerticalOffset={0}  >
            <ModalLoding visible={visible} />
            <View
                style={{
                    pb: 0.5,
                    height: 50,
                    display: 'flex',
                    justifyContent: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: colorTheme.iconColor
                }}
            >
                <Text style={{ fontFamily: 'Roboto_300Light', fontSize: 18, textAlign: 'center' }} >New Ticket Registration</Text>
                <TouchableOpacity
                    onPress={useCallback(() => navigation.goBack())}
                    className='flex rounded-full bg-gray-300 absolute top-2 right-2'
                >
                    <XCircleIcon color={colorTheme.switchThumb} height={35} width={35} />
                </TouchableOpacity>
            </View>
            <ScrollView className='px-2 pt-1 bg-white'>

                {/* <View className='px-2 pt-1' > */}
                <View className='p-0' >
                    <View style={{}}  >
                        <Text style={{ fontFamily: 'Roboto_100Thin', }} >Complaint Department</Text>
                    </View>
                    <View className='pt-1'>
                        {
                            complaintDept?.length === 0 && <CustomActivityIndicator />
                        }
                        <BaseRadioButton data={complaintDept} selectedId={cmpDept} setSelectedId={setCmpDept} />
                    </View>
                </View>
                {
                    cmpDept !== 0 &&
                    <View className='p-0' >
                        <View style={{}}  >
                            <Text style={{ fontFamily: 'Roboto_100Thin' }} >Complaint Type</Text>
                        </View>
                        <View className='pt-1'>
                            {
                                type?.length === 0 && <CustomActivityIndicator />
                            }
                            <BaseRadioButton data={type} selectedId={selectedtype} setSelectedId={setSelectedType} />
                        </View>
                    </View>
                }
                <View className='p-0' >
                    <View style={{}}  >
                        <Text style={{ fontFamily: 'Roboto_100Thin' }} >Location</Text>
                    </View>
                    <View className='pt-1'>
                        <LocationDropDown />
                    </View>
                </View>
                <View className='p-2 pb-1' >
                    <BaseCheckBoxOne
                        name={'Infection Control Risk Assessment (ICRA)'}
                        setCheckVal={setIcra}
                        checkvalue={icra}
                        style={{ backgroundColor: colorTheme.iconColor }}
                    />
                </View>
                <View className='p-2' >
                    <BaseCheckBoxOne
                        name={'Ticket Priority'}
                        setCheckVal={setPriority}
                        checkvalue={priority}
                        style={{ backgroundColor: '#eb4034' }}
                    />
                </View>
                <View className='p-0 pb-2' >
                    {
                        priority && <MutlilineTextInput
                            value={priorityRemark}
                            onChange={setPriorityRemark}
                            placeholder="Priority Remarks"
                        />
                    }
                </View>
                <View className='p-0' >
                    <MutlilineTextInput
                        value={desc}
                        onChange={setDesc}
                        placeholder="Ticket Description"
                    />
                </View>
                <View className='flex pt-2 items-center' >
                    <Pressable
                        className='w-3/4 flex-row items-center h-10 justify-center rounded-lg'
                        style={{ borderColor: colorTheme.switchThumb, borderWidth: 0.5 }}
                        onPress={registerTicket}
                    >
                        <ChevronDoubleRightIcon width={30} height={30} color={colorTheme.iconColor} />
                        <View style={{ paddingLeft: 10 }} >
                            <Text>Press to register the ticket</Text>
                        </View>
                    </Pressable>
                </View>
                {/* </View> */}
                <View style={{ paddingBottom: 100 }} ></View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default memo(NewTickets)