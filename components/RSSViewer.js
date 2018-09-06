import React, { Component } from "react";
import { View, Text } from "react-native";
import axios from "axios";
import * as rssParser from "react-native-rss-parser";

export default class RSSViewer extends Component {
  componentDidMount() {
    this.fetchFeed();
  }
  fetchFeed = () => {
    return axios
      .get("http://joeroganexp.joerogan.libsynpro.com/rss")
      .then(response => {
        rssParser.parse(response.data).then(rss => {
          console.log(rss.title);
          console.log(rss.items.length);
        });
      })
      .catch(err => {
        debugger;
      });
  };
  render() {
    return (
      <View>
        <Text>Hahaha!!</Text>
      </View>
    );
  }
}
