import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import {map, find, some, filter, sortBy, get} from 'lodash';
import {offlineData} from '../../utils/offlineData';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/thebook-appicon';
import Book from '../../component/Book';

class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      check: false,
      sort: false,
    };
  }

  backMainScreen = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  countStar = item => {
    let round = Math.round(item.OverallStarRating);
    let star = [];
    let starOutline = [];
    for (let i = 0; i < round; i++) {
      star.push(<Icon name="star" size={20} color="#fc9619" />);
    }
    for (let i = 0; i < 5 - round; i++) {
      star.push(<Icon name="star" size={20} color="#c3c1c1" />);
    }
    return star;
  };

  componentDidMount() {
    // console.log("daaaaaaaaa", this.props.book.data.MostBorrowBooks);
  }

  changScreenCategories = () => {
    Navigation.showModal({
      component: {
        name: 'Categories',
      },
    });
  };

  changScreenSort = () => {
    this.setState({sort: !this.state.sort});
  };

  changScreenSearch = () => {
    Navigation.showModal({
      component: {
        name: 'Search',
      },
    });
  };

  displayScreenHorizontalSort() {
    const DATA = sortBy(this.props.book.data.MostBorrowBooks, 'Title');
    const categories = filter(DATA, value => {
      return some(value.Categories, {Name: this.props.value});
      return [];
    });

    return (
      <FlatList
        data={categories}
        renderItem={this.renderItemHorizontal}
        keyExtractor={(item, index) => index}
        numColumns={2}
        key={2}
      />
    );
  }

  displayScreenHorizontal() {
    const DATA = this.props.book.data.MostBorrowBooks;

    const categories = filter(DATA, value => {
      return some(value.Categories, {Name: this.props.value});
      return [];
    });

    return (
      <FlatList
        data={categories}
        renderItem={this.renderItemHorizontal}
        keyExtractor={(item, index) => index}
        numColumns={2}
        key={2}
      />
    );
  }

  displayScreenVertical() {
    const DATA = this.props.book.data.MostBorrowBooks;
    const categories = filter(DATA, value => {
      return some(value.Categories, {Name: this.props.value});
      return [];
    });
    return (
      <FlatList
        data={categories}
        renderItem={this.renderItemVertical}
        keyExtractor={(item, index) => index}
      />
    );
  }

  displayScreenVerticalSort() {
    const DATA = sortBy(this.props.book.data.MostBorrowBooks, 'Title');
    const categories = filter(DATA, value => {
      return some(value.Categories, {Name: this.props.value});
      return [];
    });
    return (
      <FlatList
        data={categories}
        renderItem={this.renderItemVertical}
        keyExtractor={(item, index) => index}
      />
    );
  }

  renderItemHorizontal = ({item}) => {
    return (
      <View>
        <Book
          image={get(item, 'Medias.0.ImageUrl')}
          author={get(item, 'Authors.0.Name')}
          count={get(item, 'Shelf.BookCount')}
          OverallStarRating={get(item, 'OverallStarRating')}
          title={get(item, 'Title')}
          idBook={get(item, 'Id')}
        />
      </View>
    );
  };

  onPress = idBook => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'Detail',
              passProps: {
                IdBook: idBook,
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

  renderItemVertical = ({item}) => {
    return (
      <View>
        <View style={styles.containerMain1}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => this.onPress(item.idBook)}>
            <Image
              style={styles.imageThumbnail1}
              source={{uri: item.Medias[0].ImageUrl}}
            />
          </TouchableOpacity>

          <View style={styles.containerBody}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => this.onPress(item.idBook)}>
              <Text style={[styles.title, styles.title1]}>{item.Title}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => this.onPress(item)}>
              <Text style={[styles.titleAuthor, styles.titleSize1]}>
                {item.Authors[0].Name === null
                  ? 'No name'
                  : item.Authors[0].Name}
              </Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              {this.countStar(item)}
              <TouchableOpacity
                style={styles.item}
                onPress={() => this.onPress(item)}>
                <Text style={[styles.titleNumber, styles.titleSize1]}>
                  {item.Shelf.BookCount}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerNumber1}>
              <Icon name="ic-book-1" size={20} color="#fc9619" />
              <TouchableOpacity style={styles.item}>
                <Text style={[styles.titleNumber, styles.titleSize1]}>
                  {item.Quantity} quy???n
                </Text>
              </TouchableOpacity>
              <Icon name="ic-price" size={18} color="#fc9619" />
              <TouchableOpacity
                style={styles.item}
                onPress={() => this.onPress(item)}>
                <Text style={[styles.titleNumber, styles.titleSize1]}>
                  {item.Price}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  main() {
    const DATA = this.props.book.data.MostBorrowBooks;
    console.log('daaaaaaaaa', DATA);
    const categories = filter(DATA, value => {
      return some(value.Categories, {Name: this.props.value});
      return [];
    });
    console.log(this.props.value);

    return (
      <View>
        <View style={styles.header}>
          <View style={styles.back}>
            <TouchableOpacity style={styles.item}>
              <Icon
                name="ic-back"
                size={30}
                color="#5f5f5f"
                onPress={() => this.backMainScreen()}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.title}>{this.props.value}</Text>
          </View>
          <View style={styles.search}>
            <TouchableOpacity style={styles.item}>
              <Icon
                name="ic-search"
                size={30}
                color="#5f5f5f"
                onPress={() => this.changScreenSearch()}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.header}>
          <View style={[styles.type, styles.sort]}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 2}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.changScreenCategories()}>
                  <Text style={styles.styleText}>{this.props.value}</Text>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 8}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.changScreenCategories()}>
                  <Icon name="filter" size={30} color="#5f5f5f" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.sort}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 2}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.changScreenSort()}>
                  <Text style={styles.styleText}>S???p x???p</Text>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', marginTop: 8}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.changScreenSort()}>
                  <Icon name="select" size={30} color="#5f5f5f" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.choose}>
            <View style={{marginTop: 8}}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({check: !this.state.check});
                }}>
                <Text>
                  {this.state.check === false ? (
                    <Icon name="ic-filter-change-2" size={30} color="#5f5f5f" />
                  ) : (
                    <Icon name="ic-filter-change" size={30} color="#5f5f5f" />
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {categories.length === 0 ? (
          <View>
            <Text
              style={{fontSize: 30, marginHorizontal: 22, textAlign: 'center'}}>
              Kh??ng c?? s??ch li??n quan ?????n th??? lo???i n??y!!!
            </Text>
          </View>
        ) : this.state.check === false ? (
          this.state.sort === false ? (
            this.displayScreenHorizontal()
          ) : (
            this.displayScreenHorizontalSort()
          )
        ) : this.state.sort === false ? (
          this.displayScreenVertical()
        ) : (
          this.displayScreenVerticalSort()
        )}
      </View>
    );
  }

  render() {
    return <View>{this.main()}</View>;
  }
}

