import React, { memo, useMemo } from 'react'
import RadioGroup from 'react-native-radio-buttons-group'

const BaseRadioButton = ({ data, selectedId, setSelectedId }) => {
    const radioButtonData = useMemo(() => data, [data])
    // { id: 1, value: 1, label: 'test' } // Example data array format
    return (
        <RadioGroup
            radioButtons={radioButtonData}
            onPress={setSelectedId}
            selectedId={selectedId}
            containerStyle={{
                color: 'green',
                alignItems: 'flex-start',
                borderWidth: 0.3,
                borderRadius: 10,
                paddingHorizontal: 3,
                paddingVertical: 5,
                borderColor: 'red'
            }}
        />
    )
}

export default memo(BaseRadioButton) 