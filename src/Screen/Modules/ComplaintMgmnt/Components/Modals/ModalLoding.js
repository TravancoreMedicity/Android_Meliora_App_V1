import { View, Text, Modal, ActivityIndicator } from 'react-native'
import React, { memo, useState } from 'react'
import { colorTheme } from '../../../../../Constant/Colors'

const ModalLoding = ({ visible }) => {
    return (
        <Modal
            visible={visible}
            // onRequestClose={setVisible}
            transparent={true}
        >
            <View
                style={{
                    display: 'flex',
                    flex: 1,
                    backgroundColor: 'lightgrey',
                    opacity: 0.50,
                    justifyContent: 'center'
                }} >
                <ActivityIndicator size='large' color={colorTheme.switchTrack} style={{ opacity: 10 }} />
                <Text style={{ textAlign: 'center', opacity: 10, color: colorTheme.switchThumb }} >Please wait....</Text>
            </View>
        </Modal>
    )
}

export default memo(ModalLoding) 