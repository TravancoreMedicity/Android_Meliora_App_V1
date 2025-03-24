import { View, Text, TouchableOpacity } from 'react-native'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { ChartBarIcon, AdjustmentsVerticalIcon, ArrowTrendingDownIcon, ArrowTrendingUpIcon, ArrowPathIcon } from 'react-native-heroicons/outline'
import { colorTheme } from '../../Constant/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getDeptWiseTicketCount } from '../../Redux/ReduxSlice/ticketMagmentDeptSlice';

const DashDesignTwo = ({ setCount }) => {
    const [newData, setNewData] = useState([])

    const data = useSelector(getDeptWiseTicketCount)

    useEffect(() => {
        data !== undefined && setNewData(data)
    }, [data])

    const [a, b, c, d, e] = newData

    const handleRefreshBtn = useCallback(async () => {
        setCount(prev => prev + 1)
    }, [setCount])

    return (
        <View
            className='flex flex-row border-0.5 rounded-lg overflow-hidden my-1'
            style={{ borderColor: colorTheme.switchTrack, backgroundColor: colorTheme.switchTrack }}
        >
            <View className='px-3 py-2 flex-1' >
                <View className='flex flex-row justify-items-center justify-between'>
                    <Text style={{ fontFamily: 'Roboto_100Thin', }} className='text-white pb-1' >{`Tickets Statistics `}</Text>
                    <View className='pb-1'>
                        <TouchableOpacity className='rounded-full p-0.5 bg-gray-400' onPress={handleRefreshBtn} >
                            <ArrowPathIcon size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Total tickets */}
                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 0.3, borderColor: 'white', }} className='flex px-3 rounded p-1' >
                    <View className='flex' style={{ width: '10%', alignItems: 'center' }}  >
                        <Entypo name="new-message" size={24} color="white" />
                    </View>
                    <Text
                        className='flex grow pl-5 text-white' style={{ fontFamily: 'Roboto_500Medium' }} >Total Tickets (Today)</Text>
                    <Text className='flex  text-center text-white' style={{ fontFamily: 'Roboto_500Medium', width: '18%' }} >{a?.total}</Text>
                </View>
                {/* not assigned tickets */}
                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 0.3, borderColor: 'white', }} className='flex px-3 rounded p-1 mt-1' >
                    <View className='flex' style={{ width: '10%', alignItems: 'center' }}  >
                        <ChartBarIcon size={24} color="white" />
                    </View>
                    <Text
                        className='flex grow pl-5 text-white' style={{ fontFamily: 'Roboto_500Medium' }} >New Tickets</Text>
                    <Text className='flex  text-center text-white' style={{ fontFamily: 'Roboto_500Medium', width: '18%' }} >{b?.total}</Text>
                </View>
                {/* open tickets */}
                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 0.3, borderColor: 'white', }} className='flex px-3 rounded p-1 mt-1' >
                    <View className='flex' style={{ width: '10%', alignItems: 'center' }}  >
                        <MaterialCommunityIcons name="open-source-initiative" size={24} color="white" />
                    </View>
                    <Text
                        className='flex grow pl-5 text-white' style={{ fontFamily: 'Roboto_500Medium' }} >Open Tickets</Text>
                    <Text className='flex  text-center text-white' style={{ fontFamily: 'Roboto_500Medium', width: '18%' }} >{c?.total}</Text>
                </View>
                {/* pening tickets */}
                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 0.3, borderColor: 'white', }} className='flex px-3 rounded p-1 mt-1' >
                    <View className='flex' style={{ width: '10%', alignItems: 'center' }}  >
                        <MaterialCommunityIcons name="timer-sand" size={24} color="white" />
                    </View>
                    <Text
                        className='flex grow pl-5 text-white' style={{ fontFamily: 'Roboto_500Medium' }} >Pending Tickets</Text>
                    <Text className='flex  text-center text-white' style={{ fontFamily: 'Roboto_500Medium', width: '18%' }} >{d?.total}</Text>
                </View>
                {/* completed ticketd */}
                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 0.3, borderColor: 'white', }} className='flex px-3 rounded p-1 mt-1' >
                    <View className='flex' style={{ width: '10%', alignItems: 'center' }}  >
                        <EvilIcons name="like" size={28} color="white" />
                    </View>
                    <Text
                        className='flex grow pl-5 text-white' style={{ fontFamily: 'Roboto_500Medium' }} >Completed Tickets(Today)</Text>
                    <Text className='flex  text-center text-white' style={{ fontFamily: 'Roboto_500Medium', width: '18%' }} >{e?.total}</Text>
                </View>
            </View>
        </View>
    )
}

export default memo(DashDesignTwo)