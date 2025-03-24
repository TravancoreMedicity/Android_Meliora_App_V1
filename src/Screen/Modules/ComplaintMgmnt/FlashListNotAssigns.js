//import liraries
import React, { Component, memo, Suspense, lazy, useRef, useMemo, useCallback, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import HearderSecondary from '../../../Components/HearderSecondary';
import { bgColor, colorTheme, fontColor } from '../../../Constant/Colors';
import { XCircleIcon } from "react-native-heroicons/solid"

const FlashListNotAssignCmp = lazy(() => import('./Components/FlashListNotAssign'))
import { screenWidth, windowHeight, windowWidth } from '../../../utils/Dimentions'
import OverLayLoading from './Components/OverLayLoading';
import { getNotAssignedList } from '../../../Redux/ReduxSlice/ticketMagmntSlice';
import ApiGetFun from './func/ApiGetFun';

// create a component
const FlashListNotAssigns = ({ navigation }) => {

    const [refresh, setRefresh] = useState(false);
    const [count, setCount] = useState(0);
    const [loding, setLoading] = useState(true)

    const notAssignedList = useSelector(getNotAssignedList)

    return (
        <SafeAreaView style={{ backgroundColor: colorTheme.mainBgColor }} >
            <ApiGetFun count={count} />
            {loding && <OverLayLoading />}
            {/* Header  */}
            <HearderSecondary
                navigation={navigation}
                name="All not assigned tickets"
                goBackButton={false}
            />
            <View style={{ display: 'flex' }} >
                <View style={{
                    height: (windowHeight * 90 / 100),
                    width: screenWidth
                }} >
                    <Suspense fallback={<ActivityIndicator />} >
                        <FlashListNotAssignCmp
                            notAssigned={notAssignedList}
                            setCount={setCount}
                            refresh={refresh}
                            count={count}
                            setLoading={setLoading}
                        />
                    </Suspense>
                </View>
            </View>
            <View style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colorTheme.mainBgColor,
                // minHeight: (windowHeight * 5 / 100)
            }} >
                <Text style={{
                    fontFamily: 'Roboto_500Medium',
                    fontSize: windowWidth > 400 ? 14 : 12,
                    paddingHorizontal: 5,
                    overflow: 'hidden',
                    color: colorTheme.mainColor,
                    fontFamily: 'Roboto_100Thin',
                    fontSize: 10,
                }} >Pull Down To Refresh</Text>
            </View>
        </SafeAreaView>
    );
};


//make this component available to the app
export default memo(FlashListNotAssigns);
