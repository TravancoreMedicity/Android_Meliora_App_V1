import React, { memo, useCallback, useState } from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import MutlilineTextInput from '../../../../../Components/MutlilineTextInput'
import BaseModal from '../../../../../Components/BaseModal'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { colorTheme } from '../../../../../Constant/Colors'
import { axiosApi } from '../../../../../config/Axiox'
import { reduxUpdation } from '../../../../../Redux/ReduxSlice/commonSlice'
import { getLogiEmployeeID } from '../../../../../Redux/ReduxSlice/LoginSLice'

const VerifyModal = ({ openState, openModelState, data }) => {
    const dispatch = useDispatch();

    const [remarks, setRemarks] = useState('')
    const empID = useSelector(getLogiEmployeeID)

    const onChangeVerification = useCallback(async () => {
        const verify = {
            complaint_slno: data,
            verify_spervsr: 1,
            verify_spervsr_remarks: remarks,
            compalint_status: 2,
            verify_spervsr_user: empID
        }

        const result = await axiosApi.patch(`/complaintassign/SupervsrVerify`, verify)
        const { success } = result.data;
        console.log(success)
        if (success === 1) {
            dispatch(reduxUpdation())
            openModelState(!openState)
        } else {
            openModelState(!openState)
        }

    }, [data, remarks, empID])

    const onChangeNotVerification = useCallback(async () => {
        const notverify = {
            complaint_slno: data,
            verify_spervsr: 2,
            verify_spervsr_remarks: remarks,
            compalint_status: 1,
            verify_spervsr_user: empID
        }

        if (remarks === '') {
            Alert.alert("Remarks Mandatory for Not - verify")
        } else {
            const result = await axiosApi.patch(`/complaintassign/SupervsrVerify`, notverify)
            const { success } = result.data;
            console.log(success)
            if (success === 1) {
                dispatch(reduxUpdation())
                openModelState(!openState)
            } else {
                openModelState(!openState)
            }
        }

    }, [data, remarks, empID])

    return (
        <BaseModal
            openModelState={openModelState}
            openState={openState}
            height={60}
            firstName="Verify"
            secondName="Rectified tickets verification"
            offset={'height'}
        >
            <ScrollView>
                <View className='flex flex-1 flex-col mt-2 p-2' >
                    <View className='flex flex-1 pt-2' >
                        <View style={{ pb: 0.5 }}  >
                            <Text style={{ fontFamily: 'Roboto_100Thin' }} >Remark</Text>
                        </View>
                        <MutlilineTextInput
                            placeholder={'verify remarks'}
                            value={remarks}
                            onChange={setRemarks}
                        />
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 50,
                    }}>
                        <TouchableOpacity
                            onPress={onChangeNotVerification}
                            style={{
                                width: 120,
                                height: 120,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 15,
                                margin: 5,
                                borderRadius: 100,
                                backgroundColor: colorTheme.switchThumb,
                                borderWidth: 4,
                                borderColor: 'red',
                                elevation: 10,
                                shadowColor: 'red'
                            }}>
                            <Text className='flex text-cyan-50 font-black'>not verify</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={onChangeVerification}
                            style={{
                                width: 120,
                                height: 120,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 15,
                                margin: 5,
                                borderRadius: 100,
                                backgroundColor: colorTheme.switchThumb,
                                borderWidth: 4,
                                borderColor: 'green',
                                elevation: 10,
                                shadowColor: 'green'
                            }}>
                            <Text className='flex text-cyan-50 font-black'>verify</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </BaseModal>
    )
}

export default memo(VerifyModal) 