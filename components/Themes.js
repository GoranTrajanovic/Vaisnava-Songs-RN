import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';


const Themes = props => {
    return (
        <View style={styles.container}>
            {props.themeList.map(theme => (
                <TouchableOpacity style={styles.touchable}><Text>{theme}</Text></TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      height: 150
    },
    touchable: {
      padding: 15,
      fontSize: 20,
      fontWeight: "600",
      borderColor: "#eee",
      borderWidth: 1
    }
});

export default Themes;