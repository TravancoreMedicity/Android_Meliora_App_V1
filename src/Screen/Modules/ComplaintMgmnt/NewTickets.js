import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCmpSlno,
  getComplaintSlno,
  getSelectedComplaintType,
  getSelectedDepartmentSectionId,
  getSelectedDept,
  getSelectedLocationId,
  setSelectedComplaintType,
  setSelectedDepartmentLocation,
  setSelectedDepartmentSectionId,
  setSelectedDept,
} from "../../../Redux/ReduxSlice/newTicketSlice";
import CustomActivityIndicator from "../../../Components/CustomActivityIndicator";
import {
  getLogiEmpDEPT,
  getLogiEmployeeID,
} from "../../../Redux/ReduxSlice/LoginSLice";
import { useNavigation } from "@react-navigation/native";
import { Switch, TextInput, useTheme } from "react-native-paper";
import HeaderForm from "../../../Components/HeaderForm";
import CompDeptSelection from "./Components/Version1/Common/CompDeptSelection";
import ComTypeSelection from "./Components/Version1/Common/ComTypeSelection";
import DepartmentSection from "./Components/Version1/Common/DepartmentSection";
import DepartmentLocation from "./Components/Version1/Common/DepartmentLocation";
import CenteredButton from "./Components/Version1/Common/CenteredButton";
import { axiosApi } from "../../../config/Axiox";
import { ShowToastMessage } from "../../../Components/V1_Cmp/Toaster/ToasterMessages";

