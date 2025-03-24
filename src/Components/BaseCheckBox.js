import { View, Text, Pressable } from 'react-native'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { CheckIcon } from 'react-native-heroicons/outline'
import { colorTheme } from '../Constant/Colors'

const BaseCheckBox = ({ selectedEmpVal, setEmpVal, data }) => {
    const [checked, isChecked] = useState(false)
    const empData = useMemo(() => data, [data])
    const { em_name, assigned_emp } = empData;

    const onChangeCheck = useCallback(() => {
        checked === false ?
            setEmpVal({ ...selectedEmpVal, empSlno: [...selectedEmpVal.empSlno, assigned_emp] })
            : setEmpVal({ ...selectedEmpVal, empSlno: [...selectedEmpVal.empSlno.filter(item => item !== assigned_emp)] });
        isChecked(!checked)
    }, [checked, assigned_emp, selectedEmpVal])

    return (
        <View className='flex flex-row my-1' >
            <Pressable
                className='w-6 h-6 '
                style={{
                    borderWidth: 1,
                    borderRadius: 3,
                    backgroundColor: colorTheme.switchTrack
                }}
                onPress={onChangeCheck}
            >
                {
                    checked && <CheckIcon width={22} height={22} color="white" />
                }
            </Pressable>
            <Text className='capitalize pl-2' >{em_name}</Text>
        </View>
    )
}

export default memo(BaseCheckBox) 