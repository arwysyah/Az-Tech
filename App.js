import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import {createBottomTabNavigator} from 'react-navigation-tabs';
import Home from './Screen/Home'
import { createStackNavigator } from 'react-navigation-stack'
import Login from './Screen/Login'
import Register from './Screen/Register'
import History from './Screen/History'
import {Icon} from 'native-base'
import Wishlists from './Screen/Wishlist'
import Profile from './Screen/Profile'


const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
      tabBarVisible: false,
      header: null,
    },
  },
  Register: {
    screen: Register,
    navigationOptions: {
      tabBarVisible: false,
      header: null,
    },
  },
});
const AppStack= createStackNavigator({
  Home :{
    screen:Home,
    navigationOptions: {
      header: null
    }
  }
})

const BottomNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: AppStack,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => (
          <Icon
            type="Ionicons"
            name="ios-home"
            style={{color: tintColor, fontSize: 30}}
          />
        ),
      },
    },
        History: {
      screen: History,
      navigationOptions: {
        tabBarLabel: 'History',
        tabBarIcon: ({tintColor}) => (
          <Icon
            type="MaterialCommunityIcons"
            name="history"
            style={{color: tintColor, fontSize: 30}}
          />
        ),
      },
    },
  //   Wishlists:{
  //     screen: Wishlists,
  //     navigationOptions:{
  //       tabBarLabel:'Wishlist',
  //       tabBarIcon:({tintColor})=>{
  //         <Icon
  //         type="AntDesign"
  //         name="inbox"
  //         style={{color: tintColor, fontSize: 23}}
  //       />
  //       }
  //     }
  //   }
  // },
  Wishlists: {
    screen: Wishlists,
    navigationOptions: {
      tabBarLabel: 'Wishlists',
      tabBarIcon: ({tintColor}) => (
        <Icon
          type="MaterialCommunityIcons"
          name="heart"
          style={{color: tintColor, fontSize: 30}}
        />
      ),
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({tintColor}) => (
        <Icon
        type="FontAwesome5"
        name="user-tie"
          style={{color: tintColor, fontSize: 30}}
        />
      ),
    },
  },
  
},
  {
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: '#757575',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: {width: 5, height: 3},
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5,
      },
    },
  },
)

export default createAppContainer(
  createSwitchNavigator(
    {
      // Splashscreen: SplashScreen,
      // AuthLoading: Authloadingscreen,
      Auth: AuthStack,
      App: BottomNavigator,
      
    },
    {
      initialRouteName: 'Auth',
      headerMode: 'none',
    },
  ),
);

// import React, {Component} from 'react'
// import {View} from 'react-native'
// import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
// import Login from './Screen/Login'

// export default class App extends Component{
//   render(){
//     return(
//       <View>
//         <Login />
//       </View>
//     )
//   }
// }
