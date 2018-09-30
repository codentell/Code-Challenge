// Card
import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: 100,
    width,
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  thumbnailWrapper: {
    flex: 0.6,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  infoWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  name: {
    color: '#000',
    fontSize: 18,
    marginBottom: 10,
  },
  address: {
    color: '#000',
    fontSize: 13,
  },
});

const Card = ({ navigation, id, name, address, ImageURL, bookmarked }) => (
  <TouchableHighlight
    onPress={() => navigation.navigate('Place', {
      id,
      name,
      address,
      ImageURL,
      bookmarked,
    })}
    underlayColor="#FFF"
  >
    <View style={styles.wrapper}>
      <View style={styles.thumbnailWrapper}>
        <Image style={styles.image} source={{ uri: ImageURL }} />
      </View>
      <View style={styles.wrapper}>
        <View style={styles.infoWrapper}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.address}>{address.street}</Text>
          <Text style={styles.address}>{address.city}</Text>
        </View>
      </View>
    </View>
  </TouchableHighlight>
);

export default Card;
