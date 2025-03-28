//import liraries
import "./global.css"
import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from 'react-native-paper';

import { store } from "./src/Redux/Store";
import AppNav from "./src/Navigation/AppNav";
import { View ,Text} from "react-native";

// create a component
const App = () => {
  return (
    <Provider store={store}>
        <AppNav />
    </Provider>
  );
};

//make this component available to the app
export default App;
