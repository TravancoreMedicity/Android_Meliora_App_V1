import React, { memo, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { selectCmpPriority, updatePriorityState } from '../Redux/ReduxSlice/ComplaintPrioritySlice';

const DropDownList = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const state = useSelector(selectCmpPriority)

    useEffect(() => {
        return () => {
            dispatch(updatePriorityState(0))
        }
    }, [dispatch])

    return (
        <View style={styles.container}>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={state}
                search
                maxHeight={300}
                labelField="cm_priority_desc"
                valueField="cm_priority_slno"
                placeholder={!isFocus ? 'Select Priority' : 'Search'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.cm_priority_slno);
                    setIsFocus(false);
                    dispatch(updatePriorityState(item.cm_priority_slno))
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

export default memo(DropDownList)

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