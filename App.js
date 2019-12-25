import React,{Component} from 'react';
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
import Detail from './Screen/Detail'
import SplashScreen from './Screen/SplashScreen'
import Voucher from './Screen/Voucher'
import DetailList from './Screen/DetailList'
import Search from './Screen/Search'
import Test from './Screen/test'

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
  },
  Detail :{
    screen:Detail,
    navigationOptions: {
      header: null
    }
  },
  DetailList :{
    screen:DetailList,
    navigationOptions: {
      header: null
    }
  },
  Search: {
    screen: Search,
    navigationOptions: {
     
      header: null,
     
    }
  
},

})


const HistoryNavigation = createStackNavigator({
  History,
  Voucher
}, {
  headerMode: 'none'
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
            name="home"
            style={{color: tintColor, fontSize: 30}}
          />
        ),
      },
    },
        History: {
      screen: HistoryNavigation,
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
      activeTintColor: '#059dab',
      inactiveTintColor: '#757575',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: {width: 5, height: 3},
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 5,
      },
    },
  },
)
const switchScreen=createSwitchNavigator({
  SplashScreen :SplashScreen,
  Auth : AuthStack,
  App :BottomNavigator

}

)
// export default createAppContainer(
//   createSwitchNavigator(
//     {
//       // Splashscreen: SplashScreen,
//       // AuthLoading: Authloadingscreen,
//       Auth: AuthStack,
//       App: BottomNavigator,
      
//     },
//     {
//       initialRouteName: 'Auth',
//       headerMode: 'none',
//     },
//   ),
// );

const SwitchScreen = createAppContainer(switchScreen)

class App extends Component{
  render(){
    return(
      <View>
      < SwitchScreen />
      </View>
    )
  }
}
export default SwitchScreen

// export default class App extends React.Component{
//   render(){
//     return(
//       < Test />
//     )
//   }
// }