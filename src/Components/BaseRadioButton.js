import React, { memo, useMemo } from "react";
import RadioGroup from "react-native-radio-buttons-group";

const BaseRadioButton = ({ data, selectedId, setSelectedId }) => {
  const radioButtonData = useMemo(() => data, [data]);
  // { id: 1, value: 1, label: 'test' } // Example data array format
  return (
    <RadioGroup
      radioButtons={radioButtonData}
      onPress={setSelectedId}
      selectedId={selectedId}
      //   layout="row"
      containerStyle={{
        color: "green",
      }}
      labelStyle={{
        color: "black",
      }}
    />
  );
};

export default memo(BaseRadioButton);
