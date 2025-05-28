//import liraries
import React, {
  lazy,
  memo,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  View,
  Text,
  SafeAreaView,
  useWindowDimensions,
  KeyboardAvoidingView,
} from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import _ from "underscore";
import HearderSecondary from "../../../Components/HearderSecondary";
import { bgColor, colorTheme } from "../../../Constant/Colors";
import { getOnVerifyList } from "../../../Redux/ReduxSlice/ticketMagmntSlice";
import { windowHeight, windowWidth } from "../../../utils/Dimentions";
import { styles } from "./Style/Style";
import OverLayLoading from "./Components/OverLayLoading";
import { secondLevelList } from "../../../Redux/ReduxSlice/ticketMagmentDeptSlice";
import { getLogiEmployeeID } from "../../../Redux/ReduxSlice/LoginSLice";
import CustomActivityIndicator from "../../../Components/CustomActivityIndicator";
// import ForVerifyCmp from './Components/ForVerifyCmp';

const FlashListCmp = lazy(() => import("./Components/FlashListCmp"));
const ForVerifyCmp = lazy(() => import("./Components/ForVerifyCmp"));

// create a component
const FlashListVerify = ({ navigation }) => {
  const theme = useTheme();
  const { height } = useWindowDimensions();

  const [viewHeight, setViewHeight] = useState(height);

  useEffect(() => {
    //   Main view height
    if (height > 0) {
      const headerHeight = height > 790 ? 100 : 75;
      const headerHeightWithStatusBar = height - headerHeight;
      setViewHeight(headerHeightWithStatusBar);
    }
  }, []);

  // GET THE LOGGED EMP ID
  const emId = useSelector((state) => getLogiEmployeeID(state));

  const forVerifiedList = [];
  return (
    <KeyboardAvoidingView enabled behavior="height">
      <SafeAreaView style={{ backgroundColor: theme.colors.appBgInside }}>
        {/* Header  */}
        <HearderSecondary navigation={navigation} name="Rectified ticket" />
        {/* {loding && <OverLayLoading />} */}
        <View
          style={{
            height: viewHeight,
            paddingHorizontal: 15,
          }}
        >
          <Suspense fallback={<CustomActivityIndicator />}>
            <FlashListCmp
              FlashRenderCmp={ForVerifyCmp}
              Assigned={forVerifiedList}
            />
          </Suspense>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

//make this component available to the app
export default memo(FlashListVerify);
