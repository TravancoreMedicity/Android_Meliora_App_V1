//import liraries
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, Dialog, Portal, RadioButton, Text, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import _ from 'underscore';
import CheckedBox from '../../../../Components/CheckedBox';
import { useSelector } from 'react-redux'
import { format } from 'date-fns';
import { axiosApi } from '../../../../config/Axiox';
import ApiGetFun from '../func/ApiGetFun';
import { selectLoginInform } from '../../../../Redux/ReduxSlice/LoginSLice';
// create a component
const RectifyModal = ({ visible, setVisible, data, hold, onProgress }) => {

    const dispatch = useDispatch();
    const { complaint_slno, compalint_date, assigned_date, rectify_pending_hold_remarks } = data;

    const [count, setCount] = useState(0)
    const [radioBtn, setRadioBtn] = useState("R");
    const [remark, setRemark] = useState('')

    const [textError, setTextError] = useState(false)

    const [checked, setChecked] = useState({});
    const [checkVal, setCheck] = useState({})

    const assingnedData = useSelector((state) => state.complaint.actialAssignedEmpList.actEmpList, _.isEqual)
    const empListData = useMemo(() => assingnedData, [assingnedData]);

    // user logged information
    const loggedEmpDetl = useSelector(selectLoginInform);
    const loggedDetl = useMemo(() => loggedEmpDetl, [loggedEmpDetl]);
    const { emp_id } = loggedDetl;

    useEffect(() => {
        setCheck({ ...checkVal, ...checked })
    }, [checked])

    //selected actual assigned employee
    const assignedEmp = Object.entries(checkVal).map((val) => {
        return { em_id: val[0], status: val[1] }
    }).filter((val) => val.status === true)

    // console.log(radioBtn)

    const hideDialog = useCallback(() => {
        setVisible(false)
        setCheck({})
    }, []);
    // SUBMIT HANDLE CHANGE OPTION

    const submitRectify = useCallback(async () => {
        if (Object.keys(assignedEmp).length === 0) {
            Alert.alert("Select Atleast One Employee")
        } else if (remark === "") {
            setTextError(true)
        } else {
            setTextError(false)
            const postData = assignedEmp?.map((val) => {
                return {
                    compalint_status: radioBtn === 'R' ? 2 : 1,
                    cm_rectify_status: radioBtn,
                    cm_rectify_time: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                    rectify_pending_hold_remarks: remark,
                    assigned_emp: val.em_id,
                    complaint_slno: complaint_slno
                }
            })
            //updation to the database rectify updation 
            const result = await axiosApi.patch(`/Rectifycomplit/updatecmp`, postData);
            const { success } = result.data;
            if (success === 2) {
                setVisible(false)
                setCount(complaint_slno);
                Alert.alert("Updation Completed")
            } else {
                Alert.alert("Error ! , Contact System Administrator")
                setVisible(false)
            }
        }

    }, [assignedEmp])

    return (
        <Portal>
            <ApiGetFun count={count} />
            <Dialog visible={visible} onDismiss={hideDialog} >
                <Dialog.Title style={{ paddingTop: 2 }} >
                    <Text variant='titleSmall' >Complaint Rectification</Text>
                </Dialog.Title>
                <Dialog.Content>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                        <Text variant="bodyMedium">Complaint No</Text>
                        <Text variant="bodyMedium">#{complaint_slno}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                        <Text variant="bodyMedium">Register Date</Text>
                        <Text variant="bodyMedium">{compalint_date}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                        <Text variant="bodyMedium">Assigned Date</Text>
                        <Text variant="bodyMedium">{assigned_date}</Text>
                    </View>

                    {
                        hold === 1 &&
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between' }} >
                            <Text variant="bodyMedium" style={{ fontWeight: '700' }} >On Hold Reason :</Text>
                            <Text variant="bodyMedium" style={{ fontWeight: '700' }} >{rectify_pending_hold_remarks}</Text>
                        </View>
                    }

                </Dialog.Content>
                <Text variant='labelSmall' style={{ paddingLeft: 25, color: 'grey' }} >Job Assigned Employee</Text>
                <Dialog.ScrollArea  >
                    <ScrollView
                        contentContainerStyle={{ paddingVertical: 10 }}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                    >
                        {
                            empListData?.map((val, ind) => {
                                return <CheckedBox
                                    key={ind}
                                    data={val}
                                    ObjVal={checked[val.assigned_emp]}
                                    setObj={setChecked}
                                />
                            })
                        }
                    </ScrollView>
                </Dialog.ScrollArea>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap', paddingBottom: 5 }} >
                    <View style={styles.container}>
                        <RadioButton
                            value="P"
                            status={radioBtn === 'P' ? 'checked' : 'unchecked'}
                            onPress={() => setRadioBtn('P')}
                            disabled={onProgress === 1 && true}
                        />
                        <Text>On Progress</Text>
                    </View>
                    <View style={styles.container}>
                        <RadioButton
                            value="O"
                            status={radioBtn === 'O' ? 'checked' : 'unchecked'}
                            onPress={() => setRadioBtn('O')}
                            disabled={hold === 1 && true}
                        />
                        <Text>On Hold</Text>
                    </View>
                    <View style={styles.container}>
                        <RadioButton
                            value="R"
                            status={radioBtn === 'R' ? 'checked' : 'unchecked'}
                            onPress={() => setRadioBtn('R')}
                        />
                        <Text>Rectify</Text>
                    </View>
                </View>
                <View style={{ paddingBottom: 5 }} >
                    <TextInput
                        multiline={true}
                        label='Remarks'
                        error={textError}
                        value={remark}
                        onChangeText={useCallback((remark) => setRemark(remark), [remark])}
                    />
                </View>
                <Dialog.Actions>
                    <Button onPress={submitRectify}>Done</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

//make this component available to the app
export default memo(RectifyModal);
