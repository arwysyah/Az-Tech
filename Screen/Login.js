import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image, ToastAndroid
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {Item, Button, Input, Icon, Label, Toast, Spinner} from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
// import {use}

export default class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        password: '',
        username: '',
        loginKey: false,
        Image: ['https://res.cloudinary.com/auliasandie/image/upload/v1577108002/Assets%20Aztech/imagelogin_up6av8.jpg', 'https://res.cloudinary.com/auliasandie/image/upload/v1577108001/Assets%20Aztech/imageregister_ckov11.jpg']
      };
    }
    async componentDidMount() {
        data = await AsyncStorage.getItem('jwt')
        console.log('ini data', data)
      try {
        if (await AsyncStorage.getItem('jwt')) {
          this.props.navigation.navigate('App');
        } else {
          this.props.navigation.navigate('AuthScreen');
        }
      } catch (error) {
        console.log(error);
      }
    }
  
    loginUser() {
      const formData = {
        username: this.state.username,
        password: this.state.password,
      };
  
      axios
        .post(`https://onestopapi.herokuapp.com/login`, formData)
        .then(res => {
          console.log(
            'ini res, response,token',
            res,
            // res.data.message,
            // res.data.succes,
            res.data.token,
           
            // res.data.data.token
            
          );
          console.log(res.data.message,'message')
            // console.log('res', res.data.data.token)
          if (res.data.status == 200) {
            AsyncStorage.setItem('jwt', res.data.token);
            this.props.navigation.navigate('Home');
            //  console.log('jwkkkt', data)
           (ToastAndroid.show('Login Success', ToastAndroid.SHORT));
          } else {
            ToastAndroid.show('invalid password', ToastAndroid.SHORT);
          }
          
        })
        .catch(err => {
          console.log(err);
        });
  
      console.log(formData)
      // this.props.navigation.navigate('Home');
      //fungsi login disini
    }
  render() {
    // if (this.state.loginKey) {
    //     console.log(this.state.loginKey,'username')
    //     return this.props.navigation.navigate('Home');
    // }
    return (
    //   <KeyboardAvoidingView behavior="padding" enabled>
    <>
        <SliderBox
          images={this.state.Image}
          sliderBoxHeight={300}
          autoplay="true"
          circleLoop
          onCurrentImagePressed={index =>
            console.warn(`Image ${index} pressed`)
          }
          dotColor="#FFEE58"
          inactiveDotColor="#90A4AE"
          resizeMode={'cover'}
          dotStyle={{marginTop: 10, marginBottom: 11}}
        />
        <View>
          <Text style={styles.textlogin}>
            Become a member and enjoy the benefits!
          </Text>

          <View>
            <Item
              floatingLabel
              style={styles.form}
              >
              <Label style={{color: '#059dab'}}>Username</Label>
              <Input
                autoCapitalize="none"
                returnKeyType="next"
                onChangeText={username => this.setState({username})}
              />
            </Item>
            <Item
              floatingLabel
              style={styles.form}
              >
              <Label style={{color: '#059dab'}}>Password</Label>
              <Input
                secureTextEntry
                autoCapitalize="none"
                returnKeyType="go"
                onChangeText={password => this.setState({password})}
              />
            </Item>
          </View>

          <TouchableOpacity onPress={this.loginUser.bind(this)}>
            <Button
              rounded
              style={styles.buttonlogin}>
              <Text style={{fontSize: 18, color: 'white'}}>SIGN IN</Text>
            </Button>
          </TouchableOpacity>
          {/* {errors && <Text style={styles.errors}>{errors.password}</Text>} */}
        </View>
        <View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={styles.textregister}>
              Don't have an account? SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
        </>
      
    );
  }
}
const styles = StyleSheet.create({
  textlogin: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  form: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 30,
    marginVertical: 5,
    marginLeft: 40,
    justifyContent: 'center',
    width: '80%',
    borderRadius: 5,
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
  textregister: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 15,
  },
});