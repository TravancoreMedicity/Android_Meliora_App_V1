//import liraries
import React, { memo, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { colorTheme } from '../../../../Constant/Colors';

// create a component
const OverLayLoading = () => {
    // const state = useSelector((state) => state.overLayLoadingStatus.payload, _.isEqual);
    // const newStatus = useMemo(() => state, [state]);
    return (
        <View style={styles.loading} className="bg-slate-300" >
            <ActivityIndicator color={colorTheme.SecondfontColor} size={40} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    loading: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#ecf0f1'
    }
});

//make this component available to the app
export default memo(OverLayLoading);
