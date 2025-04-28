import { View, Text } from "react-native";
import React, { memo, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import { getLogiEmpDEPT } from "../../../../../Redux/ReduxSlice/LoginSLice";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  UseGetEmployeeList,
  UseGetPriorityList,
} from "../../../../../api/TicketsUtilities";
import { useTheme } from "react-native-paper";
import { id } from "date-fns/locale";

const TicketPrioritySelection = ({
  priorityVal,
  setPriorityVal,
  setPriorityObj,
}) => {
  const theme = useTheme();
  const empDepartment = useSelector((state) => getLogiEmpDEPT(state));

  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [selectedLanguageObject, setSelectedLanguageObject] = useState({});

  const { data, isError, isLoading, isSuccess } = UseGetPriorityList();
  // console.log(data);

  let priorityList = data?.data?.map((e) => {
    return {
      id: e.cm_priority_slno,
      lebel: e.cm_priority_desc,
      maxMinists: e.escalation_max,
    };
  });
  //   return null;

  // console.log(selectedLanguageObject);

  return (
    <View>
      <SectionedMultiSelect
        IconRenderer={MaterialIcons}
        uniqueKey="id"
        displayKey="lebel"
        items={isLoading ? [] : priorityList}
        onSelectedItemsChange={setPriorityVal}
        onSelectedItemObjectsChange={setPriorityObj}
        selectedItems={priorityVal}
        selectText="Ticket Priority"
        autoFocus
        // subKey="children"
        showDropDowns={false}
        single={true}
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

export default memo(TicketPrioritySelection);
