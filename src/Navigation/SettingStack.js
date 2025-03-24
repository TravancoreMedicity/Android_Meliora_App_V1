//import liraries
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Settings from "../Screen/Settings/Settings";

// create a component
const SettingStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeStack" component={Settings} />
        </Stack.Navigator>
    );
};

//make this component available to the app
export default SettingStack;
