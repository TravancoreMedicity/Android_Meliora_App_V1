//import liraries
import React, { useCallback, useMemo, useState, useEffect, memo } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { bgColor, fontColor } from "../../Constant/Colors";
import { Card, Switch } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { axiosApi } from "../../config/Axiox";
import { selectLoginInform } from "../../Redux/ReduxSlice/LoginSLice";
import { getMobileAppCred, getMobileAppCreditial } from "../../Redux/ReduxSlice/commonSlice";
import { getPushToken } from "../../Redux/ReduxSlice/pushTokenSlice";
// create a component

const SettingsCmp = ({ title }) => {

    const dispatch = useDispatch();
    const [count, setCount] = useState(0)

    const [settings, setSettings] = useState(false);
    const [notification, setNotification] = useState(false);

    // getting the expo credential updation details
    const loginInform = useSelector(selectLoginInform);
    const loginEmpDetl = useMemo(() => loginInform, [loginInform]);

    const { emp_id } = loginEmpDetl;

    useEffect(() => {
        dispatch(getMobileAppCreditial(emp_id))
    }, [emp_id, count])

    const token = useSelector(getPushToken)
    const appToken = useMemo(() => token, [token]);

    //expo status in database

    const expoDetl = useSelector(getMobileAppCred)
    const expoCredDetl = useMemo(() => expoDetl, [expoDetl]);

    useEffect(() => {
        const { mob_app_required, mobile_app_registred } = expoCredDetl;
        if (mob_app_required === 1) {
            // setMobileAppRegisterd(true)
            setNotification(true)
        } else {
            // setMobileAppRegisterd(false)
            setNotification(false)
        };

        if (mobile_app_registred === 1) {
            // setPushNotRequired(true)
            setSettings(true)
        } else {
            // setPushNotRequired(false);
            setSettings(false)
        }
    }, [expoCredDetl])

    const postData = {
        mobile_app_registred: 1,
        app_token: appToken?.data,
        mob_reg_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        token_valid: 1,
        mobile_ip: 0,
        mob_app_required: 1,
        em_id: emp_id
    }

    const delpostData = {
        mobile_app_registred: 0,
        app_token: null,
        mob_reg_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        token_valid: 0,
        mobile_ip: 0,
        mob_app_required: 0,
        em_id: emp_id
    }

    // Enable notification settings update the token to the backend
    const updateTheExpoPushToken = useCallback(async () => {
        setSettings(!settings);

        const updateExpoToken = async (data) => {
            // console.log(data)
            const result = await axiosApi.patch("/common/mobileapp/update", data);
            const { success, message } = await result.data;
            if (success === 1) {
                Alert.alert("Notification Settings Enabled Successfully")
            } else {
                Alert.alert("Error ! Contact System Administrator")
            }
            setCount(count + 1)
        }

        const deleteExpoToken = async (data) => {
            const result = await axiosApi.patch("/common/mobileapp/update", data);
            const { success, message } = await result.data;
            if (success === 1) {
                Alert.alert("Notification Settings Removed Successfully")
            } else {
                Alert.alert("Error ! Contact System Administrator")
            }
            setCount(count + 1)
        }

        if (settings === true) {
            deleteExpoToken(delpostData)
        } else {
            updateExpoToken(postData)
        }

    }, [postData, delpostData])


    //diable the notification enable / disable option in DB

    const enableDisableNotificationSetting = useCallback(async () => {
        if (notification === false) {
            // update required to 1 for enable the notification
            let data = {
                mob_app_required: 1,
                em_id: emp_id
            }
            const result = await axiosApi.patch("/common/mobapprequired/update", data);
            const { success } = await result.data;
            if (success === 1) {
                Alert.alert("Push Notification Enabled")
                setNotification(true)
            } else {
                Alert.alert("Error ! , Contact EDP")
                setNotification(false)
            }
        } else {
            // update required to 0 for disable the notification
            let data = {
                mob_app_required: 0,
                em_id: emp_id
            }
            const result = await axiosApi.patch("/common/mobapprequired/update", data);
            const { success } = await result.data;
            if (success === 1) {
                Alert.alert("Push Notification Disabled")
                setNotification(false)
            } else {
                Alert.alert("Error ! , Contact EDP")
                setNotification(true)
            }
        }

    }, [notification])

    return (
        <Card mode="contained" style={{ backgroundColor: bgColor.switchColor, marginVertical: 2 }} >
            <View style={{ flex: 1, flexDirection: 'row' }} >
                <View style={styles.TextContainer} >
                    <Text style={styles.textContainText} >Enable Notification Settings</Text>
                </View>
                <View style={styles.switchContainer}>
                    <Switch
                        value={settings}
                        onValueChange={updateTheExpoPushToken}
                        color="#fa3f7e"
                    />
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }} >
                <View style={styles.TextContainer} >
                    <Text style={styles.textContainText} >{title}</Text>
                </View>
                <View style={styles.switchContainer}>
                    <Switch
                        value={notification}
                        onValueChange={enableDisableNotificationSetting}
                        color="#fa3f7e"
                        disabled={!settings}
                    />
                </View>
            </View>
        </Card>
    );
};

// define your styles
const styles = StyleSheet.create({
    TextContainer: {
        flex: 4,
        justifyContent: 'center',
        paddingLeft: 15
    },
    textContainText: {
        fontFamily: "Roboto_500Medium",
        fontSize: 15,
        color: fontColor.inActiveFont
    },
    switchContainer: {
        flex: 1,
        alignItems: 'center'
    }
});

//make this component available to the app
export default memo(SettingsCmp);
