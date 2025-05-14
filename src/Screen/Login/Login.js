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
  Dimensions,
  useColorScheme,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import SvgLogo from "../../../assets/tmcsvg.svg";
import CustomButtonL1 from "../../Components/CustomButtonL1";
import CustomTextInput from "../../Components/CustomTextInput";
import CustomTextInputWithLabel from "../../Components/CustomTextInputWithLabel";
import { axiosApi } from "../../config/Axiox";
import { useDispatch } from "react-redux";

import CustomModal from "../../Components/CustomModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { loggedInfomration } from "../../Redux/ReduxSlice/LoginSLice";
import OverLayLoading from "../Modules/ComplaintMgmnt/Components/OverLayLoading";

const { height, width } = Dimensions.get("window");
// create a component
const Login = () => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [useCode, setUserCode] = useState("");
  const [passCode, setPassCode] = useState("");
  const [errorMesg, setErrorMesg] = useState(false);

  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
        dispatch(loggedInfomration(result.data));
        setLoading(false);
      } else {
        setModalMessage("Invalid user code or passcode. Please try again.");
        setModalVisible(true);
        setLoading(false);
      }
    } catch (error) {
      // console.log(error);
      setErrorMesg(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#f0f1f5"
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      {loading && <OverLayLoading />}
      <ScrollView
        style={styles.rapperView}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "space-evenly",
        }}
      >
        <CustomModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          modalMessage={modalMessage}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <View style={styles.logoView}>
            <SvgLogo
              height={height > 1000 ? 450 : 300}
              width={height > 1000 ? 450 : 300}
            />
          </View>
          {/* <ActivityIndicator /> */}
          <View style={{ flex: 1 }}>
            <Text style={styles.textStyle}>Login</Text>
            {/* user code feild */}
            <CustomTextInput
              Icon={
                <FontAwesome
                  name="user-o"
                  size={19}
                  color="rgb(124,81,161)"
                  style={{ marginRight: 5, marginLeft: 3 }}
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
                <Ionicons
                  name="lock-closed-outline"
                  size={21}
                  color="rgb(124,81,161)"
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
    backgroundColor: "#f0f1f5",
  },
  logoView: {
    flex: 1,
    alignItems: "center",
  },
  textStyle: {
    fontFamily: "Roboto_500Medium",
    fontSize: 28,
    color: "rgb(124,81,161)",
    marginBottom: 30,
  },
  rapperView: {
    paddingHorizontal: width > 450 ? 100 : 35,
  },
  contactText: {
    textAlign: "center",
    fontWeight: "900",
    fontSize: 10,
    color: "rgb(124,81,161)",
  },
  ErrorText: {
    textAlign: "center",
    fontWeight: "900",
    fontSize: 12,
    color: "rgb(124,81,161)",
  },
});

//make this component available to the app
export default Login;
