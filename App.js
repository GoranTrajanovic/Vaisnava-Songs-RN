import React, { Fragment, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';

import * as songs from './songs/all/all';
import { baseStyling } from './styles/songStyles';

// import Songs from './components/Songs';
import Authors from './components/Authors';
import Themes from './components/Themes';

const Stack = createStackNavigator();

const songList = ['Bhaja_bhakata_vatsala', 'Bajahuremana'];
const authorList = ['Sri Govinda Das Kaviraj', 'Bhaktivinoda Thākura'];
const themeList = ['Arati', 'Life'];

const selectedSong = ({ route, navigation }) => {
  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: route.params.HTML }}
      scalesPageToFit={(Platform.OS === 'ios') ? false : true}
      styles={[ styles.webView, styles.fullScreen ]}
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

const Songs = props => {
  return (
    <Fragment>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="All Songs">
          <Stack.Screen name="All Songs" component={allSongs} options={{ headerShown: false }}/>
          <Stack.Screen name="Selected Song" component={selectedSong} options={({ route }) => ({ title: route.params.title, mode: 'modal' })} />
        </Stack.Navigator>
      </NavigationContainer>
    </Fragment>
  );
};


export default function App() {

  let [activeSong, setActiveSong] = useState('');
  let [songStyling, setSongStyling] = useState('');
  let [songHTML, setSongHTML] = useState('');

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'all', title: 'all' },
    { key: 'byAuthor', title: 'By Author' },
    { key: 'byTheme', title: 'By Theme' },
  ]);


  const allSongsRoute = () => <Songs songList={songList} />;
  const songsByAuthorRoute = () => <Authors authorList={authorList} />;
  const songsByThemeRoute = () => <Themes themeList={themeList} />;

  const renderScene = SceneMap({
    all: allSongsRoute,
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
    margin: "auto"
  },
  fullScreen: {
    width: Dimensions.get('window').width, 
    height: Dimensions.get('window').height 
  }
});
