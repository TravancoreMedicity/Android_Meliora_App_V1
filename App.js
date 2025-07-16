//import liraries
import "./global.css";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { store } from "./src/Redux/Store";
import AppNav from "./src/Navigation/AppNav";
import { View, Text } from "react-native";
import ToastManager from "toastify-react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const quieryClient = new QueryClient();

// create a component
const App = () => {
  return (
    <QueryClientProvider client={quieryClient}>
      <SafeAreaProvider>
        <Provider store={store}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <ToastManager />
            <AppNav />
          </GestureHandlerRootView>
        </Provider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

//make this component available to the app
export default App;
