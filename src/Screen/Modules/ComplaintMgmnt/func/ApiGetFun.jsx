//import liraries
import React, { memo, useMemo } from 'react';
import { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import { getEmployeeDetlLoggedDeptWise, reduxUpdate } from '../../../../Redux/ReduxSlice/commonSlice';
import {
    getAssignListEmp,
    getAssistListEmp,
    getComDetlcountEmp,
    getforVerifyListEmp,
    getNotAssignedComplaintList,
    getOnHoldListEmp,
    getOnProgressListEmp
} from '../../../../Redux/ReduxSlice/ticketMagmntSlice';
import { getSecondLevelVerificationList } from '../../../../Redux/ReduxSlice/ticketMagmentDeptSlice';

// create a component
const ApiGetFun = ({ count }) => {
    const dispatch = useDispatch();

    const reduxCount = useSelector(reduxUpdate)
    //logged employee details
    const loggedEmpDetl = useSelector((state) => state.loginFuntion.loginInfo.loginDetl);
    const loggedDetl = useMemo(() => loggedEmpDetl, [loggedEmpDetl]);
    const { emp_id, emp_dept } = loggedDetl;

    useEffect(() => {
        dispatch(getComDetlcountEmp(emp_id))
        dispatch(getNotAssignedComplaintList(emp_dept))
        dispatch(getAssignListEmp(emp_id))
        dispatch(getAssistListEmp(emp_id))
        dispatch(getOnHoldListEmp(emp_id))
        dispatch(getOnProgressListEmp(emp_id))
        dispatch(getforVerifyListEmp(emp_id))
        dispatch(getSecondLevelVerificationList(emp_dept))
    }, [emp_id, emp_dept, count, reduxCount])

    return (
        <View></View>
    );
};

//make this component available to the app
export default memo(ApiGetFun);
