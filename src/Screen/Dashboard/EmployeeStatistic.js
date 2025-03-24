import { View, Text } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { UsersIcon } from 'react-native-heroicons/outline'
import { colorTheme } from '../../Constant/Colors'
import DashBoxLable from './Components/DashBoxLable';
import { useSelector } from 'react-redux';
import { getEmpWiseTicketCount } from '../../Redux/ReduxSlice/ticketMagmentDeptSlice';

const EmployeeStatistic = () => {
    const [newData, setNewData] = useState([])
    const emp = useSelector(getEmpWiseTicketCount)

    useEffect(() => {
        emp !== undefined && setNewData(emp)
    }, [emp])

    return (
        <View
            className='flex flex-row border-0.5 rounded-lg overflow-hidden my-1'
            style={{ borderColor: colorTheme.switchTrack, backgroundColor: colorTheme.switchTrack }}
        >
            <View className='px-1 py-2 flex-1' >
                <View className='flex flex-row pl-2' style={{ alignItems: 'center', }} >
                    <UsersIcon size={14} color={'white'} />
                    <Text style={{ fontFamily: 'Roboto_100Thin', }} className='text-white pb-1 pl-1' >{`Employee Statistics`}</Text>
                </View>
                {
                    newData?.map((e, i) => <DashBoxLable key={i} name={e.empname} open={e.AA} completed={e.CC} />)
                }
            </View>
        </View>
    )
}

export default memo(EmployeeStatistic)