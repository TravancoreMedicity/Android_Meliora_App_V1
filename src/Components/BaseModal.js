import { Modal, Text, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native'
import React, { memo, useCallback } from 'react'
import { XCircleIcon } from 'react-native-heroicons/outline'
import { colorTheme } from '../Constant/Colors';

const BaseModal = ({ children, openModelState, openState, height, firstName, secondName, offset }) => {
    return (
        <View style={{
            flex: 1,
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
                        height: height > 50 ? `${height}%` : `50%`,
                        width: '100%',
                        backgroundColor: 'white',
                        borderTopStartRadius: 25,
                        borderTopEndRadius: 25,
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                        overflow: 'hidden',
                    }}>
                        <View className='flex-1 w-full' >
                            <View className="p-2 border-b bg-white shadow-xs " style={{ borderColor: colorTheme.iconColor, zIndex: 1 }} >
                                <View>
                                    <Text className='text-lg text-center' style={{ fontFamily: 'Roboto_500Medium' }} >{firstName}</Text>
                                    <Text className='text-center text-gray-400 text-sm font-bold' style={{ fontFamily: 'Roboto_100Thin' }}  >
                                        {secondName}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={useCallback(() => openModelState(!openState), [openState])}
                                    className='rounded-full bg-gray-100 absolute top-3 right-5'
                                >
                                    <XCircleIcon color={colorTheme.switchThumb} height={35} width={35} />
                                </TouchableOpacity>
                            </View>

                            <View className='flex-1 bg-white px-5 pt-3' keyboardShouldPersistTaps='always'  >
                                <KeyboardAvoidingView enabled behavior={offset === 'height' ? 'height' : 'position'} keyboardVerticalOffset={240}  >
                                    {children}
                                </KeyboardAvoidingView>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal >
        </View >
    )
}

export default memo(BaseModal) 