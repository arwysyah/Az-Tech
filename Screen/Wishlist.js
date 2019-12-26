

import React, {Component} from 'react';
import {Image} from 'react-native';
import axios from 'axios';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Icon,
  Left,
  Body,
  View,
  Right,
  Button,
} from 'native-base';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

// import {ScrollView} from 'react-native-gesture-handler';

export default class Wishlist extends Component {
  state = {
    users: [],

  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async() => {
    const userToken = await AsyncStorage.getItem('jwt');
    const user = await decode(userToken);
    userId = user.id;
    console.log(userId, 'user');
    axios
      .get(`https://onestopapi.herokuapp.com/user/history/${userId}`)
      .then(res=>{
        //   console.log('res',res)
        this.setState({
            users:res.data.response
        })
        // console.log(res.data.response,'resdata')
        console.log('users',this.state.users)
      })
  };

  render() {
    // console.log(' ... Opening History Page');

    return (
      <View style={{flex:1, backgroundColor:"#F2F1F1" }}>
       
        <Header style={{ backgroundColor:"#fff", marginBottom: 50, height: 60 }}>
          <View> 
              <Icon
                onPress={() => this.props.navigation.goBack()}
                style={{color: 'black', marginTop: 23, marginLeft: 16}}
                name="arrow-back"
                /> 
           </View> 

           <Body>
            <Text
              style={{
                marginLeft: 24,
                marginRight: 24,
                marginTop: 20,
                width: 213,
                textAlign: 'center',
                backgroundColor: '#fff',
                fontSize: 20
               }}>
              Wishlist
            </Text>  
           </Body>
          
        </Header>
        <ScrollView>
          {/* <Container style={{padding: 21}}> */}
          {/* <TouchableOpacity onPress={() => this.props.onPress({...item})}> */}
               
          {this.state.users.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  marginTop: 24,
                  marginLeft: 24,
                  marginRight: 24,
                  backgroundColor: '#fff',
                  borderRadius: 20,
                }}>

              
              
                <Text
                  style={{
                    alignContent: 'space-between',
                    marginLeft: 15,
                    marginTop: 20,
                    width: 147,
                    fontSize:12,
                    

                   }}>
                   {/* ID Transaction : */}
                  {/* {item.id_transaction}  */}
                </Text>
                
                <Text
                  style={{
                    fontSize: 15,
                  textAlign:'center',
                    marginLeft: -150,
                    width: 150,
                    color:'green'
                  }}>
                  {item.name}
                </Text>
                
                <Text 
                  style={{
                  textAlign:'center',
                    backgroundColor: 'green',
                    color: 'white',
                    borderRadius: 12,
                    height: 28,
                    textAlign: 'center',
                    width: 85
                  }}>
                  {item.status}
                </Text>
                {/* <Text
                  style={{
                    marginTop: 130,
                    marginLeft: -75,
                    backgroundColor: '#a5e830',
                    color: 'white',
                    borderRadius: 15,
                    height: 23,
                    textAlign: 'center',
                    width: 120,
                    position: 'relative',
                  }}>
                  {item.genre}
                </Text> */}
              </View>
              
            );
          })}
            {/* </TouchableOpacity> */}

          {/* </Container> */}
        </ScrollView>
      </View>
    );
  }
}
