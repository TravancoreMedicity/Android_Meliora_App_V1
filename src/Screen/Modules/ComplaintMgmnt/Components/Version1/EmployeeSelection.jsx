import { View, Text } from "react-native";
import React, { memo, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import { getLogiEmpDEPT } from "../../../../../Redux/ReduxSlice/LoginSLice";

const EmployeeSelection = () => {
  const empDepartment = useSelector((state) => getLogiEmpDEPT(state));

  const [selectedLanguage, setSelectedLanguage] = useState();

  const postdata = {
    em_department: empDepartment,
  };

  return (
    <View>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
        selectionColor={"blue"}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </View>
  );
};

export default memo(EmployeeSelection);
