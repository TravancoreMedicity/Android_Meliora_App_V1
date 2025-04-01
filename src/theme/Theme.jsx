import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import {
  PaperProvider,
  MD3DarkTheme,
  Button,
  MD3LightTheme,
  adaptNavigationTheme,
  useTheme,
  Switch,
} from "react-native-paper";

const { DarkTheme: PaperDarkTheme, LightTheme: PaperLightTheme } =
  adaptNavigationTheme({
    reactNavigationDark: DarkTheme,
    reactNavigationLight: DefaultTheme,
  });

const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...PaperDarkTheme.colors,
    logoCol1: "rgb(217,75,155)",
    logoCol2: "rgb(124,81,161)",
    logoCol3: "rgb(0,125,197)",
    logoCol4: "rgb(83,183,232)",
    logoCol5: "rgb(0,0,0)",
    statusBarCol: "#1b1b1d",
    appBgInside: "#1b1b1d",
    mainScreenColor: "#f0f1f5",
    fontColor1: "#a0a0a0",
    avatarBgColor1: "#aaa",
    avatarIconColor: "rgb(124,81,161)",
    whiteFontColor: "#fff",
    cardBgColor: "rgb(178, 146, 202)",
  },
};

const CombinedLightTheme = {
  ...MD3LightTheme,
  ...PaperLightTheme,
  colors: {
    ...PaperLightTheme.colors,
    ...MD3LightTheme.colors,
    logoCol1: "rgb(217,75,155)",
    logoCol2: "rgb(124,81,161)",
    logoCol3: "rgb(0,125,197)",
    logoCol4: "rgb(83,183,232)",
    logoCol5: "rgb(0,0,0)",
    statusBarCol: "#f0f1f5",
    appBgInside: "#f0f1f5",
    mainScreenColor: "#f0f1f5",
    fontColor1: "#454762",
    avatarBgColor1: "rgba(124, 81, 161, 0.8)",
    avatarIconColor: "#fff",
    whiteFontColor: "#fff",
    cardBgColor: "rgb(178, 146, 202)",
  },
};

export { CombinedDarkTheme, CombinedLightTheme };
