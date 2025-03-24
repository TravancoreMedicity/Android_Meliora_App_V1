import { View, Text } from 'react-native'
import React, { memo } from 'react'
import DeptTicktDash from './DeptTicktDash'

const DeptStatistic = () => {
    return (

        // for task management
        <View className='flex flex-row flex-wrap' >
            <DeptTicktDash />
            <DeptTicktDash />
        </View>
    )
}

export default memo(DeptStatistic) 