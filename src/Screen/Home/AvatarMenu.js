//import liraries
import React, { memo, useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { windowWidth } from '../../utils/Dimentions';
import { Avatar, FAB } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { bgColor, colorTheme, fontColor } from '../../Constant/Colors';

// create a component
const AvatarMenu = ({ navigation, mainTitle, icon, iconColor, avatarColor, routeName }) => {
    const [dimention, setDimention] = useState({
        width: 82,
        height: 90
    })
    const [marginHorizontal, setMarginHorizontal] = useState(0);
    const [marginVertical, setMarginVertical] = useState(0);

    useEffect(() => {
        if (windowWidth > 480) {
            //for tablets
            setDimention({ width: 103, height: 100 })
            setMarginHorizontal(5)
            setMarginVertical(5)
        } else {
            //for phones
            setDimention({ width: ((windowWidth - 34) / 4), height: 84 })
            setMarginHorizontal(3)
            setMarginVertical(3)
        }

    }, [windowWidth])

    const navigateRoute = useCallback(() => {
        navigation.navigate(routeName);
    })

    return (
        <TouchableOpacity
            onPress={() => navigateRoute()}
        >
            <View style={{
                width: dimention.width,
                height: dimention.height,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: marginHorizontal,
                marginVertical: marginVertical,
            }} >
                <Avatar.Icon
                    size={windowWidth < 400 ? 50 : 60}
                    icon={() => <MaterialIcons
                        name={icon}
                        size={windowWidth < 400 ? 30 : 32}
                        color={iconColor}
                    // color="gray"
                    />}
                    style={{ backgroundColor: avatarColor }}
                    className="drop-shadow-2xl shadow-gray-700"
                />
                <View style={{
                    // backgroundColor: 'white'
                }} >
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }} className="drop-shadow-2xl shadow-lg ">
                        <Text style={styles.textStyle} >{mainTitle}</Text>
                        <Text style={styles.textStyle} >Management</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    textCardFont: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 15,
        margin: 5,
        color: fontColor.inActiveFont
    },
    menuContainer: {
        // flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 4,
        // backgroundColor: 'green'
        // minHeight: windowHeight,
        // maxHeight: windowHeight,
    },
    textStyle: {
        fontFamily: "Roboto_500Medium",
        fontSize: 10,
        fontWeight: '400',
        color: colorTheme.SecondfontColor
    },
});

//make this component available to the app
export default memo(AvatarMenu);
