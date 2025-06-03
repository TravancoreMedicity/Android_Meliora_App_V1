//import liraries
import React, { lazy, Suspense } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomActivityIndicator from "../Components/CustomActivityIndicator";

const TabNavigator = lazy(() => import("./TabNavigator"));
const ComplaintRegister = lazy(() =>
  import("../Screen/Modules/ComplaintMgmnt/ComplaintRegister")
);
const FlashListAssign = lazy(() =>
  import("../Screen/Modules/ComplaintMgmnt/FlashListAssign")
);
const FlashListAssistance = lazy(() =>
  import("../Screen/Modules/ComplaintMgmnt/FlashListAssistance")
);
const FlashListOnHold = lazy(() =>
  import("../Screen/Modules/ComplaintMgmnt/FlashListOnHold")
);
const FlashListVerify = lazy(() =>
  import("../Screen/Modules/ComplaintMgmnt/FlashListVerify")
);
const FlashListCompleted = lazy(() =>
  import("../Screen/Modules/ComplaintMgmnt/FlashListCompleted")
);
const Profile = lazy(() => import("../Screen/Profile/Profile"));
const FalshlistNotAssign = lazy(() =>
  import("../Screen/Modules/ComplaintMgmnt/FlashListNotAssigns")
);

const SuperVerify = lazy(() =>
  import("../Screen/Modules/ComplaintMgmnt/FlashListSuperVerify")
);

const SuperVerifyComponent = lazy(() =>
  import(
    "../Screen/Modules/ComplaintMgmnt/Components/Version1/SuperVerifyedComp"
  )
);

// create a component
const HomeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: "pop",
      }}
    >
      <Stack.Screen name="HomeStack" component={TabNavigator} />
      <Stack.Screen name="ComplaintRegister" component={ComplaintRegister} />
      <Stack.Screen name="AssignList" component={FlashListAssign} />
      <Stack.Screen name="Assistance" component={FlashListAssistance} />
      <Stack.Screen name="OnHold" component={FlashListOnHold} />
      <Stack.Screen name="Verify" component={FlashListVerify} />
      <Stack.Screen name="Completed" component={FlashListCompleted} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="notAssign" component={FalshlistNotAssign} />
      <Stack.Screen name="SuperVerify" component={SuperVerify} />
      <Stack.Screen
        name="SuperVerifyComponent"
        component={SuperVerifyComponent}
      />
    </Stack.Navigator>
  );
};

//make this component available to the app
export default HomeStack;
