import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { memo, useState } from "react";
import DateTimePicker, { useDefaultStyles } from "react-native-ui-datepicker";
import { format } from "date-fns";
import { Dialog, Portal, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ioniccons from "react-native-vector-icons/Ionicons";

const CustomDateTimeSelector = () => {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const defaultStyles = useDefaultStyles();
  const [selected, setSelected] = useState(new Date());

  const selectedDate = format(selected, "yyyy-MM-dd hh:mm:ss");

  const [visibleDateModal, setvisibleDateModal] = useState(false);
  const onDissmissModal = () => {
    setvisibleDateModal(!visibleDateModal);
  };

  return (
    <View>
      {/* <Text>CustomDateTimeSelector</Text> */}
      <View
        style={{
          backgroundColor: "lightgrey",
          height: 35,
          borderWidth: 2,
          borderRadius: 20,
          marginHorizontal: 3,
          borderColor: theme.colors.logoCol2,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          overflow: "hidden",
        }}
      >
        <View
          style={{
            flex: 1,
            height: "100%",
            borderRightWidth: 2,
            borderColor: theme.colors.logoCol2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto_500Medium",
              fontWeight: "800",
              color: theme.colors.logoCol2,
            }}
          >
            {selectedDate}
          </Text>
        </View>
        <TouchableOpacity onPress={onDissmissModal}>
          <View
            style={{
              width: 45,
              height: "100%",
              paddingLeft: 8,
              justifyContent: "center",
            }}
          >
            <Ioniccons
              name="calendar-outline"
              size={23}
              color={theme.colors.logoCol2}
            />
          </View>
        </TouchableOpacity>
      </View>
      {/* Modal portal for date selection start  */}
      <Portal>
        <Dialog visible={visibleDateModal} onDismiss={() => {}}>
          <DateTimePicker
            mode="single"
            timePicker
            // timeZone="asia/kolkata"
            calendar="gregory"
            use12Hours
            date={selected}
            containerHeight={width > 360 ? 300 : 250}
            style={{
              paddingHorizontal: 10,
              //   backgroundColor: "green",
            }}
            onChange={({ date }) => setSelected(date)}
            styles={{
              ...defaultStyles,
              today: {
                borderColor: theme.colors.logoCol1,
                borderWidth: 3,
                borderRadius: 12,
              },
              selected: {
                backgroundColor: theme.colors.logoCol1,
                borderColor: theme.colors.logoCol1,
                borderWidth: 3,
                borderRadius: 12,
              },
              selected_label: { color: "white" },
              //   time_selector: { backgroundColor: theme.colors.logoCol1 },
            }}
            showOutsideDays={false}
            navigationPosition="around"
            // containerHeight={300}
            // weekdaysHeight={40}
            // weekdaysFormat="min"
            // monthCaptionFormat="short"
          />
          <View
            style={{
              paddingBottom: 10,
              paddingRight: 15,
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity
              style={{
                borderColor: theme.colors.logoCol1,
                borderWidth: 2,
                height: 30,
                width: "auto",
                borderRadius: 50,
                paddingHorizontal: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={onDissmissModal}
            >
              <MaterialCommunityIcons
                name="check-all"
                size={23}
                color={theme.colors.logoCol1}
              />
            </TouchableOpacity>
          </View>
        </Dialog>
      </Portal>
      {/* Modal portal for date selection start  */}
    </View>
  );
};

export default memo(CustomDateTimeSelector);