const styles = StyleSheet.create({
  type: {
    marginLeft: -16,
    borderColor: '#d6d7da',
  },
  sort: {
    flex: 3,
    borderWidth: 1.5,
    borderRightColor: 'white',
    borderLeftColor: 'white',
    borderTopColor: '#d6d7da',
    borderBottomColor: '#d6d7da',
  },
  choose: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#d6d7da',
    marginRight: -16,
    alignItems: 'center',
  },
  header: {
    borderColor: 'red',
    height: 50,
    flexDirection: 'row',
    marginHorizontal: 16,
  },
  containerMain: {
    flex: 1,
  },
  containerBody: {
    flex: 1,
    marginHorizontal: 16,
  },
  containerNumber: {
    // flexDirection: 'row',
    flex: 2,
  },
  item: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginTop: 4,
    color: '#4a4a4a',
  },
  titleSize: {
    fontSize: 15,
  },
  titleNumber: {
    opacity: 0.3,
  },
  titleAuthor: {
    opacity: 0.3,
  },
  imageThumbnail: {
    flex: 1,
    width: 190,
    height: 230,
    marginHorizontal: 10,
  },
  search: {
    flex: 1,
    alignItems: 'flex-end',
    marginTop: 8,
  },
  back: {
    flex: 1,
    marginTop: 8,
  },
  styleText: {
    textAlign: 'center',
    marginTop: 15,
  },

  containerMain1: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 1,
    // marginTop: -7,
    flex: 1,
  },
  containerNumber1: {
    flexDirection: 'row',
    flex: 2,
  },
  title1: {
    fontSize: 25,
  },
  titleSize1: {
    fontSize: 20,
  },
  imageThumbnail1: {
    flex: 1,
    height: 200,
    borderRadius: 15,
  },
});

const mapStateToProps = state => {
  return {
    book: state.bookReducer,
  };
};
export default connect(mapStateToProps, null)(Filter);
