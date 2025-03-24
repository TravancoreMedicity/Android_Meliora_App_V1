import { View, Text, Pressable } from 'react-native'
import React, { memo, useCallback } from 'react'
import { CheckIcon } from 'react-native-heroicons/outline'
import { colorTheme } from '../Constant/Colors'

const BaseCheckBoxOne = ({ setCheckVal, checkvalue, name, style }) => {
    const onChangeCheck = useCallback(() => {
        setCheckVal(!checkvalue)
    }, [checkvalue])
    return (
        <View className='flex flex-row my-1' >
            <Pressable
                className='w-6 h-6 '
                style={{
                    borderWidth: 1,
                    borderRadius: 3,
                    backgroundColor: colorTheme.switchTrack,
                    ...style,
                }}
                onPress={onChangeCheck}
            >
                {
                    checkvalue && <CheckIcon width={22} height={22} color="white" />
                }
            </Pressable>
            <Text className='capitalize pl-2'  >{name}</Text>
        </View>
    )
}

export default memo(BaseCheckBoxOne) 