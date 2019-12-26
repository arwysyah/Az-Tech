import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  ToastAndroid, Picker
} from 'react-native';
import {IonIcons, MaterialIcons} from 'react-native-vector-icons';
import {Left, Icon, Button, Item, Label, Input, Toast} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import decode from 'jwt-decode';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        formData: {
      username: '',
      fullname: '',
      email: '',
      password: '',
      photos: '',
      isToken: false,
    },
    showToast: false,
    isLoading: false

    }
  }
 handleChange () {
 const formData = {
  email: this.state.email,
  password: this.state.password,
  username: this.state.username,
  fullname: this.state.fullname
};
if (formData.fullname.length < 4){
  ToastAndroid.show(
    `Fullname can't be empty`,
    ToastAndroid.LONG,
    ToastAndroid.CENTER,
  );
} else if (formData.username.length < 4 ){
  ToastAndroid.show(
    `Username can't be empty`,
    ToastAndroid.LONG,
    ToastAndroid.CENTER,
  );
} else if (formData.email.length < 4 ){
  ToastAndroid.show(
    `Email can't be empty`,
    ToastAndroid.LONG,
    ToastAndroid.CENTER,
  );
} else if (formData.password.length < 4 ){
  ToastAndroid.show(
    `Password can't be empty`,
    ToastAndroid.LONG,
    ToastAndroid.CENTER,
  );
} else {

axios.patch('https://onestopapi.herokuapp.com/user/update/', formData)
.then(res => {
  console.log(
    'ini res, response,token',
    res,
    res.data.message,
    res.data.succes,
    );ToastAndroid.show("Update succes",ToastAndroid.SHORT)
    // this.props.navigation.navigate('Login')
  })
  .catch(err=>{
      console.log(err.response.data.message);
      ToastAndroid.show(err.response.data.message, ToastAndroid.LONG)
  })

}}
  

  async componentDidMount() {
    let data = await AsyncStorage.getItem('jwt');
    console.log('test', decode(data));
    console.log('ini data', data);
    let profile = decode(data);
    console.log(profile, 'profile');
    this.setState({
      username: profile.username,
      password: profile.password,
    });
    console.log(this.state.username, 'user');
  }
  async deleteToken() {
    Alert.alert(
      'Logout',
      'Are You Sure Want to Logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('jwt');
              this.props.navigation.navigate('Login');
            } catch (err) {
              console.log(`The error is: ${err}`);
            }
          },
        },
      ],
      {cancelable: false},
    );

    let token = AsyncStorage.jwt;
    console.log('local', AsyncStorage, token);
  }

  render() {

    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{horizontal: 'true', flex: 1}}>
        <View style={{flex: 1, backgroundColor: '#F2F1F1'}}>
          <View style={{flexDirection: 'row'}}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon
                type="FontAwesome"
                name="chevron-left"
                style={{color: 'black', fontSize: 20, marginTop: 50}}
              />
              <Text style={{marginTop: 45, fontSize: 25, marginLeft: 10}}>
                Profile
              </Text>
            </Button>
            <Button transparent onPress={() => this.deleteToken()}>
              <Icon type="FontAwesome"
              name="sign-out"
              style={{color: 'black', fontSize: 25, marginTop: 50, marginLeft: 250}}/>
            </Button>
          </View>
          <View style={{alignSelf: 'center'}}>
            <View style={styles.profileImage}>
              <Image
                source={require('../Assets/profiluser.png')}
                style={styles.image}></Image>
            </View>
            <Text style={styles.textname}>{this.state.username}</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('History')}>
              <Button rounded style={styles.edit}>
                <Text style={{fontSize: 16, color: 'black'}}>History</Text>
              </Button>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: '#Ffff',
              height: 400,
              borderRadius: 25,
              width: 400,
              marginTop: 15,
              alignSelf: 'center',
            }}>
            <View style={styles.profile}>
              <Item inlineLabel style={styles.form}>
                <Label>Username</Label>
                <Input returnKeyType="next"
                onChangeText={(text)=>this.handleChange('username',text)} />
              </Item>
              <Item inlineLabel last style={styles.form}>
                <Label>Fullname</Label>
                <Text>{this.state.fullname}</Text>
                <Input returnKeyType="next"
                onChangeText={(text)=>this.handleChange('fullname',text)} />
              </Item>
              <Item inlineLabel style={styles.form}>
                <Label>Email</Label>
                <Input returnKeyType="next"
                onChangeText={(text)=>this.handleChange('email',text)} />
              </Item>
              <Item inlineLabel last style={styles.form}>
                <Label>Password</Label>
                <Input secureTextEntry returnKeyType="go"
                onChangeText={(text)=>this.handleChange('password',text)} />
              </Item>
            </View>
            <TouchableOpacity onPress={this.handleChange}>
              <Button rounded style={styles.buttonlogin}>
                <Text style={{fontSize: 18, color: 'white'}}>SAVE</Text>
              </Button>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    // flex: 1,
    width: 170,
    height: 170,
    borderRadius: 200,
    alignSelf: 'center',
  },
  profileImage: {
    width: 170,
    height: 170,
    borderRadius: 63,
    overflow: 'hidden',
    marginTop: 35,
  },
  textname: {
    marginTop: 20,
    fontSize: 25,
    textAlign: 'center',
  },

  edit: {
    marginTop: 10,
    backgroundColor: 'white',
    paddingVertical: 25,
    // paddingHorizontal: 10,
    width: '50%',
    height: '5%',
    // height: '10%',
    justifyContent: 'center',
    // marginLeft: 30,
    borderRadius: 250,
    alignSelf: 'center',
  },
  profile: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 30,
    padding: 5,
    paddingVertical: 10,
  },
  form: {
    marginTop: 1,
    marginVertical: 5,
  },
  buttonlogin: {
    marginTop: 30,
    backgroundColor: '#059dab',
    paddingVertical: 25,
    width: '50%',
    justifyContent: 'center',
    marginLeft: 100,
    borderRadius: 5,
  },
});
