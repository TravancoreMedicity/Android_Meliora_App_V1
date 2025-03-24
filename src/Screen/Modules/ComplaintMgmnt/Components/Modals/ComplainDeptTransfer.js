import React, { memo, useCallback, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import BaseModal from '../../../../../Components/BaseModal'
import { HashtagIcon, PaperAirplaneIcon } from 'react-native-heroicons/outline'
import { colorTheme } from '../../../../../Constant/Colors'
import MutlilineTextInput from '../../../../../Components/MutlilineTextInput'
import BaseSwitch from '../../../../../Components/BaseSwitch'
import BaseRadioButton from '../../../../../Components/BaseRadioButton'
import { useDispatch, useSelector } from 'react-redux'
import { complaintDepartmentSliceData, reduxUpdation } from '../../../../../Redux/ReduxSlice/commonSlice'
import { ScrollView } from 'react-native-gesture-handler'
import { axiosApi } from '../../../../../config/Axiox'

const ComplainDeptTransfer = ({ openModelState, openState, data }) => {
    const {
        complaint_slno, //complaint slno
        complaint_desc,
    } = data;

    const dispatch = useDispatch()

    const cmpData = useSelector(complaintDepartmentSliceData)
    const [selectedId, setSelectedId] = useState(0);
    const [remark, setRemark] = useState('')

    const onChangeHoldStatus = useCallback(async () => {

        if (selectedId === 0 || selectedId === undefined || selectedId === null) {
            alert('select at least on department')
        } else if (remark === '') {
            alert('remarks needed to be filled')
        } else {
            const postData = {
                complaint_deptslno: selectedId,
                dept_transfer_remarks: remark,
                complaint_slno: complaint_slno
            }
            const handleOnchangeHandleFun = await axiosApi.patch(`/complaintassign/complaint/transfer`, postData)
            const { message, success } = await handleOnchangeHandleFun.data;
            if (success === 1) {
                alert(message)
                dispatch(reduxUpdation())
                openModelState(!openState)
            } else {
                alert('Contact IT !!')
                openModelState(!openState)
            }
        }
    }, [selectedId, remark, complaint_slno])

    return (
        <BaseModal
            openModelState={openModelState}
            openState={openState}
            height={80}
            firstName="Ticket Transfer"
            secondName="Department ticket transfer"
        >
            <ScrollView keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag' >
                <View className='flex flex-1 grow'>
                    <View className='flex flex-row' >
                        <HashtagIcon width={25} height={25} color={colorTheme.switchThumb} />
                        <Text className='flex font-medium text-lg antialiased' style={{ color: colorTheme.switchThumb }} >{complaint_slno}</Text>
                        <View className='flex flex-row grow justify-end  item-center' >
                            <Pressable
                                onPress={onChangeHoldStatus}
                                android_ripple
                                hitSlop={10}
                                className='flex flex-row items-center'
                                style={{
                                    borderWidth: 0.5,
                                    borderRadius: 5,
                                    borderColor: colorTheme.switchTrack,
                                    width: '40%',
                                    shadowColor: 'black',
                                    elevation: 8,
                                    shadowOffset: 5,
                                    shadowRadius: 5,
                                    shadowOpacity: 5,
                                    backgroundColor: 'white',
                                    justifyContent: 'space-around'
                                }}
                            >
                                <Text className='flex ' style={{ fontFamily: 'Roboto_100Thin', paddingHorizontal: 4, color: colorTheme.switchTrack }} >Transfer</Text>
                                <PaperAirplaneIcon width={25} height={25} color={colorTheme.switchThumb} />
                            </Pressable>
                        </View>
                    </View>
                    <View className='pt-2 pb-2' >
                        <Text className='flex text-lg' >Description</Text>
                        <View className='flex pt-2'>
                            <Text
                                className='flex text-sm'
                                style={{ color: colorTheme.fontColorLightGrey, textTransform: 'capitalize' }}
                            >{complaint_desc}</Text>
                        </View>
                    </View>
                    <View >
                        <View style={{ pb: 0.5 }}  >
                            <Text style={{ fontFamily: 'Roboto_100Thin' }} >Department Selection</Text>
                        </View>
                        <BaseRadioButton
                            data={cmpData}
                            selectedId={selectedId}
                            setSelectedId={setSelectedId}
                        />
                    </View>
                    <View className='pt-2'>
                        <View style={{ pb: 0.5 }}  >
                            <Text style={{ fontFamily: 'Roboto_100Thin' }} >Remark for transfer the tickets</Text>
                        </View>
                        <MutlilineTextInput
                            placeholder={'Remark reason for ticket transfer'}
                            value={remark}
                            onChange={setRemark}
                        />
                    </View>
                </View>
            </ScrollView>
        </BaseModal >
    )
}

export default memo(ComplainDeptTransfer) 