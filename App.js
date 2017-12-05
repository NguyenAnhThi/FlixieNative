import React from "react";
import { View, StatusBar } from "react-native";
import { StackNavigator, TabNavigator} from "react-navigation";
import { Icon } from "native-base";
import NowPlayingScreen from "./NowPlayingScreen";
import TopRatedScreen from "./TopRatedScreen";

const apiKey = "a07e22bc18f5cb106bfe4cc1f83ad8ed";

const MainScreenNavigator = TabNavigator(
  {
    NowPlaying: {
      screen: NowPlayingScreen,
      navigationOptions: {
        tabBarLabel: "Now Playing"
      }
    },
    TopRated: {
      screen: TopRatedScreen,
      navigationOptions: {
        tabBarLabel: "Top Rated",
        tabBarIcon: ({ tintColor }) => <Icon name="home" />
      }
    }
  },
  {
    tabBarPosition: "bottom"
  }
);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return <MainScreenNavigator />;
  }
}
