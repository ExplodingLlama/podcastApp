import React, { Component } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import axios from "axios";
import * as rssParser from "react-native-rss-parser";
// import AudioPlayer from "react-native-play-audio";
import { ReactNativeAudioStreaming } from "react-native-audio-stream";
import { Player } from "react-native-audio-stream";

export default class RSSViewer extends Component {
  state = {
    feed: null
  };
  componentDidMount() {
    this.fetchFeed();
  }
  fetchFeed = () => {
    return axios.get("http://feeds.wnyc.org/radiolab").then(response => {
      rssParser.parse(response.data).then(rss => {
        this.setState({ feed: rss });
      });
    });
  };
  playEpisode = item => {
    //Play audio
    const url = item.enclosures[0].url;
    ReactNativeAudioStreaming.play(url, {
      showIniOSMediaCenter: true,
      showInAndroidNotifications: true
    });
    // AudioPlayer.prepare(url, () => {
    //   AudioPlayer.play();
    //
    //   AudioPlayer.getDuration(duration => {
    //     console.log(duration);
    //   });
    //   setInterval(() => {
    //     AudioPlayer.getCurrentTime(currentTime => {
    //       console.log(currentTime);
    //     });
    //   }, 1000);
    //   // AudioPlayer.stop();
    //   // AudioPlayer.pause();
    //   // AudioPlayer.setCurrentTime(50.5);
    // });
  };
  render() {
    if (!this.state.feed) return null;
    return (
      <View>
        <ScrollView
          style={{ backgroundColor: "#fff", padding: 16, borderRadius: 2 }}
        >
          <Text
            style={{ fontFamily: "MontserratAlternates-Medium", fontSize: 20 }}
          >
            {this.state.feed.title}
          </Text>

          <Image
            source={{ uri: this.state.feed.image.url }}
            style={{ width: 200, height: 200 }}
          />

          <Text>
            {this.state.feed.itunes.categories.map(category => {
              return <Text key={category.name}>{category.name + " "}</Text>;
            })}
          </Text>
          <View>
            {this.state.feed.items.map(item => {
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => this.playEpisode(item)}
                >
                  <Text>{item.title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
        <View
          style={{
            padding: 30,
            opacity: 0.3,
            backgroundColor: "#dbf327",
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          <View>
            <Text style={styles.button}>Pause</Text>
          </View>
          <View>
            <Text style={styles.button}>Play</Text>
          </View>
          <View>
            <Text style={styles.button}>Stop</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  button: { fontSize: 20 }
};
