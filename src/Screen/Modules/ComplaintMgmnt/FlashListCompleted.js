//import liraries
import React, { memo, Suspense, useMemo, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import HearderSecondary from '../../../Components/HearderSecondary';
import { bgColor, colorTheme } from '../../../Constant/Colors';
import { getOnProgressList } from '../../../Redux/ReduxSlice/ticketMagmntSlice';
import { windowHeight, windowWidth } from '../../../utils/Dimentions';
// import AssignedListCmp from './Components/AssignedListCmp';
import FlashListCmp from './Components/FlashListCmp';
import { styles } from './Style/Style';
import OnProgressListCmp from './Components/OnProgressListCmp';
import OverLayLoading from './Components/OverLayLoading';

// create a component
const FlashListCompleted = ({ navigation }) => {
    /*****
     * THIS COMPONENT CHANGED FOR PROGRESS TICKETS
     * FROM COMPLETED TOICKETS LIST
     */
    const [count, setCount] = useState(0)
    const [refresh, setRefresh] = useState(false)
    const [loding, setLoading] = useState(true)

    const onProgressList = useSelector(getOnProgressList);
    const onProgressTicket = useMemo(() => onProgressList, [onProgressList])

    return (
        <SafeAreaView style={styles.container}>
            {/* Header  */}
            <HearderSecondary
                navigation={navigation}
                name="On Progress Tickets"
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
                            FlashRenderCmp={OnProgressListCmp}
                            Assigned={onProgressTicket}
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
    )
};

//make this component available to the app
export default memo(FlashListCompleted);
