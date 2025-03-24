import { StyleSheet } from "react-native";
import { bgColor, colorTheme, fontColor } from "../../../../Constant/Colors";
import { windowHeight, windowWidth } from "../../../../utils/Dimentions";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: bgColor.mainBgColor,
        height: windowHeight
    },
    scrollView: {
        padding: 8,
    },
    dashBord: {
        // flex: 1,
        flexDirection: 'row',
    },
    card: {
        flex: 1,
        backgroundColor: colorTheme.bgGreyWhite,
        borderRadius: 5,
        overflow: 'hidden'
    },
    cardHeader: {
        backgroundColor: bgColor.cardBg,
        // backgroundColor: "powderblue",
        Height: (windowHeight * 3 / 100),//30
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        flexDirection: 'row',
        overflow: 'hidden',
        borderTopLeftRadius: 5,
        borderTopLeftRadius: 5
    },
    cardTitle: {
        fontFamily: 'Roboto_500Medium',
        fontSize: windowWidth > 400 ? 14 : 12,
        paddingHorizontal: 5,
        overflow: 'hidden',
        color: fontColor.inActiveFont
    },
    dbvContainer: {
        flex: 1,
        flexDirection: 'row',
        maxWidth: windowWidth,
    },
    FLCP_container: {
        flex: 1,
        backgroundColor: '#fffdff',
        minHeight: 130,
        padding: 3,
        borderColor: bgColor.mainBgColor,
        borderTopWidth: 0.5
    },
    FLCP_cardTitle: {
        fontFamily: 'Roboto_500Medium',
        fontSize: windowWidth > 400 ? 12 : 12,
        paddingHorizontal: 2,
        // color: fontColor.inActiveFont,
        color: '#444655',
        textTransform: 'capitalize'
    },
    FLCP_headStyle: {
        fontFamily: 'Roboto_500Medium',
        fontSize: windowWidth > 400 ? 12 : 12,
        paddingHorizontal: 2,
        color: fontColor.inActiveFont,
        textTransform: 'capitalize'
    },
    FLCP_captionStyle: {
        fontFamily: 'Roboto_700Bold',
        fontSize: 14,
        paddingHorizontal: 2,
        color: '#0c111b',
        textTransform: 'capitalize'
    }
});