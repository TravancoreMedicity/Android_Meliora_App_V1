import React, { memo, useState } from 'react'
import { Switch, View, Text } from 'react-native'
import { colorTheme } from '../Constant/Colors'

const BaseSwitch = ({ name }) => {

    const [isEnabled, toggleSwitch] = useState(false)

    return (
        <View className='flex-1 px-5 flex-row item-center justify-items-center mt-2 ' >
            <Switch
                trackColor={{ false: colorTheme.fontColorLightGrey, true: '#254b6e' }}
                thumbColor={isEnabled ? '#132851' : '#132851'}
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{ width: 50, height: 30, }}
            />
            <View className='flex justify-center pl-1 items-center justify-items-center' >
                <Text className='flex ' style={{ fontWeight: '500' }} >{name}</Text>
            </View>
        </View>
    )
}

export default memo(BaseSwitch) 