//import liraries
import React, { memo, useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Switch } from 'react-native-paper';

// create a component
const CusSwitchCmp = ({ data, handleChange }) => {
    const [switchOn, setSwitchOn] = useState(false)
    const { id, name } = data;

    return (
        <View style={styles.viewStyle} >
            <Text variant='labelLarge' style={styles.textStyle} >{name}</Text>
            <Switch
                value={switchOn}
                onChange={useCallback(() => handleChange(!switchOn, id))} style={styles.switchSytle}
                onValueChange={useCallback(() => setSwitchOn(!switchOn))}
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    viewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textStyle: {
        flex: 2,
        textAlign: 'left',
        textAlignVertical: 'center',
    },
    switchSytle: {
        flex: 1
    }
});

//make this component available to the app
export default memo(CusSwitchCmp);
