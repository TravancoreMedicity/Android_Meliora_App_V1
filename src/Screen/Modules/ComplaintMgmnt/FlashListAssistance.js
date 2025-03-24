//import liraries
import React, { lazy, memo, Suspense, useMemo, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import HearderSecondary from '../../../Components/HearderSecondary';
import { bgColor, colorTheme } from '../../../Constant/Colors';
import { assistListUserWise } from '../../../Redux/ReduxSlice/ticketMagmntSlice';
import { windowHeight, windowWidth } from '../../../utils/Dimentions';
import { styles } from './Style/Style';
import OverLayLoading from './Components/OverLayLoading';

const FlashListCmp = lazy(() => import('./Components/FlashListCmp'));
const AssistanceCmp = lazy(() => import('./Components/AssistanceCmp'))

// create a component
const FlashListAssistance = ({ navigation }) => {

    const [count, setCount] = useState(0)
    const [refresh, setRefresh] = useState(false)
    const [loding, setLoading] = useState(true)

    const assitanceTicket = useSelector(assistListUserWise);
    const assitanceTickList = useMemo(() => assitanceTicket, [assitanceTicket]);

    return (
        <SafeAreaView style={{ height: windowHeight }} >
            {/* Header  */}
            <HearderSecondary
                navigation={navigation}
                name="Assitance Needed tickets"
                goBackButton={false}
            />
            <View style={{ ...styles.card }} >
                {loding && <OverLayLoading />}
                <View style={{
                    flex: 1,
                    maxWidth: windowWidth,
                    height: (windowHeight * 70 / 100)
                }} >
                    <Suspense fallback={<ActivityIndicator />} >
                        <FlashListCmp
                            FlashRenderCmp={AssistanceCmp}
                            Assigned={assitanceTickList}
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
        </SafeAreaView >
    );
};

//make this component available to the app
export default memo(FlashListAssistance);
