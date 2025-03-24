import React, { memo } from 'react'
import { TextInput, View } from 'react-native'

const MutlilineTextInput = ({ placeholder, value, onChange }) => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'flex-end',
            borderColor: 'grey',
            borderWidth: 0.5,
            borderRadius: 10,
            overflow: 'hidden'
        }} >
            <TextInput
                editable
                multiline
                numberOfLines={3}
                value={value}
                onChangeText={(text) => onChange(text)}
                autoCapitalize='sentences'
                autoComplete='off'
                autoCorrect={false}
                placeholder={placeholder}
                enterKeyHint='done'
                inputMode="text"
                keyboardType="default"
                style={{ textAlignVertical: 'top', padding: 10, backgroundColor: 'white', }}
            />
        </View>
    )
}

export default memo(MutlilineTextInput)