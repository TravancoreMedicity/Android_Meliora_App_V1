//import liraries
import React, { memo, useState } from 'react';
import { View, Text } from 'react-native';
import Checkbox from 'expo-checkbox';

// create a component
const CheckedBox = ({ data, ObjVal, setObj }) => {

    const [checked, setChecked] = useState(false)
    const handleCHanged = (e, value) => {
        let Obj = { em_id: value, status: e }
        setChecked(!checked)
        setObj({ ...ObjVal, [data.assigned_emp]: e })
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }} >
            <Checkbox
                disabled={false}
                value={checked}
                onValueChange={(e) => handleCHanged(e, data.assigned_emp)}
                style={{ marginHorizontal: 10 }}
            />
            <Text>{data.em_name}</Text>
        </View>
    );
};

//make this component available to the app
export default memo(CheckedBox);
