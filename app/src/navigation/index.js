import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { View } from 'react-native';

// Screens
import BookmarkScreen from '../screens/Bookmarks';
import PlaceScreen from '../screens/Place';
import SearchScreen from '../screens/Search';

const Navigation = () => (
  <View style={{ flex: 1 }}>
    <RootStack />
  </View>
);

const RootStack = createStackNavigator(
  {
    Bookmark: BookmarkScreen,
    Place: PlaceScreen,
    Search: SearchScreen,
  },
  {
    initialRouteName: 'Bookmark',
  },
);

export default Navigation;
