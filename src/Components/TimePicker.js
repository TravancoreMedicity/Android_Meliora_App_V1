import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { memo, useState } from 'react'
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Button } from 'react-native';
import { CalendarDaysIcon, ClockIcon } from 'react-native-heroicons/outline'
import moment from 'moment';
import { colorTheme } from '../Constant/Colors';
import { useDispatch } from 'react-redux';
import { setTimePicker } from '../Redux/ReduxSlice/DateTimePickerSlice';

const TimePicker = () => {
    const dispatch = useDispatch()
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        const selectDate = moment(selectedDate).format('DD-MM-yyyy HH:mm:ss A');
        setShow(false);
        setDate(currentDate);
        dispatch(setTimePicker(selectDate))
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const colorScheme = useColorScheme()

    return (
        <View >
            <View className='flex flex-row rounded-md p-1 mb-5' style={{ borderWidth: 0.5, borderColor: 'grey' }} >
                <Pressable className='pr-1' onPress={showTimepicker} >
                    <ClockIcon width={30} height={30} color={colorTheme.switchThumb} />
                </Pressable>
                <View className='flex flex-1 justify-center items-center justify-items-center ' >
                    <Text style={{ fontFamily: 'Roboto_400Regular', fontSize: 17, }} >{moment(date).format('HH:mm:ss A')}</Text>
                </View>
            </View>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                    display={colorScheme === 'dark' ? 'spinner' : 'default'}
                    positiveButton={{ label: 'OK', textColor: colorScheme === 'dark' ? 'white' : 'black', backgroundColor: 'green', color: colorScheme === 'dark' ? 'white' : 'black' }}
                    neutralButton={{ label: 'Clear', textColor: colorScheme === 'dark' ? 'white' : 'black', backgroundColor: 'green', color: colorScheme === 'dark' ? 'white' : 'black' }}
                    minuteInterval={1}
                />
            )}
        </View>
    )
}

export default memo(TimePicker) 