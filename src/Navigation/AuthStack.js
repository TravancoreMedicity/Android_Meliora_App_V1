import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "../Screen/Main/MainScreen";
import HomeScreen from "../Screen/Home/HomeScreen";
import Login from "../Screen/Login/Login";

const Stack = createNativeStackNavigator();
// create a component
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

//make this component available to the app
export default AuthStack;
