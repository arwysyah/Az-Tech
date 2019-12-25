// import React, {Component} from 'react'
// import {View,Text,Stylesheet} from 'react-native'

// export default class History extends Component{

//     render(){
//         return(
//             <View>
//                 <Text>
//                     History
//                 </Text>
//             </View>
//         )
//     }
// }


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
    id:166001
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    axios
      .get(`https://onestopapi.herokuapp.com/user/history/${this.state.id}`)
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
      <View style={{ backgroundColor:"F2F1F1" }}>
       
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

                <TouchableOpacity onPress={() => this.props.onPress({...item})}>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      width: 150,
                      height: 190,
                      borderRadius: 20,
                      backgroundColor: 'violet'
                    }}
                  />
                </TouchableOpacity>

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
                    marginTop: 35,
                    paddingTop: 5,
                    marginLeft: -150,
                    width: 150,
                  }}>
                  {item.name}
                </Text>
                
                <Text 
                  style={{
                    marginTop: 100,
                    marginLeft: -150,
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
          {/* </Container> */}
        </ScrollView>
      </View>
    );
  }
}
