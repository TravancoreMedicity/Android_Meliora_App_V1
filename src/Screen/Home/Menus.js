//import liraries
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableNativeFeedback } from 'react-native';
import { fontColor } from '../../Constant/Colors';
import { windowHeight } from '../../utils/Dimentions';

// create a component
const Menus = ({ item, navigation }) => {
    return (
        <View style={styles.mainContainer} >
            <TouchableNativeFeedback
                onPress={() => navigation.navigate('ComplaintRegister')}
            >
                <View style={styles.container} >
                    <View style={styles.secondaryCard} >
                        <View style={styles.iconBox} >
                            <Image source={item.location} />
                        </View>
                        <View style={styles.textBox} >
                            <Text style={styles.textStyle} >{item.title}</Text>
                        </View>
                    </View>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 2,
        overflow: 'hidden',
        borderTopEndRadius: 50,
        borderTopStartRadius: 25,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 25
    },
    container: {
        flex: 1,
        minWidth: 90,
        minHeight: 90,
        backgroundColor: '#0094BE',
        margin: 5,
        padding: 5,
        // overflow: 'hidden',
        // shadowRadius: 20,
        shadowColor: fontColor.inActiveFont,
        elevation: 10,
        // borderRadius: 20,
        borderTopEndRadius: 30,
        borderTopStartRadius: 10,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 10
    },
    secondaryCard: {
        flex: 1,
        // backgroundColor: 'green',
    },
    iconBox: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    iconStyle: {},
    textBox: {
        flex: 1,
        // backgroundColor: 'lightblue',
        minHeight: windowHeight < 400 ? 10 : 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        // fontFamily: "Roboto_300Light",
        fontSize: 10,
        fontWeight: '400',
        color: fontColor.main
    }
});

//make this component available to the app
export default Menus;
