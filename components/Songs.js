import React, { Fragment, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';

import * as songs from './../songs/all/all';
// import { baseStyling } from './styles/songStyles';

const Stack = createStackNavigator();

const songList = ['Bhaja_bhakata_vatsala', 'Bajahuremana'];

const selectedSong = ({ route }) => {
  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: route.params.HTML }}
      scalesPageToFit={(Platform.OS === 'ios') ? false : true}
      styles={[styles.webView]}
    />
  )
};

const allSongs = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {songList.map(song => (
        <TouchableOpacity
          key={song}
          style={styles.touchable}
          onPress={() => {
            navigation.navigate('Selected Song', { title: song, HTML: songs[song].HTML })
          }}>
          <Text>{song}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
};

const Songs = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="All Songs">
          <Stack.Screen name="All Songs" component={allSongs} options={{ headerShown: false }} />
          <Stack.Screen name="Selected Song" component={selectedSong} options={({ route }) => ({ title: route.params.title })} />
        </Stack.Navigator>
      </NavigationContainer>
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