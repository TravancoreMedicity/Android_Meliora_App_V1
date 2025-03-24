import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Modal from 'react-native-modal'
import { windowHeight, windowWidth } from '../../../../../utils/Dimentions';
import { colorTheme } from '../../../../../Constant/Colors';
import { HandThumbUpIcon, TicketIcon } from 'react-native-heroicons/outline'

const CustomModal = ({ setModalVisible, visible }) => {

    const cancelModal = useCallback(() => setModalVisible(false), [setModalVisible])

    return (
        <View style={{ flex: 1 }}>
            <Modal
                isVisible={visible}
                coverScreen={true}
                hasBackdrop={true}
                backdropTransitionInTiming={800}
                backdropTransitionOutTiming={800}
                deviceWidth={windowWidth}
                deviceHeight={windowHeight}
                onSwipeComplete={cancelModal}
                swipeDirection="left"
                onBackdropPress={cancelModal}
                animationOutTiming={800}
            >
                <View
                    className='rounded-lg p-2 '
                    style={{ height: '15%', width: '100%', backgroundColor: colorTheme.mainBgColor }}
                >
                    <View className='flex-1 flex-row' >
                        <View className='flex-1 item-center  justify-center' >
                            <Text className='text-base text-center text-green-600' style={{ fontFamily: 'Roboto_500Medium' }} >This ticket was assigned to you !!</Text>
                        </View>
                    </View>
                    <View className='flex-0 p-0 pr-2 pb-1 items-end' >
                        <HandThumbUpIcon className='flex-0' height={30} width={30} color='green' onPress={cancelModal} />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default CustomModal
