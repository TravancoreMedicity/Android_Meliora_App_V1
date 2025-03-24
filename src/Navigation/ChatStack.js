//import liraries
import React, { memo } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChatMain from "../Screen/Chat/ChatMain";

// create a component
const ChatStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Chat" component={ChatMain} />
        </Stack.Navigator>
    );
};

//make this component available to the app
export default memo(ChatStack);
