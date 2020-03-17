import React, { Fragment, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';

// import { baseStyling } from './styles/songStyles';

import History from './components/History';
import Songs from './components/Songs';
import Authors from './components/Authors';
import Themes from './components/Themes';

const songList = ['Bhaja_bhakata_vatsala', 'Bajahuremana'];
const authorList = ['Sri Govinda Das Kaviraj', 'Bhaktivinoda Thākura'];
const themeList = ['Arati', 'Life'];

export default function App() {
  let [activeSong, setActiveSong] = useState('');
  let [songStyling, setSongStyling] = useState('');
  let [songHTML, setSongHTML] = useState('');

  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    { key: 'history', title: '🕒' },
    { key: 'all', title: 'all' },
    { key: 'byAuthor', title: 'By Author' },
    { key: 'byTheme', title: 'By Theme' },
  ]);


  const historyRoute = () => <History songList={songList} />;
  const allSongsRoute = () => <Songs songList={songList} />;
  const songsByAuthorRoute = () => <Authors authorList={authorList} />;
  const songsByThemeRoute = () => <Themes themeList={themeList} />;

  const renderScene = SceneMap({
    all: allSongsRoute,
    history: historyRoute,
    byAuthor: songsByAuthorRoute,
    byTheme: songsByThemeRoute
  });

  const handlePress = pressedSong => {
    setActiveSong(pressedSong);
    setSongHTML("<style>" + baseStyling + "</style>" + songs[pressedSong].HTML);
  };

  const handleColorPress = pressedColor => {
    setSongStyling(`em { color: ${pressedColor} }`);
    setSongHTML("<style>" + baseStyling + `em { color: ${pressedColor} }` + "</style>" + songs[activeSong].HTML);
  };

  const handleFontSizePress = presssedFontSize => {
    // setSongStyling(`em { color: ${presssedFontSize} }`);
    console.log(presssedFontSize);
    setSongHTML("<style>" + baseStyling + songStyling + `body { font-size: ${presssedFontSize}em }` + "</style>" + songs[activeSong].HTML);
  }


  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
      style={{ flex: 1, height: 200 }}
    />
  );
}

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
  }, verticalAlign: {
    flex: 1,
    flexDirection: "row"
  },
  webView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    margin: "auto",
  },
});
