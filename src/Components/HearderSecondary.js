//import liraries
import React, { memo } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
} from "react-native";
import { colorTheme } from "../Constant/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { windowHeight, windowWidth } from "../utils/Dimentions";
import { HomeIcon, ArrowUturnLeftIcon } from "react-native-heroicons/outline"
// create a component
const HearderSecondary = ({ navigation, name, goBackButton }) => {
    return (
        <View>
            <StatusBar
                animated={false}
                backgroundColor={colorTheme.mainBgColor}
                barStyle="dark-content"
            />
            <View style={styles.headerStyleCmp}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <MaterialIcons name="reorder" size={25} color={colorTheme.mainColor} />
                </TouchableOpacity>
                <View style={{
                    display: 'flex',
                    flex: 1,
                    paddingLeft: 10,
                    flexDirection: 'row'
                }} >
                    {/* <Text>Login as : </Text> */}
                    <Text style={styles.userName}>{name}</Text>
                </View>
                {
                    goBackButton === true ?
                        <TouchableOpacity onPress={() => navigation.navigate('HomeStack')}>
                            <HomeIcon size={25} color={colorTheme.mainColor} />
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <ArrowUturnLeftIcon size={25} color={colorTheme.mainColor} />
                        </TouchableOpacity>
                }
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    imageBgCmp: {
        height: 35,
        width: 35,
    },
    headerStyleCmp: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: (windowHeight * 8 / 100),
        backgroundColor: colorTheme.mainBgColor,
        padding: 15,
        alignItems: "center",
    },
    userName: {
        fontSize: windowWidth < 400 ? 15 : 20,
        fontFamily: "Roboto_500Medium",
        color: colorTheme.mainColor,
        textTransform: 'capitalize'
    },
});

//make this component available to the app
export default memo(HearderSecondary);
