import React, { Fragment, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';

import * as songs from './../songs/all/all';
// import { baseStyling } from './styles/songStyles';

const Stack = createStackNavigator();

const historyList = ['Bajahuremana'];

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

const historySongs = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {historyList.map(song => (
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

const History = props => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="History Songs">
          <Stack.Screen name="History Songs" component={historySongs} options={{ headerShown: false }} />
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

export default History;