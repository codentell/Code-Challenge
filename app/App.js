import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';

import Navigation from './src/navigation';

const Database = require('./src/database')();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default class App extends Component {
  componentWillMount() {
    Database.Init();
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigation />
      </View>
    );
  }
}
