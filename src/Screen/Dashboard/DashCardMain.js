//import liraries
import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { bgColor, fontColor } from '../../Constant/Colors';
import { Avatar, Card } from "react-native-paper";

// create a component
const DashCardMain = ({ Icon, mainTitle, subTitle, mainCount, subCount }) => {
    const today = new Date().toLocaleDateString("en-US")

    return (
        <View style={styles.container}>
            <View style={{
                borderRadius: 30,
                overflow: "hidden"
            }} >
                <TouchableNativeFeedback
                    onPress={() => { }}
                    background={TouchableNativeFeedback.Ripple('#B3C5FF', false)}
                    style={{
                        overflow: 'hidden',
                        borderRadius: 30
                    }}
                >
                    <Card mode="elevated" style={styles.card}  >
                        <Card.Content style={styles.cardContent} >
                            <View style={styles.mainTile} >
                                <View style={styles.iconTile} >
                                    <Text>
                                        <Avatar.Icon size={50} icon={Icon} style={{ backgroundColor: bgColor.statusbar }} />
                                    </Text>
                                </View>
                                <View style={styles.centerTile} >
                                    <Text style={{
                                        fontFamily: 'Roboto_500Medium',
                                        fontSize: 15
                                    }} >
                                        {mainTitle}
                                    </Text>
                                    <Text style={{
                                        fontFamily: 'Roboto_500Medium',
                                        fontSize: 12,
                                        color: fontColor.inActiveFont
                                    }} >
                                        {subTitle}
                                    </Text>
                                </View>
                                <View style={styles.rightTile} >
                                    <Text style={{
                                        fontFamily: 'Roboto_500Medium',
                                        fontSize: 18,
                                    }} >
                                        {mainCount}
                                    </Text>
                                    <Text style={{
                                        fontFamily: 'Roboto_500Medium',
                                        fontSize: 12,
                                        color: fontColor.inActiveFont
                                    }} >
                                        {subCount}
                                    </Text>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>
                </TouchableNativeFeedback>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: bgColor.mainBgColor,
        flex: 1,
        // borderRadius: 3
    },
    card: {
        backgroundColor: bgColor.cardBg,
        marginVertical: 5,
        marginHorizontal: 7,
        minHeight: 30,
        // borderRadius: 20
    },
    cardContent: {

    },
    mainTile: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'lightgreen',
        minHeight: 20
    },
    iconTile: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'lightyellow',
        minHeight: 20
    },
    centerTile: {
        flex: 3,
        minHeight: 30,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: "green"
    },
    rightTile: {
        flex: 1,
        minHeight: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

//make this component available to the app
export default DashCardMain;
