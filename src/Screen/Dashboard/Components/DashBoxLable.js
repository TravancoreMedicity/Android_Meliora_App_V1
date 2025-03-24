import { View, Text } from 'react-native'
import React, { memo } from 'react'
import { UserIcon, UsersIcon } from 'react-native-heroicons/outline'

const DashBoxLable = ({ name, open, completed }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 0.3, borderColor: 'white', marginTop: 4 }} className='flex px-3 rounded p-1' >
            <View className='flex' style={{ width: '10%', alignItems: 'center', }}  >
                <UserIcon size={18} color={'white'} />
            </View>
            <View style={{ width: '70%' }} >
                <Text className='flex pl-2 text-white'
                    numberOfLines={1}
                    style={{ fontFamily: 'Roboto_500Medium', textTransform: 'capitalize' }} >{name}</Text>
            </View>
            <Text className='flex  text-center text-red-400' style={{ fontFamily: 'Roboto_500Medium', width: '10%' }} >{open}</Text>
            <Text className='flex  text-center text-green-200' style={{ fontFamily: 'Roboto_500Medium', width: '10%' }} >{completed}</Text>
        </View>
    )
}

export default memo(DashBoxLable)