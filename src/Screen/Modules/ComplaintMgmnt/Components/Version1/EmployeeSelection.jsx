import { View, Text } from "react-native";
import React, { memo, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import { getLogiEmpDEPT } from "../../../../../Redux/ReduxSlice/LoginSLice";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { UseGetEmployeeList } from "../../../../../api/TicketsUtilities";
import { useTheme } from "react-native-paper";

const EmployeeSelection = ({ selectedEmpArray, handleSelectedEmpArray }) => {
  const theme = useTheme();
  const empDepartment = useSelector((state) => getLogiEmpDEPT(state));

  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [selectedLanguageObject, setSelectedLanguageObject] = useState({});

  const postdata = {
    em_department: empDepartment,
  };

  const { data, isError, isLoading, isSuccess } = UseGetEmployeeList(postdata);

  // console.log(selectedLanguage);

  // const handleSelectedEmpArray = (emp) => {
  //   // console.log(emp);
  //   setSelectedLanguage(emp);
  //   // selectedEmpArray(selectedLanguage);
  // };

  return (
    <View>
      <SectionedMultiSelect
        IconRenderer={MaterialIcons}
        uniqueKey="em_id"
        displayKey="em_name"
        items={isLoading ? [] : data?.data}
        onSelectedItemsChange={handleSelectedEmpArray}
        onSelectedItemObjectsChange={setSelectedLanguageObject}
        selectedItems={selectedEmpArray}
        selectText="Select Employees"
        autoFocus
        // subKey="children"
        showDropDowns={false}
        single={false}
        showCancelButton
        alwaysShowSelectText={false}
        // selectChildren
        highlightChildren={true}
        showRemoveAll
        headerComponent={() => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 30,
            }}
          >
            <Text
              style={{
                color: theme.colors.logoCol2,
                fontFamily: "Roboto_500Medium",
                fontWeight: "800",
              }}
            >
              Responsible Persons
            </Text>
          </View>
        )}
        loadingComponent={() => (
          <View>
            <Text>Loading</Text>
          </View>
        )}
        loading={isLoading}
        confirmText="Click to Confim"
        // cancelText="sdfdsfddddd"
        cancelIconComponent={() => (
          <View>
            <MaterialIcons name="arrow-back" size={23} />
          </View>
        )}
        searchPlaceholderText="Search here"
        styles={{
          container: {
            borderRadius: 25,
          },
          chipText: {
            color: theme.colors.logoCol2,
            fontSize: 12,
            fontFamily: "Roboto_500Medium",
            fontWeight: "800",
          },
          searchBar: {
            backgroundColor: `rgba(0,0,0,0.1)`,
            borderRadius: 25,
            margin: 2,
            marginVertical: 7,
            marginHorizontal: 7,
            marginTop: 7,
          },
          itemText: {
            color: theme.colors.fontColor1,
            fontSize: 14.5,
            fontFamily: "Roboto_500Medium",
            fontWeight: "800",
            textTransform: "capitalize",
          },
          button: {
            backgroundColor: theme.colors.logoCol2,
            borderRadius: 25,
            margin: 2,
            marginVertical: 7,
            marginTop: 7,
          },
          chipIcon: {
            color: theme.colors.logoCol2,
          },
          cancelButton: {
            backgroundColor: theme.colors.logoCol1,
            borderRadius: 25,
            margin: 1,
            marginVertical: 7,
            marginHorizontal: 7,
            marginTop: 7,
          },
          toggleIcon: {
            color: theme.colors.logoCol1,
          },
          selectedItemText: {
            color: theme.colors.logoCol2,
            fontSize: 14.5,
            fontFamily: "Roboto_500Medium",
            fontWeight: "800",
            textTransform: "capitalize",
          },
          subItemText: {
            color: "lightgrey",
          },
          item: {
            paddingHorizontal: 15,
          },
          subItem: {
            paddingHorizontal: 40,
          },
          selectedItem: {
            backgroundColor: "rgba(0,0,0,0.1)",
          },
          selectedSubItem: {
            backgroundColor: "rgba(0,0,0,0.1)",
          },
          selectToggle: {
            flex: 1,
            backgroundColor: "lightgrey",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25,
            margin: 2,
            marginVertical: 7,
            // marginHorizontal: 7,
            marginTop: 7,
            padding: 5,
          },
          selectToggleText: {
            color: theme.colors.logoCol2,
            fontSize: 14.5,
            fontFamily: "Roboto_500Medium",
            fontWeight: "800",
            textTransform: "capitalize",
            textAlign: "center",
            textAlignVertical: "center",
          },
          scrollView: { paddingHorizontal: 0 },
        }}
        colors={{
          success: theme.colors.logoCol1,
          chipColor: theme.colors.logoCol2,
          cancel: theme.colors.logoCol1,
        }}
      />
    </View>
  );
};

export default memo(EmployeeSelection);
