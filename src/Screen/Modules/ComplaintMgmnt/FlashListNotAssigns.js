//import liraries
import { memo, Suspense, lazy, useState } from "react";
import { View, SafeAreaView, useWindowDimensions } from "react-native";
import { useSelector } from "react-redux";
import HearderSecondary from "../../../Components/HearderSecondary";

const FlashListNotAssignCmp = lazy(() =>
  import("./Components/FlashListNotAssign")
);
import CustomActivityIndicator from "../../../Components/CustomActivityIndicator";
import { useTheme } from "react-native-paper";
import { UseGetPendingTicket } from "../../../api/TicketsUtilities";
import { getLogiEmpDEPT } from "../../../Redux/ReduxSlice/LoginSLice";

// create a component
const FlashListNotAssigns = ({ navigation }) => {
  const theme = useTheme();

  const { width, height } = useWindowDimensions();
  const deptID = useSelector((state) => getLogiEmpDEPT(state));

  const { data, isError, isLoading, isSuccess } = UseGetPendingTicket(deptID);
  const headerHeight = height > 790 ? 100 : 75;
  const headerHeightWithStatusBar = height - headerHeight;

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.appBgInside }}>
      {/* <ApiGetFun count={count} /> */}

      {/* Header Start */}
      <HearderSecondary navigation={navigation} name="Pending Tickets" />
      {/* Header End */}
      <View
        style={{
          height: headerHeightWithStatusBar,
          width: width,
          paddingHorizontal: 15,
        }}
      >
        <Suspense fallback={<CustomActivityIndicator />}>
          <FlashListNotAssignCmp
            notAssigned={isLoading ? [] : data?.data ?? []}
          />
        </Suspense>
      </View>
    </SafeAreaView>
  );
};

//make this component available to the app
export default memo(FlashListNotAssigns);
