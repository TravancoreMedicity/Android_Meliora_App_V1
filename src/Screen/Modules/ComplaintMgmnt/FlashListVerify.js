//import liraries
import React, { lazy, memo, Suspense, useMemo, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import HearderSecondary from '../../../Components/HearderSecondary';
import { bgColor, colorTheme } from '../../../Constant/Colors';
import { getOnVerifyList } from '../../../Redux/ReduxSlice/ticketMagmntSlice';
import { windowHeight, windowWidth } from '../../../utils/Dimentions';
import { styles } from './Style/Style';
import OverLayLoading from './Components/OverLayLoading';
import { secondLevelList } from '../../../Redux/ReduxSlice/ticketMagmentDeptSlice';
// import ForVerifyCmp from './Components/ForVerifyCmp';

const FlashListCmp = lazy(() => import('./Components/FlashListCmp'));
const ForVerifyCmp = lazy(() => import('./Components/ForVerifyCmp'))

// create a component
const FlashListVerify = ({ navigation }) => {
    const [count, setCount] = useState(0)
    const [refresh, setRefresh] = useState(false)
    const [loding, setLoading] = useState(true)

    const assignedListForVerify = useSelector(secondLevelList);
    const forVerifiedList = useMemo(() => assignedListForVerify, [assignedListForVerify]);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header  */}
            <HearderSecondary
                navigation={navigation}
                name="Second Level Verification"
                goBackButton={false}
            />
            <View style={styles.card} >
                {loding && <OverLayLoading />}
                <View style={{
                    flex: 1,
                    maxWidth: windowWidth,
                    height: (windowHeight * 70 / 100)
                }} >
                    <Suspense fallback={<ActivityIndicator />} >
                        <FlashListCmp
                            FlashRenderCmp={ForVerifyCmp}
                            Assigned={forVerifiedList}
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
        </SafeAreaView>
    );
};

//make this component available to the app
export default memo(FlashListVerify);
