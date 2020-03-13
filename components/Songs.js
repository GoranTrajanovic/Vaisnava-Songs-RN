import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';


const Songs = props => {
    return (
        <View style={styles.container}>
            {props.songList.map(song => (
                <TouchableOpacity style={styles.touchable}><Text>{song}</Text></TouchableOpacity>
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

export default Songs;