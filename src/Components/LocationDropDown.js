import React, { memo, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { getLocation, getLocationList, updateLocationValue } from '../Redux/ReduxSlice/newTicketSlice';
import CustomActivityIndicator from './CustomActivityIndicator';

const LocationDropDown = () => {

    const dispatch = useDispatch()
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const state = useSelector(getLocationList)

    useEffect(() => {
        dispatch(getLocation())
    }, [])

    useEffect(() => {
        return () => {
            dispatch(updateLocationValue(0))
            setValue(null)
            console.log('destroy 1')
        }
    }, [dispatch])

    return (
        <View style={styles.container}>
            {
                state?.length === 0 && <CustomActivityIndicator />
            }
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={state}
                search
                mode='modal'
                maxHeight={300}
                labelField="sec_name"
                valueField="sec_id"
                placeholder={!isFocus ? 'Select Location' : 'Search'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.sec_id);
                    setIsFocus(false);
                    dispatch(updateLocationValue(item))
                }}
                renderLeftIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color={isFocus ? 'blue' : 'black'}
                        name="Safety"
                        size={20}
                    />
                )}
            />
        </View>
    )
}

export default memo(LocationDropDown)

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        // padding: 1,
    },
    dropdown: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});