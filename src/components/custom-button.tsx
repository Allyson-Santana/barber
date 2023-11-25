import {StyleSheet, View, TouchableOpacity, Text} from "react-native";

type props = {
    title: string,
    onPress: any,
    style: any,
    titleStyle: any
}

export default function CustomButton({title, onPress, style, titleStyle}:props){
    return(
        <TouchableOpacity
            style={style ? style : styles.button}
            onPress={onPress}
        >
            <Text style={titleStyle ? titleStyle : styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#FFF",
        width: "auto",
        height: 30,
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginHorizontal: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "#000"
    },

    title: {
        color: "#000"
    }
})