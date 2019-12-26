import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {IonIcons, MaterialIcons} from 'react-native-vector-icons';
import {Left, Icon, Button, Item, Label, Input, Toast} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import decode from 'jwt-decode';
import axios from 'axios';
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      fullname: '',
      email: '',
      password: '',
      isToken: false,
      id_user: 166001,
      user: [],
    };
  }

  getUser = async () => {
    let data = await AsyncStorage.getItem('jwt');
    console.log('test', decode(data));
    console.log('ini data', data);
    let profile = decode(data);
    let id = profile.id;
    console.log(id, 'iu');
    axios.get(`https://onestopapi.herokuapp.com/user/${id}`).then(res => {
      this.setState({user: res.data.response[0]});
      console.log('ress', res);
    });
  };
  onRefresh = async () => {
    let data = await AsyncStorage.getItem('jwt');
    console.log('test', decode(data));
    console.log('ini data', data);
    let profile = decode(data);
    let id = profile.id;
    console.log(id, 'iu');
    axios.get(`https://onestopapi.herokuapp.com/user/${id}`).then(res => {
      this.setState({user: res.data.response[0]});
      console.log('ress', res);
    });
  };

  //    handleSave=async()=>{
  //     let data = await AsyncStorage.getItem('jwt');
  //     console.log('test', decode(data));
  //     console.log('ini data', data)
  //     let profile = decode(data);
  //     let id=profile.id
  //     console.log(id,'profile')
  // let formData={
  //       username: this.state.username,
  //       password: this.state.password,
  //       fullname:this.state.fullname,
  //       email:this.state.email
  //     }
  //      console.log('f',formData)
  //      axios.patch(`https://onestopapi.herokuapp.com/user/update/${id}`,formData).then(res=>{
  //        console.log('res adlah',res.data.response)
  //      })
  //     }
  async componentDidMount() {
    this.onRefresh()
    
    await this.getUser();
    // let data = await AsyncStorage.getItem('jwt');
    // console.log('test', decode(data));
    // console.log('ini data', data)
    // let profile = decode(data);
    // console.log(profile,'profile')
    // this.setState({
    //   username: profile.username,
    //   password: profile.password,
    //   fullname:profile.fullname,
    //   email:profile.email
    // });
    console.log(this.state.username, 'user');
  }
  //   async deleteToken  (){
  //     Alert.alert(
  //       'Logout',
  //       'Are You Sure Want to Logout?',
  //       [

  //         {
  //           text: 'Cancel',
  //           onPress: () => console.log('Cancel Pressed'),
  //           style: 'cancel',
  //         },
  //         {text: 'OK', onPress: async() => {
  //           try {

  //             await AsyncStorage.removeItem('jwt')
  //             this.props.navigation.navigate('Login')
  //           } catch (err) {
  //             console.log(`The error is: ${err}`)
  //           }

  //         }},
  //       ],
  //       {cancelable: false},
  //     )

  //     let token = AsyncStorage.jwt
  // console.log('local',AsyncStorage,token)

  //   }
  // handleSave=()=>{
  //   // console.log('hello')
  //   // console.log('usernm',this.state.username)
  //   let form = {
  //     username:this.state.username,
  //     email:this.state.email,
  //     fullname:this.state.fullname
  //   }
  //   console.log('form',form)
  // }

  handleChange = key => val => {
    this.setState({[key]: val});
    console.log(val, 'val');
  };

  render() {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{horizontal: 'true', flex: 1}}>
        <View style={{flex: 1, backgroundColor: '#F2F1F1'}}>
        <TouchableOpacity onPress={() => this.onRefresh()}>
            
            <Icon style={{color: 'black', right: -170}} name="refresh" />
        
        </TouchableOpacity>
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
          </View>
          {/* <Image source={require('../Assets/profilebackground.png')} style={{width: 100, height: 100,resizeMode:'contain'}}/> */}
          <View style={{alignSelf: 'center'}}>
            <View style={styles.profileImage}>
              <Image
                source={require('../Assets/profiluser.png')}
                style={styles.image}></Image>
            </View>
            <Text style={styles.textname}>{this.state.username}</Text>
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
                <Label> username</Label>
                <Input
                  value={this.state.user.username}
                  returnKeyType="next"
                  onChangeText={this.handleChange('username')}
                />
              </Item>
              <Item inlineLabel last style={styles.form}>
                <Label>fullname</Label>
                <Input
                  value={this.state.user.fullname}
                  onChangeText={this.handleChange('fullname')}
                  returnKeyType="next"
                />
              </Item>
              <Item inlineLabel style={styles.form}>
                <Label>Email</Label>
                <Input
                  value={this.state.user.email}
                  onChangeText={this.handleChange('email')}
                  returnKeyType="next"
                />
              </Item>
              <Item inlineLabel last style={styles.form}>
                <Label>Password</Label>
                <Input secureTextEntry returnKeyType="go" />
              </Item>
            </View>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('EditProfile')}>
              <Button
                // onPress={()=>this.handleSave()}
                rounded
                style={styles.buttonlogin}>
                <Text style={{fontSize: 18, color: 'white'}}>Edit</Text>
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
