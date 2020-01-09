import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  AsyncStorage,
} from 'react-native';
import iconProfile from '../../../assets/images/Home/app.png';
import {onSignIn} from '../../navigation';
import {connect} from 'react-redux';
import {logOut} from '../../redux/userRedux/actions';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      phoneNumber: '',
      gender: '',
    };
  }

  onLogOut = () => {
    this.props.onLogOutUser();
    onSignIn();
    this.removeEverything();
  };

  removeEverything = async () => {
    try {
      await AsyncStorage.clear();
      alert('Log out successfully!');
    } catch (e) {
      alert('Logout failed');
    }
  };

  componentDidMount() {
    this.onCheck();
  }
  onCheck = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user);

      // console.log(username, email, phoneNumber, gender);

      if (parsed) {
        let fullName = parsed.Data.FullName;
        let email = parsed.Data.Email;
        let phoneNumber = parsed.Data.PhoneNumber;
        let gender = parsed.Data.Gender;
        this.setState({
          fullName: fullName,
          email: email,
          phoneNumber: phoneNumber,
          gender: gender,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {fullName, email, gender, phoneNumber} = this.state;
    return (
      <ScrollView orientation="vertical">
        <View>
          <Image style={style.styleImage} source={iconProfile} />

          <View style={style.styleViewProfile}>
            <Image style={style.styleImageProfile} source={iconProfile} />
          </View>
          <View style={{marginTop: 30, marginHorizontal: 5}}>
            <Text style={style.styleText}>Họ và tên: {fullName}</Text>
            <Text style={style.styleText}>Email: {email}</Text>
            <Text style={style.styleText}>Giới tính: {gender}</Text>
            <Text style={style.styleText}>Tuổi: 21</Text>
            <Text style={style.styleText}>Số điện thoại: {phoneNumber}</Text>
          </View>

          <View style={style.styleViewButtonLogOut}>
            <TouchableWithoutFeedback onPress={this.onLogOut}>
              <Text style={style.button}>Log Out</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  styleImage: {
    width: '100%',
    height: 220,
  },

  styleText: {
    fontSize: 20,
    padding: 5,
  },
  button: {
    borderWidth: 1.5,
    borderRadius: 12,
    fontSize: 24,
    fontWeight: 'bold',
    width: 140,
    padding: 12,
    textAlign: 'center',
    backgroundColor: 'white',
    borderColor: 'blue',
    color: '#a09292',
  },
  styleViewProfile: {
    alignContent: 'center',
    alignItems: 'center',
    marginTop: -80,
  },
  styleImageProfile: {
    borderRadius: 150,
  },
  styleViewButtonLogOut: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
});

const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onLogOutUser: () => {
      dispatch(logOut());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
