import { ScrollView, View } from 'react-native'
import React, { memo, useCallback, useEffect, useState } from 'react'
import DashDesignTwo from './DashDesignTwo'
import EmployeeStatistic from './EmployeeStatistic'
import { useDispatch, useSelector } from 'react-redux'
import { getLogiEmpDEPT } from '../../Redux/ReduxSlice/LoginSLice'
import { getDepartmentWiseTicketCount, getDeptWiseTicketCount, getEmpTicketStatistic, getEmpWiseTicketCount } from '../../Redux/ReduxSlice/ticketMagmentDeptSlice'

const DepartmentStat = () => {
    const [count, setCount] = useState(0)
    const dispatch = useDispatch()
    const deptID = useSelector(getLogiEmpDEPT)

    useEffect(() => {
        dispatch(getDepartmentWiseTicketCount(deptID))
        dispatch(getEmpTicketStatistic(deptID))
    }, [deptID, count])
    return (
        <View>
            <DashDesignTwo setCount={setCount} />
            <EmployeeStatistic />
            <View style={{ height: 300 }} ></View>
        </View>
    )
}

export default memo(DepartmentStat)

