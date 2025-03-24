//import liraries
import React, { memo, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { colorTheme, fontColor } from '../../../Constant/Colors';
import { windowHeight } from '../../../utils/Dimentions';
import { MegaphoneIcon } from 'react-native-heroicons/outline'
// create a component
const DashCountTile = ({ navigation, name, count, id, escalated }) => {
    //dashboard api call count    
    const dashCountUpdation = useCallback(() => {
        if (id === 2) {
            navigation.navigate('AssignList')
        } else if (id === 3) {
            navigation.navigate('Assistance')
        } else if (id === 4) {
            navigation.navigate('OnHold')
        } else if (id === 5) {
            navigation.navigate('Verify')
        } else if (id === 6) {
            navigation.navigate('Completed')
        } else if (id === 1) {
            navigation.navigate('notAssign')
        }
    }, [navigation])

    return (
        <View className='overflow-hidden' >
            <TouchableNativeFeedback
                onPress={() => dashCountUpdation()}
                useForeground={true}
                style={{ backgroundColor: colorTheme.mainColor }}
            >
                <View style={styles.mainTile} className="flex-col overflow-hidden" >
                    <View className='flex flex-1 p-2 pb-0 flex-row overflow-hidden'  >
                        <View className='flex-1 basis-1/3 ' >
                            <Text
                                className='text-white'
                                style={{ fontFamily: 'Roboto_500Medium' }}
                            >{name}</Text>
                        </View>
                        <View className='flex justify-center items-center ' >
                            <Text
                                className='flex text-4xl text-white'
                            >{count}</Text>
                        </View>
                    </View>
                    <View className='flex flex-row h-7 pb-2 pl-2 items-center content-center overflow-hidden'>
                        <MegaphoneIcon className='flex self-baseline' color={colorTheme.iconColor} height={15} width={15} />
                        <Text className='flex pl-1'
                            style={{ fontFamily: 'Roboto_300Light', color: colorTheme.iconColor }} >Escalated</Text>
                        <Text className='flex pl-3 font-bold'
                            style={{ fontFamily: 'Roboto_300Light', color: colorTheme.iconColor }} >{escalated}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    mainTile: {
        flex: 1,
        height: (windowHeight * 12 / 100),
        minWidth: (windowHeight * 23 / 100),
        maxWidth: (windowHeight * 23 / 100),
        borderWidth: 0.1,
        borderRadius: 18,
        borderColor: colorTheme.mainColor,
        // overflow: 'hidden',
        backgroundColor: colorTheme.mainColor,
        elevation: 3,
        shadowOpacity: 0,
        shadowRadius: 30,
        marginBottom: 10,
        marginHorizontal: 3,
    },
    innerCountTile: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCountTileFont: {
        fontFamily: 'Roboto_100Thin',
        fontSize: 30,
        color: 'white'
    },
    innerTextTile: {
        flex: 3,
        paddingHorizontal: 6,
        backgroundColor: colorTheme.deptColor5,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomEndRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3
    },
    innerTextTileFont: {
        fontFamily: 'Roboto_700Bold',
        fontSize: 10,
        color: fontColor.mainBlue,
    },

});

//make this component available to the app
export default memo(DashCountTile);
