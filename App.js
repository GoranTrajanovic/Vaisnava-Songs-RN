import React, { Fragment, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

import * as songs from './songs/all/all';
import { baseStyling } from './styles/songStyles';

export default function App() {

  let [activeSong, setActiveSong] = useState('');
  let [songStyling, setSongStyling] = useState('');
  let [songHTML, setSongHTML] = useState('');

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
    <Fragment>
      <View style={styles.container}>
        {/* <Text onPress={handlePress}>{songs.Nrsimha_pranama.HTML}</Text> */}
        <TouchableOpacity style={styles.touchable} onPress={handlePress.bind(null, "Bhaja_bhakata_vatsala")}>
          <Text>Bhaja_bhakata_vatsala</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable} onPress={handlePress.bind(null, "Bajahuremana")}>
          <Text>Bajahuremana</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleColorPress.bind(null, "red")} style={[styles.touchable, { color: "red" }]}><Text>Red</Text></TouchableOpacity>
        <TouchableOpacity onPress={handleColorPress.bind(null, "blue")} style={[styles.touchable, { color: "blue" }]}><Text>Blue</Text></TouchableOpacity>
        <TouchableOpacity onPress={handleColorPress.bind(null, "orange")} style={[styles.touchable, { color: "orange" }]}><Text>Orange</Text></TouchableOpacity>
        <View style={styles.verticalAlign}>
          <TouchableOpacity onPress={handleFontSizePress.bind(null, 1.2)} style={styles.touchable}><Text>a</Text></TouchableOpacity>
          <TouchableOpacity onPress={handleFontSizePress.bind(null, 1.8)} style={styles.touchable}><Text>A</Text></TouchableOpacity>
        </View>
      </View>
      <WebView
        originWhitelist={['*']}
        source={{ html: songHTML }}
        scalesPageToFit={(Platform.OS === 'ios') ? false : true}
        styles={styles.webView}
      />
    </Fragment>
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
  }
});
