import { View, Text } from "react-native";
import React, { memo, useEffect, useState } from "react";
import { RadioButton, useTheme } from "react-native-paper";
import { UseGetHoldReasons } from "../../../../../../api/TicketsUtilities";

const HoldReason = ({ value, setValue }) => {
  const theme = useTheme();
  //   const [value, setValue] = useState(1);

  const { data, isError, isLoading, isSuccess } = UseGetHoldReasons();
  const HoldReason = data?.data ?? [];

  useEffect(() => {
    return () => {
      setValue(0);
    };
  }, [setValue]);

  return (
    <RadioButton.Group onValueChange={(value) => setValue(value)} value={value}>
      <View style={{ paddingHorizontal: 70, gap: 4 }}>
        {HoldReason.length > 0 &&
          HoldReason?.map((item, index) => (
            <RadioButton.Item
              key={index}
              label={item.cm_hold_reason}
              value={item.cm_hold_id}
              position="leading"
              color={theme.colors.logoCol1}
              uncheckedColor={theme.colors.logoCol2}
              style={{
                height: 40,
                borderRadius: 10,
                borderWidth: 1.7,
                borderColor: theme.colors.logoCol2,
              }}
              labelStyle={{
                fontSize: 15.5,
                fontFamily: "Roboto_500Medium",
                color: theme.colors.logoCol2,
                textAlign: "auto",
                padding: 0,
              }}
            />
          ))}
      </View>
    </RadioButton.Group>
  );
};

export default memo(HoldReason);
