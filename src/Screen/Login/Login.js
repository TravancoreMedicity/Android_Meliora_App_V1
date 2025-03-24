//import liraries
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import SvgLogo from "../../../assets/tmcsvg.svg";
import CustomButtonL1 from "../../Components/CustomButtonL1";
import CustomTextInput from "../../Components/CustomTextInput";
import CustomTextInputWithLabel from "../../Components/CustomTextInputWithLabel";
import { axiosApi } from "../../config/Axiox";
import { colorTheme } from "../../Constant/Colors";
import { useDispatch } from "react-redux";

import CustomModal from "../../Components/CustomModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { loggedInfomration } from "../../Redux/ReduxSlice/LoginSLice"
import OverLayLoading from "../Modules/ComplaintMgmnt/Components/OverLayLoading";

// create a component
const Login = () => {
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [useCode, setUserCode] = useState("");
  const [passCode, setPassCode] = useState("");
  const [errorMesg, setErrorMesg] = useState(false);

  const [loading, setLoading] = useState(false)

  const IternalServerErr = () => {
    return (
      <View>
        <ActivityIndicator color="red" />
        <Text style={styles.ErrorText}>
          Internal Server Error!! No Network Connnectivity
        </Text>
      </View>
    );
  };

  const onSubmitFun = async (useCode, passCode) => {
    setLoading(true)
    try {
      setErrorMesg(false);
      const loginCred = {
        emp_username: useCode,
        emp_password: passCode,
      };

      const result = await axiosApi.post("/employee/login", loginCred);
      const { success } = result.data;
      if (success === 1) {
        const token = await JSON.stringify(result.data.token);
        const userInfo = await JSON.stringify(result.data);
        AsyncStorage.setItem("@token:", token);
        AsyncStorage.setItem("@userInfo:", userInfo);
        // dispatch the login info 
        dispatch(loggedInfomration(result.data))
        setLoading(false)
      } else {
        setModalMessage("User Code Or Passcode is Wrong !!");
        setModalVisible(true);
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
      setErrorMesg(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={colorTheme.mainBgColor}
        barStyle='dark-content'
      />
      {loading && <OverLayLoading />}
      <ScrollView style={styles.rapperView} keyboardShouldPersistTaps="always">
        <CustomModal
          setModal={setModalVisible}
          modalState={modalVisible}
          modalMessage={modalMessage}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <View style={styles.logoView}>
            <SvgLogo height={300} width={300} />
          </View>
          {/* <ActivityIndicator /> */}
          <View>
            <Text style={styles.textStyle}>Login</Text>
            {/* user code feild */}
            <CustomTextInput
              Icon={
                <MaterialIcons
                  name="perm-identity"
                  size={20}
                  color={colorTheme.mainColor}
                  style={{ marginRight: 5 }}
                />
              }
              Placeholder="User Code"
              keyboardType="number-pad"
              value={useCode}
              onChangeTextFn={(text) => setUserCode(text)}
            />

            {/* passcode feild */}
            <CustomTextInputWithLabel
              Icon={
                <MaterialIcons
                  name="lock-outline"
                  size={20}
                  color={colorTheme.mainColor}
                  style={{ marginRight: 5 }}
                />
              }
              InputType="password"
              Placeholder="Password"
              feildButtonLabel="forget?"
              // feildButtonFunction={() => {}}
              value={passCode}
              onChangeTextFn={(text) => setPassCode(text)}
            />

            {/* Login BUtton */}
            <CustomButtonL1
              label="Login"
              buttonFuntion={() => {
                onSubmitFun(useCode, passCode);
              }}
            />

            <Text style={styles.contactText}>
              For User Code Contact HR Department !!
            </Text>
          </View>
          {errorMesg && <IternalServerErr />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  logoView: {
    alignItems: "center",
  },
  textStyle: {
    fontFamily: "Roboto_500Medium",
    fontSize: 28,
    color: colorTheme.mainColor,
    marginBottom: 30,
  },
  rapperView: {
    paddingHorizontal: 25,
  },
  contactText: {
    textAlign: "center",
    fontWeight: "900",
    fontSize: 10,
    color: colorTheme.mainColor,
  },
  ErrorText: {
    textAlign: "center",
    fontWeight: "900",
    fontSize: 12,
    color: colorTheme.mainColor,
  },
});

//make this component available to the app
export default Login;
