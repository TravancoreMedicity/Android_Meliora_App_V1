//import liraries
import { format } from 'date-fns';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Dialog, Portal, Text, Button, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { axiosApi } from '../../../../config/Axiox';
import { selectLoginInform } from '../../../../Redux/ReduxSlice/LoginSLice';
import CusSwitchCmp from './CusSwitchCmp';
// create a component
const CustmDIalog = ({ visible, setVisible, data, user, setCount }) => {
    const hideDialog = () => setVisible(false);
    const {
        complaint_slno, //complaint slno
        compalint_date, //complaint date
        complaint_dept_name, //complaint register department
        req_type_name, // request complaint type - complaint,new requirement , modification
        complaint_type_name, // comolaint type name hardware ,software ,etc
        sec_name, // complaint register user section name
        location, // location name in detail
        comp_reg_emp, //  register employee name-complaint
        empdept, // registerd department 
        hic_policy_name,
        priority,
        complaint_desc,
        compalint_priority
    } = data;

    const [empArray, setEmpArray] = useState([])
    const [filterEmpDetl, setA] = useState([])
    const [remark, setRemark] = useState("")

    const empDetl = useSelector(selectLoginInform);
    const empLoggedEmpDetl = useMemo(() => empDetl, [empDetl]);

    useEffect(() => {
        // const array = empLoggedEmpDetl?.map((val) => {
        //     return { id: val.em_id, name: val.em_name, status: false }
        // })
        const array = [];

        //empLoggedEmpDetl && empLoggedEmpDetl

        setEmpArray(array)
        setA([...array])
    }, [empLoggedEmpDetl])


    const setSwitchFun = useCallback(async (value, id) => {
        const data = filterEmpDetl.map((val) => {
            if (val.id === id && value === true) {
                return { ...val, status: true }
            } else if ((val.id === id && value === false)) {
                return { ...val, status: false }
            } else {
                return { ...val }
            }
        })
        setA(data)
    })
    //post data to the api
    const postData = filterEmpDetl?.filter((val) => val.status === true).map((val) => {
        return {
            complaint_remark: remark,
            complaint_slno: complaint_slno,
            assigned_emp: val.id,
            assigned_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            assign_rect_status: 0,
            assigned_user: user
        }
    })

    //post api call
    const quickAssignMent = useCallback(async () => {
        const result = await axiosApi.post(`/complaintassign/detailassign`, postData);
        const { message, success } = result.data;
        if (success === 1) {
            setCount(complaint_slno + 5)
            setVisible(false)
        } else if (success === 0) {
            setVisible(false)
            setCount(complaint_slno + 5)
        } else {
            setVisible(false)
            setCount(complaint_slno + 5)
        }
    }, [postData])

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Icon icon="account-arrow-down-outline" color='grey' size={40} />
                <Dialog.Title style={styles.title}>Ticket Description</Dialog.Title>
                <Dialog.Content style={styles.content} >
                    <View style={{ width: '100%' }}>
                        <Text variant="bodyMedium" style={{ textTransform: 'capitalize' }} >
                            {complaint_desc}
                        </Text>
                    </View>
                    <View style={{
                        width: '100%',
                        alignContent: 'stretch',
                        paddingVertical: 1,
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                        // backgroundColor: 'blue'
                    }} >
                        <Text variant="titleSmall" >Complaint Register Time : </Text>
                        <Text variant="titleSmall" >{compalint_date}</Text>
                    </View>
                </Dialog.Content>
                <Dialog.ScrollArea style={{
                    height: 150
                }} >
                    <ScrollView
                        contentContainerStyle={{ paddingHorizontal: 10 }}
                        showsVerticalScrollIndicator={false}
                    >
                        {
                            empArray?.map((val, ind) => {
                                return <CusSwitchCmp
                                    key={ind}
                                    data={val}
                                    handleChange={setSwitchFun}
                                />
                            })
                        }
                    </ScrollView>
                </Dialog.ScrollArea>
                <View style={{
                    paddingBottom: 5
                }} >
                    <TextInput
                        label='Remarks'
                        multiline={true}
                        numberOfLines={2}
                        value={remark}
                        onChangeText={(remark) => setRemark(remark)}
                    />
                </View>
                <Dialog.Actions style={styles.action} >
                    <Button onPress={quickAssignMent}>Ok</Button>
                    <Button onPress={useCallback(() => hideDialog(), [hideDialog])}>Cancel</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

// define your styles
const styles = StyleSheet.create({
    title: {
        textAlign: 'left',
        fontSize: 15,
        fontWeight: '900',
    },
    content: {
        alignItems: 'center',
    },
    action: {
        justifyContent: 'space-between'
    },
});

//make this component available to the app
export default memo(CustmDIalog);
