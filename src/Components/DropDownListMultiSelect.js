import React, { useState, memo, useMemo, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggeedEmpList } from '../Redux/ReduxSlice/commonSlice';
import { selectedEmpListDropDown, updateSelectedEmployeeDropDown } from '../Redux/ReduxSlice/DropDownListSlice';

const DropDownListMultiSelect = () => {

    const dispatch = useDispatch();

    const state = useSelector(getLoggeedEmpList)
    const selectedEmp = useSelector(selectedEmpListDropDown)

    const deptWiseEmpDetl = useMemo(() => state, [state])

    useEffect(() => {
        return () => {
            dispatch(updateSelectedEmployeeDropDown([]))
        }
    }, [dispatch])

    return (
        <View style={styles.container}>
            <MultiSelect
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                search
                data={deptWiseEmpDetl}
                labelField="em_name"
                valueField="em_id"
                placeholder="Select Employees"
                searchPlaceholder="Search..."
                value={selectedEmp}
                mode='modal'
                onChange={item => {
                    dispatch(updateSelectedEmployeeDropDown(item))
                }}
                containerStyle={{
                    width: '90%',
                    height: '70%',
                    borderRadius: 10,
                    padding: 2
                }}
                itemContainerStyle={{
                    height: 51,
                    borderRadius: 10,

                }}
                itemTextStyle={{
                    textTransform: 'capitalize',
                    borderRadius: 10
                }}
                activeColor='#929AA2'
                renderLeftIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color="black"
                        name="Safety"
                        size={20}
                    />
                )}
                selectedStyle={styles.selectedStyle}
            />
        </View>
    )
}

export default memo(DropDownListMultiSelect)

const styles = StyleSheet.create({
    container: {
        //  padding: 16,
    },
    dropdown: {
        height: 40,
        backgroundColor: 'transparent',
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 14,
        textTransform: 'capitalize'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
    selectedStyle: {
        borderRadius: 12,
        textTransform: 'capitalize'
    },
});