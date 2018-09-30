import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  Alert,
} from 'react-native';
import Button from '../../components/elements/Button';
import BackButton from '../../components/elements/BackButton';

const APIKey = require('../../../config/keys').GoogleMapsAPIKey;

const { width, height } = Dimensions.get('window');


class PlaceScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
      title: '',
      headerTintColor: '#000',
      cardStyle: {
        backgroundColor: 'transparent',
      },
      headerStyle: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        fontSize: 15,
      },
      headerLeft: <BackButton navigation={navigation} />,
    })

    constructor(props) {
      super(props);
      this.state = {
        id: '',
        url: '',
        name: '',
        address: '',
        buttonText: 'Bookmark',
        buttonColor: '#0404CE',
        bookmarked: false,
      };
      this.baseState = this.state;
    }

    componentWillMount() {
      const params  = this.props.navigation.state.params;
      if (params.id) {
        this.setState({ id: params.id });
      }
      if (params.name) {
        this.setState({ name: params.name });
      }
      if (params.ImageURL) {
        this.setState({ url: params.ImageURL });
      } else if (params.photoRef) {
        const api = APIKey;
        const { photoRef } = params;
        const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=900&photoreference=${photoRef}&key=${api}`;
        this.setState({ url });
      } else {
        this.setState({ url: '' });
      }
    // address
    if (params.address && params.address.street && params.address.city) {
      const address = `${params.address.street} ${params.address.city}`;
      this.setState({ address });
    }
    if (params.formatted_address) {
      this.setState({ address: params.formatted_address });
    }
    // button setup
    if (params.bookmarked) {
      this.setState({ bookmarked: true });
      this.setState({ buttonText: 'Bookmarked' });
      this.setState({ buttonColor: '#29BF12' });
    }
  }

    componentWillUnmount() {
        // reset state
        this.setState(this.baseState);
      }

    ButtonAction = () => {
        
        if (this.state.bookmarked) {
          // ask if they want to remove the bookmark
          Alert.alert(
            'Remove Bookmark',
            '',
            [
              { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
              {
                text: 'OK',
                onPress: () =>
                  this.props.navigation.navigate('Bookmark', {
                    remove: true,
                    id: this.state.id,
                  }),
              },
            ],
            { cancelable: false },
          );
        } else {
          // adding bookmark and returning to the bookmark screen.
          this.setState({ bookmarked: true });
          this.setState({ buttonText: 'Bookmarked' });
          this.setState({ buttonColor: '#29BF12' });
          return this.props.navigation.navigate('Bookmark', {
            id: this.state.id,
            thumbnailURL: this.state.url,
            name: this.state.name,
            address: this.state.address,
            remove: false,
          });
        }
      };

    render() {
      return (
        <View style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#fff',
        }}
        >
         <View style={{
              backgroundColor: '#fff',
              width,
              height: height / 2,
              position: 'absolute',
              top: -(height / 4),
         }}>
            <Image style={{width, height: height / 2}}  source={{ uri: this.state.url }} />
         </View>
         <View style={{width, height, top: height / 3.5, flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,}}>
         <Text style={{ marginTop: 15, fontSize: 24}}>{this.state.name}</Text>
          <Text style={{ marginTop: 15, fontSize: 12}}>{this.state.address}</Text>
             <View style={{ width: width / 1.8, marginTop: 29}}>
             <Button
              onPress={this.ButtonAction}
              text={this.state.buttonText}
              backgroundColor={this.state.buttonColor}
              fontSize={15}
              bookMarked={this.state.bookmarked}
            />
             </View>
         </View>
        </View>
      );
    }
}

export default PlaceScreen;
