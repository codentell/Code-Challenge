import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import BackButton from '../../components/elements/BackButton';
import GooglePlacesAutocomplete from '../../../api/google/GooglePlacesAutocomplete';

class SearchScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
      title: 'Search',
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#FFF',
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        fontSize: 15,
      },
      headerLeft: <BackButton navigation={navigation} />,
    })

    render() {
      const { navigation } = this.props;
      return (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <GooglePlacesAutocomplete
            onPress={(data, details = null) => {
              if (data && details && details.id) {
                navigation.navigate('Place', {
                  id: details.id,
                  formatted_address: details.formatted_address,
                  name: details.name,
                  photoRef: details.photos ? details.photos[0].photo_reference : undefined,
                });
              }
            }}
          />
        </View>
      );
    }
}

// function mapStateToProps(state) {
//  return {
//    bookmarks: state.bookmarks,
//  };
// }

export default SearchScreen;
