import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import MovieList from "./MovieList";
import MovieProfile from "./MovieProfile";

import TEST_DATA from "./data.json";
import { StackNavigator } from "react-navigation";

const apiKey = "a07e22bc18f5cb106bfe4cc1f83ad8ed";

const Routes = StackNavigator({
  MovieList: {
    screen: MovieList,
    navigationOptions: {
      header: null
    }
  },
  MovieProfile: {
    screen: MovieProfile,
    navigationOptions: ({ navigation }) => ({
      headerTitle: `${navigation.state.params.title}`
    })
  }
});

export default class NowPlayingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.fetchWithPage = this.fetchWithPage.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.state = {
      movies: [],
      loading: false,
      page: 1,
      type: "now_playing"
    };
    StatusBar.setHidden(true);
  }

  fetchWithPage(type, page) {
    this.setState(
      {
        loading: true
      },
      () => {
        fetch(
          `https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}&page=${
            page
          }`
        )
          .then(data => data.json())

          .then(json => {
            const mSet = new Set([...this.state.movies.map(m => m.id)]);
            const plusSet = json.results.filter(m => !mSet.has(m.id));
            const newResults = this.state.movies.concat(plusSet);
            this.setState({
              movies: newResults,
              loading: false
            });
          })
          .catch(error => {
            alert("Network error!");
          });
      }
    );
  }

  loadMore() {
    const newPage = this.state.page + 1;
    this.setState(
      {
        page: newPage
      },
      () => {
        this.fetchWithPage(this.state.type, newPage);
      }
    );
  }

  componentDidMount(props) {
    this.fetchWithPage(this.state.type, 1);
  }

  render() {
    return (
      <Routes
        screenProps={{
          movies: this.state.movies,
          refresh: this.fetchWithPage,
          type: this.state.type,
          loadMore: this.loadMore,
          loading: this.state.loading
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
