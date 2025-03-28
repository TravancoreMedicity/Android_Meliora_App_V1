
import { DarkTheme,DefaultTheme } from "@react-navigation/native";
import { PaperProvider , MD3DarkTheme ,Button ,MD3LightTheme,adaptNavigationTheme , useTheme, Switch} from 'react-native-paper'



const { DarkTheme: PaperDarkTheme, LightTheme: PaperLightTheme } = adaptNavigationTheme({
    reactNavigationDark: DarkTheme,
    reactNavigationLight: DefaultTheme,
  });


const CombinedDarkTheme = {
    ...MD3DarkTheme,
    ...PaperDarkTheme,
    colors : {
      ...MD3DarkTheme.colors,
    ...PaperDarkTheme.colors,
      logoCol1 : "rgb(217,75,155)",
      logoCol2 : "rgb(124,81,161)",
      logoCol3 : "rgb(0,125,197)",
      logoCol4 : "rgb(83,183,232)",
      logoCol5 : "rgb(0,0,0)",
      statusBarCol : "#616161"
    },
};

const CombinedLightTheme = {
    ...MD3LightTheme,
    ...PaperLightTheme,
    colors : {
        ...PaperLightTheme.colors,
        ...MD3LightTheme.colors,
        logoCol1 : "rgb(217,75,155)",
        logoCol2 : "rgb(124,81,161)",
        logoCol3 : "rgb(0,125,197)",
        logoCol4 : "rgb(83,183,232)",
        logoCol5 : "rgb(0,0,0)",
        statusBarCol : "rgba(0,125,197,0.1)"
    },
  };



export {CombinedDarkTheme,CombinedLightTheme}