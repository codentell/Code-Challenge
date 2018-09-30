import React, { Component } from 'react';
import {
  Dimensions,
  FlatList,
  View,
} from 'react-native';

// Component
import Button from '../../components/elements/Button';
import Card from '../../components/elements/Card';

const addressParser = require('parse-address');
const Database = require('../../database')();
const validateBookmark = require('../../utilities/validation/bookmarks');
const helpers = require('../../utilities/helpers')();

const { width } = Dimensions.get('window');

class BookmarksScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Bookmarks',
    headerTintColor: '#000',
    headerStyle: {
      backgroundColor: '#FFF',
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      fontSize: 16,
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
      bookmarksHashTable: {},
      initFirebaseLoad: false,
    };
  }

  componentWillMount() {
    // initFirebaseLoad is for allowing this database to be called once.
    const { initFirebaseLoad } = this.state;
    if (!initFirebaseLoad) {
      Database.getAllBookmarks()
        .then((bookmarks) => {
          this.setState({ bookmarks });
          this.setState({ initFirebaseLoad: true });
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { params } = nextProps.navigation.state;
    if (params) {
      this.updateBookmarkList(params);
    }
  }

  updateBookmarkList = (params) => {
    const errors = validateBookmark(params);
    const bookmark = {};
    const { bookmarksHashTable, bookmarks } = this.state;
    const bookmarksList = bookmarks.slice();
    const navParams = params;

    if (errors.isValid && !navParams.remove && !bookmarksHashTable[navParams.id]) {
      bookmark.id = navParams.id;
      bookmark.thumbnailURL = navParams.thumbnailURL;
      bookmark.name = navParams.name;
      const address = addressParser.parseLocation(navParams.address);
      bookmark.address = {
        street: helpers.getAddressStreet(address),
        city: helpers.getAddressCity(address),
      };
      // add bookmark to the beginning (TOP) of the list
      bookmarksList.unshift(bookmark);
      bookmarksHashTable[bookmark.id] = {
        id: bookmark.id,
      };
      // update bookmarks state
      this.setState({ bookmarks: bookmarksList });
      // save to firbase database
      Database.insertBookmark(bookmark);
    } else if (!errors.id && navParams.remove) {
      // remove bookmark
      const index = bookmarksList.findIndex(b => (b.id === navParams.id));
      if (index !== -1 || index !== undefined) {
        bookmarksList.splice(index, 1);
        delete bookmarksHashTable[navParams.id];
        // update bookmarks state
        this.setState({ bookmarks: bookmarksList });
        // update firebase by deleting the bookmark
        Database.deleteBookmark(navParams);
      }
    }
  };

  keyExtractor = (item) => (
      item.id.toString()
  );

  renderCard = ({ item }) => (
    <Card
      id={item.id}
      name={item.name}
      address={item.address}
      ImageURL={item.thumbnailURL}
      bookmarked="true"
      navigation={this.props.navigation}
    />
  );


  render() {
    const { navigation } = this.props;
    const { bookmarks } = this.state;
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
      }}
      >
        <FlatList
          data={bookmarks}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderCard}
        />
        <View style={{
          width: width / 1.2,
          position: 'absolute',
          bottom: 0,
          marginBottom: 60,
        }}
        >
          <Button
            onPress={() => navigation.navigate('Search')}
            text="Add New Place"
            backgroundColor="#0404CE"
            fontSize={15}
          />
        </View>
      </View>
    );
  }
}

export default BookmarksScreen;
