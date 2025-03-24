//import liraries
import React, { Component, memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colorTheme } from '../../../../Constant/Colors';
import { ClipboardDocumentCheckIcon, BellAlertIcon } from 'react-native-heroicons/outline'

// create a component
const MyDashLabel = ({ name, count }) => {
    return (
        <View className='flex flex-row h-10 items-center' >
            <View className='px-1 basis-10' >
                <ClipboardDocumentCheckIcon color={colorTheme.iconColor} width={25} height={25} />
            </View>
            <View className='px-1 basis-48'>
                <Text className='flex font-light text-base hover:font-semibold' style={{ color: colorTheme.mainColor }}>{name}</Text>
            </View>
            <View className='basis-14' >
                <Text className='text-base font-extrabold' style={{ color: colorTheme.mainColor }} >{count}</Text>
            </View>
            <View className='basis-10'>
                <BellAlertIcon color={colorTheme.mainColor} width={25} height={25} />
            </View>
        </View>
    );
};

//make this component available to the app
export default memo(MyDashLabel);
