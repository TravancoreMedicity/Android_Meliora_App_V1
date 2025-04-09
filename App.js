//import liraries
import "./global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { store } from "./src/Redux/Store";
import AppNav from "./src/Navigation/AppNav";
import { View, Text } from "react-native";

const quieryClient = new QueryClient();

// create a component
const App = () => {
  return (
    <QueryClientProvider client={quieryClient}>
      <Provider store={store}>
        <GestureHandlerRootView>
          <AppNav />
        </GestureHandlerRootView>
      </Provider>
    </QueryClientProvider>
  );
};

//make this component available to the app
export default App;
