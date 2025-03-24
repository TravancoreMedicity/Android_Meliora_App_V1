import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import { colorTheme } from '../../Constant/Colors'

const DeptTicktDash = () => {
    return (
        <View className='flex w-2/4 ' >
            <View className='border m-2.5 p-1 py-2 bg-slate-200 border-slate-200' style={{ borderRadius: 25 }} >
                <View>
                    <Text style={{
                        fontFamily: 'Roboto_700Bold',
                        fontSize: 40,
                        paddingLeft: 5,
                        color: 'green'
                    }} >30</Text>
                </View>
                <View>
                    <Text style={{
                        fontFamily: 'Roboto_300Light',
                        fontSize: 15,
                        paddingLeft: 5
                    }}>Task</Text>
                </View>
                <View>
                    <Text style={{
                        fontFamily: 'Roboto_500Medium',
                        fontSize: 18,
                        paddingLeft: 5
                    }}>New Tickets</Text>
                </View>
                <View className='py-2' >
                    <View style={{ paddingLeft: 5 }}>
                        <TouchableOpacity style={{
                            borderWidth: 1,
                            borderRadius: 10,
                            backgroundColor: 'green',
                            width: '50%',
                            padding: 1
                        }} >
                            <Text className='text-center'>View</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default memo(DeptTicktDash) 