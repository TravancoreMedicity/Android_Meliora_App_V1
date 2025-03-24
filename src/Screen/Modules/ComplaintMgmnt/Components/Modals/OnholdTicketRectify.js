import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, KeyboardAvoidingView, Modal, Pressable, Text, View } from 'react-native'
import { Portal } from 'react-native-paper'
import MutlilineTextInput from '../../../../../Components/MutlilineTextInput'
import BaseModal from '../../../../../Components/BaseModal'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { getActualTicketAssingedEmp, getTicketActualEmp } from '../../../../../Redux/ReduxSlice/ticketMagmntSlice'
import { windowHeight } from '../../../../../utils/Dimentions'
import { CheckIcon } from 'react-native-heroicons/outline'
import { colorTheme } from '../../../../../Constant/Colors'
import BaseCheckBox from '../../../../../Components/BaseCheckBox'
import BaseRadioButton from '../../../../../Components/BaseRadioButton'
import { ChevronDoubleRightIcon } from 'react-native-heroicons/outline'
import { format } from 'date-fns'
import { axiosApi } from '../../../../../config/Axiox'
import { reduxUpdation } from '../../../../../Redux/ReduxSlice/commonSlice'

const OnholdTicketRectify = ({ openState, openModelState, data }) => {
    const dispatch = useDispatch();

    const [remarks, setRemarks] = useState('')

    //EMPLOYEE SELECTION
    const empDetl = useSelector(getTicketActualEmp)
    const assinEmpData = useMemo(() => empDetl, [empDetl]);
    const [selectedEmp, setSelectedEmp] = useState({
        empSlno: []
    })
    const selectedempSlno = useMemo(() => selectedEmp, [selectedEmp])
    const { empSlno } = selectedempSlno


    //ON PROGRESS SECTION
    const onProgress = useMemo(() => {
        return [
            { id: 'P', label: 'On Progress', value: 'P' },
            { id: 'R', label: 'Rectify', value: 'R' },
        ]
    })

    const [rectId, setRectId] = useState(0)

    const onRectifyTicketFun = useCallback(async () => {
        if (Object.keys(empSlno).length === 0) {
            Alert.alert("Select Atleast One Employee")
        } else if (remarks === "") {
            Alert.alert("Remark is mandatory")
        } else {
            const postData = await empSlno?.map((em_id) => {
                return {
                    compalint_status: rectId === 'R' ? 2 : 1,
                    cm_rectify_status: rectId,
                    cm_rectify_time: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                    rectify_pending_hold_remarks: remarks,
                    verify_spervsr: 0,
                    pending_onhold_time: rectId !== 'R' ? format(new Date(), 'yyyy-MM-dd HH:mm:ss') : null,
                    pending_onhold_user: em_id,
                    complaint_slno: data
                }
            })

            const result = await axiosApi.patch(`/Rectifycomplit/updatecmp`, postData);
            const { success } = result.data;
            if (success === 2) {
                Alert.alert("Updation Completed")
                dispatch(reduxUpdation())
                setSelectedEmp({ empSlno: [] })
                setRemarks('')
                setRectId(0)
                openModelState(!openState)
            } else {
                Alert.alert("Error ! , Contact System Administrator")
                setSelectedEmp({ empSlno: [] })
                setRemarks('')
                setRectId(0)
                openModelState(!openState)
            }
        }
    }, [empSlno, data, remarks, rectId, openState])
    return (
        <BaseModal
            openModelState={openModelState}
            openState={openState}
            height={80}
            firstName="On Hold Tickets"
            secondName="onHold tickets rectification"
        >
            <ScrollView>
                <View style={{ pb: 0.5 }}  >
                    <Text style={{ fontFamily: 'Roboto_100Thin' }} >Select the ticket rectify employees</Text>
                </View>
                <View
                    className='flex rounded-md'
                    style={{ borderWidth: 0.3, }}
                >
                    <ScrollView style={{ padding: 10 }} keyboardShouldPersistTaps='always' >
                        {
                            assinEmpData?.data?.map((e) => {
                                return <BaseCheckBox
                                    key={e.assigned_emp}
                                    data={e}
                                    selectedEmpVal={selectedempSlno}
                                    setEmpVal={setSelectedEmp}
                                />
                            })
                        }
                    </ScrollView>
                </View>
                <View className='pt-1' >
                    <View style={{ pb: 0.5 }}  >
                        <Text style={{ fontFamily: 'Roboto_100Thin' }} >Check the rectify Status</Text>
                    </View>
                    <BaseRadioButton
                        data={onProgress}
                        selectedId={rectId}
                        setSelectedId={setRectId}
                    />
                </View>
                <View className='pt-2' >
                    <View style={{ pb: 0.5 }}  >
                        <Text style={{ fontFamily: 'Roboto_100Thin' }} > Rectify remark</Text>
                    </View>
                    <MutlilineTextInput
                        placeholder={'Ticket rectify remarks'}
                        value={remarks}
                        onChange={setRemarks}
                    />
                </View>
                <View className='pt-2' >
                    <Pressable
                        className='w-full flex-row items-center h-10 justify-center rounded-lg'
                        style={{ borderColor: colorTheme.switchThumb, borderWidth: 0.5 }}
                        onPress={onRectifyTicketFun}
                    >
                        <ChevronDoubleRightIcon width={30} height={30} color={colorTheme.switchTrack} />
                        <View style={{ paddingLeft: 10 }} >
                            <Text>Rectify the ticket</Text>
                        </View>
                    </Pressable>
                </View>
            </ScrollView>
        </BaseModal>
    )
}

export default memo(OnholdTicketRectify) 