import { View, Text } from 'react-native'
import React, { memo } from 'react'
import { ChartBarIcon } from 'react-native-heroicons/outline'
import { colorTheme } from '../../Constant/Colors'

const DashDesignOne = ({ name, subName, count }) => {
    return (
        <View
            className='flex flex-row border-0.5 rounded-lg overflow-hidden my-1'
            style={{ borderColor: colorTheme.switchTrack }}
        >
            <View
                className='flex bg-red-300 p-3'
                style={{ backgroundColor: colorTheme.switchTrack }}
            >
                <ChartBarIcon width={45} height={45} color="white" />
            </View>
            <View
                className='flex grow p-3'
                style={{ backgroundColor: colorTheme.switchTrack }}
            >
                <Text style={{ fontFamily: 'Roboto_400Regular', fontSize: 18, color: 'white' }} >{name}</Text>
                <Text style={{ fontFamily: 'Roboto_300Light', fontSize: 12, color: 'white' }} >{subName}</Text>
            </View>
            <View
                className='flex p-2 px-4 justify-center'
                style={{ backgroundColor: colorTheme.switchTrack }}
            >
                <Text style={{ fontFamily: 'Roboto_500Medium', fontSize: 40, color: 'white' }} >{count}</Text>
            </View>
        </View>
    )
}

export default memo(DashDesignOne) 