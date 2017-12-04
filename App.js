import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { COLOR, ThemeProvider } from "react-native-material-ui";
import MovieList from "./MovieList";
import MovieProfile from "./MovieProfile";

import TEST_DATA from "./data.json";
import { StackNavigator } from "react-navigation";

const apiKey = "a07e22bc18f5cb106bfe4cc1f83ad8ed";

const uiTheme = {
  palette: {
    primaryColor: COLOR.googleBlue
  },
  toolbar: {
    container: {
      height: 50
    }
  }
};

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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.fetchWithPage = this.fetchWithPage.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.state = {
      movies: [],
      loading: false,
      page: 1
    };
    StatusBar.setHidden(true);
  }

  loadMore() {
    const newPage = this.state.page + 1;
    this.setState(
      {
        page: newPage
      },
      () => {
        this.fetchWithPage(newPage);
      }
    );
  }

  fetchWithPage(page) {
    this.setState(
      {
        loading: true
      },
      () => {
        fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${
            apiKey
          }&page=${page}`
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

  componentDidMount(props) {
    this.fetchWithPage(1);
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Routes
          screenProps={{
            movies: this.state.movies,
            refresh: this.fetchWithPage,
            loadMore: this.loadMore,
            loading: this.state.loading
          }}
        />
      </ThemeProvider>
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
