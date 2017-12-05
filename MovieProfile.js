//import liraries
import React, { Component } from "react";
import { Image, View, Text, StyleSheet, Dimensions } from "react-native";

// create a component
class MovieProfile extends Component {
  render() {
    const props = this.props.navigation.state.params;
    const img = {
      uri: `https://image.tmdb.org/t/p/w1000_and_h563_bestv2/${
        props.poster_path
      }`
    };
    return (
      <View>
        <Image style={styles.image} source={img} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.overview}>{props.overview}</Text>
          <Text style={styles.overview}>{props.vote_average}</Text>
        </View>
      </View>
    );
  }
}

// define your styles
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  image: {
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "nowrap",
    width: width,
    height: height
  },
  textContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    position: "absolute",
    bottom: 30,
    marginHorizontal: 8,
    padding: 8,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  title: {
    color: "rgb(200, 200, 200)",
    fontSize: 18,
    fontWeight: "600"
  },
  overview: {
    color: "rgb(200, 200, 200)",
    fontWeight: "500"
  }
});

//make this component available to the app
export default MovieProfile;
