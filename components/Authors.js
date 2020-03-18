import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';



import * as songs from './../songs/all/all';
// import { baseStyling } from './styles/songStyles';

const Stack = createStackNavigator();

const authorList = ['Sri Govinda Das Kaviraj', 'Bhaktivinoda Thākura'];

const listOfAuthorsAndSongs = { 'Sri Govinda Das Kaviraj': ['Bajahuremana'], 'Bhaktivinoda Thākura': ['Bhaja_bhakata_vatsala'] };

const allSongsByAuthor = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      {listOfAuthorsAndSongs[route.params.author].map(song => (
        <TouchableOpacity
          key={song}
          style={styles.touchable}
          onPress={() => {
            navigation.navigate('Selected Song', { title: song, HTML: songs[song].HTML })
          }}>
          <Text>{author}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
};

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

const allAuthors = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {authorList.map(author => (
        <TouchableOpacity
          key={author}
          style={styles.touchable}
          onPress={() => {
            navigation.navigate('Selected Author', { author: author })
          }}>
          <Text>{author}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
};

const selectedAuthor = ({ route }) => {
  return (
    <Stack.Navigator initialRouteName="All Songs by Author">
      <Stack.Screen name="All Songs by Author" component={allSongsByAuthor} options={({ route }) => ({ author: route.params.author })} />
      <Stack.Screen name="Selected Song" component={selectedSong} options={({ route }) => ({ title: route.params.title })} />
    </Stack.Navigator>
  );
};

const Authors = ({ route }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="All Authors">
        <Stack.Screen name="All Authors" component={allAuthors} options={{ headerShown: false }} />
        <Stack.Screen name="Selected Author" component={selectedAuthor} options={({ route }) => ({ author: route.params.author })} />
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

export default Authors;