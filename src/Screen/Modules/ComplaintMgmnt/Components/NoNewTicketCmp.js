//import liraries
import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { windowHeight } from '../../../../utils/Dimentions';

// create a component
const NoNewTicketCmp = ({ legth }) => {
    return (
        <View style={{
            height: windowHeight >= 1200 ? windowHeight - 280 : windowHeight - 220,
            alignItems: 'center',
            justifyContent: 'center'
        }} >
            <ActivityIndicator color='pink' />
            {
                legth === 0 && <Text>No new Tickets</Text>
            }
        </View>
    );
};

//make this component available to the app
export default memo(NoNewTicketCmp);
