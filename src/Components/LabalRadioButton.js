//import liraries
import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

// create a component
const LabalRadioButton = ({ label, value, setValue, status }) => {
    // const [checked, setChecked] = useState('first');
    return (
        <View style={styles.container}>
            <RadioButton
                value={value}
                status={status}
                onPress={() => setValue(value)}
            />
            <Text>{label}</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

//make this component available to the app
export default memo(LabalRadioButton);
