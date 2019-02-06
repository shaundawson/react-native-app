import { StyleSheet } from 'react-native';
import { theme } from "../../index"
import {padding, color, fontFamily, normalize} from '../../../../styles/theme';

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1
    },

    bottomContainer:{
        backgroundColor:"white",
        paddingVertical: padding * 3,
        shadowColor: "#000",
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
    }
});

export default styles;
