import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const APIKey = require('../../../config/keys').GoogleMapsAPIKey;


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  textInputContainer: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    paddingLeft: 30,
    marginLeft: 20,
    marginRight: 20,
    height: 38,
    color: '#5d5d5d',
    backgroundColor: 'rgba(125,125,125,0.10);',
    fontSize: 16,
  },
  description: {
    fontWeight: 'bold',
  },
  predefinedPlacesDescription: {
    color: '#1FAADB',
  },
});

const GooglePlacesInput = ({ onPress }) => (
  <GooglePlacesAutocomplete
    placeholder="Search"
    minLength={2}
    autoFocus={false}
    returnKeyType="search"
    listViewDisplayed="auto"
    fetchDetails
    renderDescription={row => row.description}
    onPress={onPress}
    getDefaultValue={() => ''}
    query={{
      // available options: https://developers.google.com/places/web-service/autocomplete
      key: APIKey,
      language: 'en', // language of the results
      types: 'establishment',
    }}
    styles={styles}
    currentLocationLabel="Current location"
    nearbyPlacesAPI="GooglePlacesSearch"
    GoogleReverseGeocodingQuery={{}}
    GooglePlacesSearchQuery={{
      rankby: 'distance',
      types: 'food',
    }}
    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_2']}
    debounce={200}
    renderLeftButton={() => <Image style={{ position: 'absolute', left: 30, top: 20 }} source={require('../../../assets/img/list_search.png')} />}
  />
);

export default GooglePlacesInput;
