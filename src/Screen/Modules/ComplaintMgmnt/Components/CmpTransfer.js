//import liraries
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Dialog, Portal, RadioButton, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import { axiosApi } from '../../../../config/Axiox';
import { getComplaintdeptData } from '../../../../Redux/Actions/common.action';

// create a component
const CmpTransfer = ({ visible, setVisible, slno, setCount }) => {

    const dispatch = useDispatch();

    const complaintDept = useSelector((state) => state.commonFun.companyDepartment.cmpDept, _.isEqual);
    const comData = useMemo(() => complaintDept, [complaintDept]);

    const { cmpDept, status } = comData;

    useEffect(() => {
        dispatch(getComplaintdeptData())
    }, [dispatch])

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const [value, setValue] = useState(0);

    const postData = {
        complaint_deptslno: value,
        complaint_slno: slno
    }

    const complaintTransfer = useCallback(async () => {
        const result = await axiosApi.patch(`/complaintassign/complaint/transfer`, postData);
        const { message, success } = result.data;
        if (success === 1) {
            setCount(slno + 100)
            setVisible(false)
        } else if (success === 0) {
            setCount(slno + 100)
            setVisible(false)
        } else {
            setCount(slno + 100)
            setVisible(false)
        }
    })

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog} >
                <Dialog.Title >
                    <Text variant='titleMedium' >Complaint Department</Text>
                </Dialog.Title>
                <Dialog.Content>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{
                            height: 150
                        }} >
                        <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                            {
                                status === false ? <Text>Loading...</Text> : <View>
                                    {
                                        cmpDept?.map((val) => {
                                            return <RadioButton.Item
                                                label={val.complaint_dept_name}
                                                value={val.complaint_dept_slno}
                                                key={val.complaint_dept_slno}
                                            />
                                        })
                                    }
                                </View>
                            }
                        </RadioButton.Group>
                    </ScrollView>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={complaintTransfer}>Done</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

//make this component available to the app
export default memo(CmpTransfer);
