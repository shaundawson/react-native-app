import { StyleSheet } from 'react-native';
import { theme } from "../../index";
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;
const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: color.white
    },

    topContainer:{
        flex:1,
        paddingHorizontal:15,
        paddingBottom: padding * 2,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: "#352245"
    },

    image:{
        height: 200,
        width: 200,
        backgroundColor: color.grey,
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: '#ffffff',
        marginBottom: padding,
        resizeMode
    },

    title:{
        fontSize: fontSize.large + 2,
        lineHeight: fontSize.large + 4,
        fontFamily: fontFamily.bold,
        color:color.white,
        letterSpacing: 1
    },

    subText:{
        color: "#f75e3a",
        fontSize: fontSize.large,
        lineHeight: fontSize.large + 10,
        marginVertical:padding * 2
    },

    //===============================

    bottomContainer:{
        backgroundColor:"white",
        paddingVertical: padding * 3,
        shadowColor: "#0dbdc5",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },

    buttonContainer:{
        justifyContent:"center",
        alignItems:"center"
    },

    containerView:{
        width: windowWidth - 40
    },

    button:{
        backgroundColor: "#F86942",
        height: normalize(55)
    },

    button1:{
    backgroundColor: "#4aa297",
    height: normalize(55)
    },

    buttonText:{
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.medium
    },

    bottom:{
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center",
        marginTop: padding * 2
    },

    bottomText:{
        fontSize: fontSize.regular,
        fontFamily: fontFamily.medium,
        marginRight: 5,
        color: "#2f1f3c"
    },

    signInText:{
        fontSize: fontSize.regular,
        color: "#FF553F",
        fontFamily: fontFamily.medium
    },

    orContainer:{
        justifyContent:"center",
        alignItems:"center",
        height: 40,
        width: windowWidth
    },

    divider:{
        backgroundColor: '#4AA297',
        position:"absolute",
        top:19,
        left: 20,
        right: 20
    },

    orText:{
        backgroundColor: color.white,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.medium,
        color: "#352245",
        paddingHorizontal: padding
    }
});

export default styles;