const NewTickets = () => {
  //  custom hooks
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigation = useNavigation();

  // Redux State
  const cmpDept = useSelector(getSelectedDept);
  const complaintType = useSelector(getSelectedComplaintType);
  const departmentSectionID = useSelector(getSelectedDepartmentSectionId);
  const departmentLocation = useSelector(getSelectedLocationId);
  const compSlno = useSelector(getComplaintSlno);
  const emp_ID = useSelector(getLogiEmployeeID);
  const emp_dept = useSelector(getLogiEmpDEPT);

  //  local state
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [ticketDesc, setTicketDesc] = useState("");
  const [ticketPriority, setTicketPriority] = useState("");
  const [secondaryLocation, setSecondaryLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //  Fetch complaint serial number
  useEffect(() => {
    dispatch(getCmpSlno());
  }, [dispatch]); // Run once on mount

  // Reset state function
  const resetState = () => {
    dispatch(setSelectedDept(null));
    dispatch(setSelectedComplaintType(null));
    dispatch(setSelectedDepartmentLocation(null));
    dispatch(setSelectedDepartmentSectionId(null));
    setIsSwitchOn(false);
    setTicketDesc("");
    setTicketPriority("");
    setSecondaryLocation("");
  };

  //  handle functions
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const handleSubmitFunction = async () => {
    setIsLoading(true);

    if (
      !ticketDesc ||
      !departmentSectionID ||
      (departmentLocation === null && secondaryLocation === "")
    ) {
      ShowToastMessage("warnToast", "Warn", "Please fill all the fields");
      setIsLoading(false);
      return;
    }

    if (isSwitchOn && !ticketPriority) {
      ShowToastMessage("warnToast", "Warn", "Please fill the priority reason");
      setIsLoading(false);
      return;
    }

    if (compSlno === null) {
      ShowToastMessage("warnToast", "Warn", "NULL Serial Number, retrying...");
      dispatch(getCmpSlno());
      setIsLoading(false);
      return;
    }

    try {
      const postRegisterData = {
        complaint_slno: compSlno,
        complaint_desc: ticketDesc,
        complaint_dept_secslno: departmentSectionID,
        complaint_request_slno: 1,
        complaint_deptslno: cmpDept,
        complaint_typeslno: complaintType,
        priority_check: isSwitchOn ? 1 : 0, // 0 - Normal 1 - Priority
        complaint_hicslno: 0, // icra
        compalint_status: 0,
        cm_location: departmentSectionID, //
        create_user: emp_ID, // login user id
        priority_reason: isSwitchOn === true ? ticketPriority : null,
        priority: isSwitchOn ? "Priority Ticket" : "Normal Ticket",
        rm_room_slno: departmentLocation === null ? null : departmentLocation,
        cm_asset_status: 0, // if asset tagged then 1
        cm_complaint_location: secondaryLocation,
      };

      const registerTicket = await axiosApi.post(
        "/complaintreg",
        postRegisterData
      );
      const { message, success } = registerTicket.data;

      if (success === 1) {
        ShowToastMessage("successToast", "Success", message);
        resetState();
        dispatch(getCmpSlno());
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
        setIsLoading(false);
      } else {
        ShowToastMessage("errorToast", "Error", message);
        setIsLoading(false);
      }
    } catch (error) {
      ShowToastMessage(
        "errorToast",
        "Error",
        error.message || "Error in ticket registration"
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      resetState();
    };
  }, [dispatch]);

  return (
    <KeyboardAvoidingView
      enabled
      behavior="height"
      keyboardVerticalOffset={0}
      style={{ flex: 1, backgroundColor: theme.colors.appBgInside || "#fff" }}
    >
      <HeaderForm name={"Ticket Registration"} />
      {isLoading && <CustomActivityIndicator />}
      <ScrollView
        style={styles(theme).scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles(theme).formContainer}>
          {/* Complaint department Selection */}
          <Text style={styles(theme).headerText}>
            Confirm the ticket department
          </Text>
          <CompDeptSelection />
          {cmpDept && (
            <View style={{ rowGap: 5 }}>
              <Text style={styles(theme).headerText}>
                Confirm the ticket Type
              </Text>
              <ComTypeSelection selectedComplaintDepartment={cmpDept} />
            </View>
          )}
          <Text style={styles(theme).headerText}>
            Confirm the Department Section
          </Text>
          <DepartmentSection />
          <Text style={styles(theme).headerText}>
            Confirm the Location / Rooms
          </Text>
          <DepartmentLocation />
          <View style={styles(theme).orContainer}>
            <View style={{ width: "100%", alignItems: "center" }}>
              <Text style={styles(theme).headerText}>OR</Text>
            </View>
            <View style={{ paddingHorizontal: 3 }}>
              <TextInput
                multiline={true}
                numberOfLines={1}
                value={secondaryLocation}
                onChangeText={(text) => setSecondaryLocation(text)}
                dense={true}
                textColor={theme.colors.logoCol2 || "#fff"}
                accessibilityLabel="Secondary Location"
              />
            </View>
          </View>
          <View>
            <Text style={styles(theme).headerText}>Ticket Description</Text>
            <TextInput
              // label="Ticket Description"
              multiline={true}
              numberOfLines={3}
              value={ticketDesc}
              onChangeText={(text) => setTicketDesc(text)}
              accessibilityLabel="Ticket Description"
            />
          </View>
          <View>
            <View style={styles(theme).prioritySwitchContainer}>
              <Text style={styles(theme).headerText}>
                Is this a Priority Ticket (Yes/No){" "}
              </Text>
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            </View>
            <View>
              {isSwitchOn && (
                <TextInput
                  label="Priority Remarks"
                  multiline={false}
                  numberOfLines={1}
                  value={ticketPriority}
                  onChangeText={(text) => setTicketPriority(text)}
                  accessibilityLabel="Priority Remarks"
                />
              )}
            </View>
          </View>
          <View>
            <CenteredButton
              hangleOnPress={handleSubmitFunction}
              label="Register Ticket"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    scrollViewContainer: {
      backgroundColor: theme.colors.statusBarCol || "#fff",
      padding: 13,
    },
    formContainer: {
      backgroundColor: theme.colors.appBgInside || "#fff",
      gap: 5,
    },
    prioritySwitchContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    headerText: {
      fontFamily: "Roboto_500Medium",
      fontWeight: "800",
      fontSize: 13,
      paddingHorizontal: 5,
      color: theme.colors.logoCol2 || "#fff",
    },
    orContainer: {
      flexDirection: "column",
      justifyContent: "center",
      // alignItems: "center",
      gap: 5,
    },
  });

export default memo(NewTickets);
