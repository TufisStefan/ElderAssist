
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CustomButton from "../../components/CustomButton";


const AccountScreen = ({ navigation }) => {
    const { logout } = useContext(AuthContext);


    return (
        <View style={styles.container}>
            <CustomButton onPress={logout} label="Logout" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
});

export default AccountScreen;