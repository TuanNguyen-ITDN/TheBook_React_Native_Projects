import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Navigation} from 'react-native-navigation';

class Book extends Component {
  onPress = (image, name, title, author, count) => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'Detail',
              passProps: {
                data: image,
                name: name,
                namebook: title,
                authorName: author,
                rank: count,
              },
              options: {
                topBar: {
                  title: {
                    text: '',
                    alignment: 'center',
                  },
                  visible: false,
                },
              },
            },
          },
        ],
      },
    });
  };

  render() {
    const {image, name, author, count, title} = this.props;

    return (
      <View style={styles.showflast}>
        <TouchableOpacity
          onPress={() => this.onPress(image, name, title, author, count)}>
          <Image
            source={{uri: image}}
            style={{
              width: 150,
              height: 200,
              backgroundColor: 'red',
              marginHorizontal: 2,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.name}>{name}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.author}>{author}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rate}>
          <Icon name="ios-star" size={11} color="#fc9619" />
          <Icon name="ios-star" size={11} color="#fc9619" />
          <Icon name="ios-star" size={11} color="#fc9619" />
          <Icon name="ios-star" size={11} color="#fc9619" />
          <Icon name="ios-star" size={11} color="#979797" />
          <Text style={styles.bookCount}>{count}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bookCount: {
    color: '#ababab',
    paddingLeft: 10,
  },
  topbar: {
    paddingLeft: 15,
    paddingTop: 20.5,
    fontSize: 10.5,
    flexDirection: 'row',
    //color: 'red',
    //flex: 1,
  },
  search: {
    marginLeft: 230,
  },
  list: {
    paddingTop: 5,
  },
  text: {
    fontSize: 25.5,
    paddingTop: 5,
  },
  main: {
    padding: 10,
  },
  rate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showflast: {
    //padding: 10,
    marginRight: 15,
    width: 170,
    flex: 1,
  },
  name: {
    color: '#4a4a4a',
    fontSize: 18,
  },
  author: {
    color: '#ababab',
    fontSize: 16,
  },
});
export default Book;
