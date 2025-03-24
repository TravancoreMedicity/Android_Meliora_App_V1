import { View, Text, StatusBar, TouchableOpacity, Platform, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { CloudArrowDownIcon, XCircleIcon } from 'react-native-heroicons/solid'
import { colorTheme } from '../../../Constant/Colors';
import { AntDesign } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing'
import { useNavigation } from '@react-navigation/native';
import ModalLoding from '../ComplaintMgmnt/Components/Modals/ModalLoding';
import { axiosApi } from '../../../config/Axiox';

const DownloadsFile = () => {

    const navigation = useNavigation()
    const [visible, setVisible] = useState(false)

    const [apkFileName, setApkFileName] = useState('')
    const [apkLink, setApkLink] = useState('')
    const [disable, setDisable] = useState(true)

    const navigateToHome = useCallback(() => {
        navigation.navigate('Home')
    }, [])

    // GET THE API INFORMATION

    useEffect(() => {
        const getDownloadApi = async () => {
            const getApiInform = await axiosApi.get(`/mobileapp/apkDownloadDetails/${1}`);
            const { data, success } = getApiInform.data;
            if (success === 1) {
                setApkFileName(data?.[0]?.apk_app_filename)
                setApkLink(data?.[0]?.apk_app_link)
                setDisable(false)
            } else {
                Alert.alert("Error Getting Apk Link")
            }
        }
        getDownloadApi()
    }, [disable])

    const donsloadandroidApkFromUrl = async () => {
        setVisible(true)
        const filename = 'Meliora.apk';
        const result = await FileSystem.downloadAsync(
            'https://travancoremedicity.in/apk/Meliora.apk',
            FileSystem.documentDirectory + filename
        );
        save(result.uri, filename, result.headers["Content-Type"])
    }

    const save = async (uri, filename, mimetype) => {
        if (Platform.OS === 'android') {
            const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
            if (permissions.granted) {
                const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
                await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
                    .then(async (uri) => {
                        await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 })
                        setVisible(false)
                    })
                    .catch((e) => {
                        console.log(e)
                        setVisible(false)
                    });
                setVisible(false)
            } else {
                setVisible(false)
                shareAsync(uri)
            }
        } else {
            setVisible(false)
            shareAsync(uri)
        }
    }

    return (
        <View>
            <StatusBar animated />
            <ModalLoding visible={visible} />
            <View
                className='flex justify-center items-center flex-row '
                style={{ borderColor: colorTheme.fontColorLightGrey, minHeight: 50, borderBottomWidth: 1 }}
            >
                <View className='flex flex-row items-center grow pl-5 justify-center' >
                    <CloudArrowDownIcon height={35} width={35} color={colorTheme.greenVarient} />
                    <Text className='pl-2' style={{ fontSize: 18, fontFamily: 'Roboto_700Bold' }} >Downloads</Text>
                </View>
                <View className='flex w-1/6' >
                    <TouchableOpacity
                        onPress={navigateToHome}
                        className='flex '
                    >
                        <XCircleIcon height={30} width={30} color={colorTheme.fontColorLightGrey} />
                    </TouchableOpacity>
                </View>
            </View>
            <View className='p-2' >
                <View
                    className='flex p-2 rounded-md mt-3 flex-row h-32'
                    style={{ borderWidth: 0.3 }}
                >
                    <View className='flex w-1/6 justify-center items-center' >
                        <TouchableOpacity
                            onPress={donsloadandroidApkFromUrl}
                            disabled={disable}
                        >
                            <FontAwesome name="android" size={52} color={colorTheme.greenVarient} />
                        </TouchableOpacity>
                    </View>
                    <View className='flex grow  p-1 pl-2' >
                        <Text style={{ fontFamily: 'Roboto_400Regular', fontSize: 20 }} >Meliora</Text>
                        <Text style={{ fontFamily: 'Roboto_100Thin', fontSize: 15 }}>version 2.0.0.0</Text>
                        <View>
                            <Text style={{ fontFamily: 'Roboto_100Thin', fontSize: 15 }}>
                                Download and install the apk file
                            </Text>
                            <Text style={{ fontFamily: 'Roboto_100Thin', fontSize: 15 }}>
                                For android only
                            </Text>
                        </View>
                    </View>
                </View>
                <View
                    className='flex p-2 rounded-md mt-3 flex-row h-32'
                    style={{ borderWidth: 0.3 }}
                >
                    <View className='flex w-1/6 justify-center items-center' >
                        <TouchableOpacity
                            disabled={true}
                        >
                            <AntDesign name="apple-o" size={52} color='grey' />
                        </TouchableOpacity>
                    </View>
                    <View className='flex grow  p-1 pl-2' >
                        <Text style={{ fontFamily: 'Roboto_400Regular', fontSize: 20 }} >Meliora</Text>
                        <Text style={{ fontFamily: 'Roboto_100Thin', fontSize: 15 }}>version 2.0.0.0</Text>
                        <View>
                            <Text style={{ fontFamily: 'Roboto_100Thin', fontSize: 15 }}>
                                Download and install the apk file
                            </Text>
                            <Text style={{ fontFamily: 'Roboto_100Thin', fontSize: 15 }}>
                                For IOS only
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default DownloadsFile