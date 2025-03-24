import React, { memo } from 'react'
import Clock from "react-live-clock"
import { View, Text } from 'react-native'

const LiveCmpTimeDiffrenceClock = ({ dayDiffrence, newDates }) => {
    return (
        <View className='flex' >
            <View className='flex flex-row items-center' >
                <Text style={{
                    fontFamily: 'Roboto_300Light',
                    color: '#F25F5F',
                    fontSize: 14,
                    paddingRight: 8
                }}>{`${dayDiffrence} days`}</Text>
                <Clock
                    element={Text}
                    ticking={true}
                    date={newDates}
                    format="HH:mm:ss"
                    style={{
                        fontFamily: 'Roboto_300Light',
                        color: '#F25F5F',
                        fontSize: 13
                    }}
                />
                <Text style={{
                    fontFamily: 'Roboto_300Light',
                    color: '#F25F5F',
                    fontSize: 14,
                    paddingLeft: 8,
                }}>hours</Text>
            </View>
        </View>
    )
}

export default memo(LiveCmpTimeDiffrenceClock) 