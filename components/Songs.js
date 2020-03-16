import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Songs" component={SongList} initialParams={props} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const selectedSong = props => {

};

const SongList = () => {
  return (
    <View style={styles.container}>
      {initialParams.songList.map(song => (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name={song} component={selectedSong} initialParams={song.} />
          </Stack.Navigator>
        </NavigationContainer>
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

export default App;