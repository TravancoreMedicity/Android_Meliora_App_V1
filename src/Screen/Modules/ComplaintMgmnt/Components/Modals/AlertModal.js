import { Modal, Pressable, Text, View } from 'react-native'
import React, { memo, useCallback } from 'react'
import { colorTheme } from '../../../../../Constant/Colors';
import { HandThumbUpIcon } from 'react-native-heroicons/outline'
import { axiosApi } from '../../../../../config/Axiox';
import { useDispatch } from 'react-redux';
import { reduxUpdation } from '../../../../../Redux/ReduxSlice/commonSlice';
import { AntDesign } from '@expo/vector-icons';

const AlertModal = ({ modalVisible, setModalVisible, postData }) => {

    const dispatch = useDispatch()

    const quickAssignMent = useCallback(async () => {

        const result = await axiosApi.post('/complaintassign', postData);
        const { message, success } = result.data;
        if (success === 1) {
            // setCount(complaint_slno)
            dispatch(reduxUpdation())
            setModalVisible(false)
        } else if (success === 0) {
            Alert.alert('Caution !!', message, [
                { text: 'OK' },
            ]);
        } else {
            Alert.alert('Caution !!', message, [
                { text: 'OK' },
            ]);
        }

    }, [postData])

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }} >
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                // presentationStyle='overFullScreen'
                // statusBarTranslucent={true}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 22,
                }} >
                    <View style={{
                        height: '20%',
                        width: '80%',
                        margin: 20,
                        backgroundColor: colorTheme.mainBgColor,
                        borderRadius: 20,
                        padding: 5,
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
                        <View className='flex-1 w-full p-1' >
                            <View className='flex-1 justify-center items-center' >
                                <Text
                                    style={{ fontFamily: 'Roboto_400Regular', fontSize: 16, color: colorTheme.greenVarient }}
                                >Do you want to quick assign !!</Text>
                                <Text style={{ fontFamily: 'Roboto_300Light', color: colorTheme.SecondfontColor }} >
                                    Press <AntDesign name="closecircleo" size={12} color="red" /> to cancel !! </Text>
                            </View>
                            <View className='flex flex-1 flex-row' >
                                <View className='flex-1 items-center' >
                                    <Pressable
                                        className='w-20 items-center h-10 justify-center rounded-lg border-2'
                                        style={{ borderColor: 'red' }}
                                        onPress={() => setModalVisible(!modalVisible)}>
                                        <AntDesign name="closecircleo" size={26} color="red" />
                                        {/* <HandThumbUpIcon width={30} height={30} color={colorTheme.iconColor} /> */}
                                    </Pressable>
                                </View>
                                <View className='flex-1 items-center' >
                                    <Pressable
                                        className='w-20 items-center h-10 justify-center rounded-lg border-2'
                                        style={{ borderColor: colorTheme.greenVarient }}
                                        onPress={quickAssignMent}>
                                        <HandThumbUpIcon width={30} height={30} color={colorTheme.greenVarient} />
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default memo(AlertModal)
