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
import Chatbot from './Screen/ChatBot'
import EditProfile from './Screen/editProfile'
import Join from './Screen/Join'
import ChatScreen from './Screen/ChatScreen'
import DetailVoucher from './Screen/DetailVoucher'

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
  Chatbot: {
    screen: Chatbot,
    navigationOptions: {
     
      header: null,
      tabBarOptions:null
     
    }
  },
 
  Search: {
    screen: Search,
    navigationOptions: {
     
      header: null,
     
    },
  
},

})

const DetailNavigation=createStackNavigator({
  Detail,
  Chatbot
},{
  headerMode:'none'
})

const HistoryNavigation = createStackNavigator({
  History,
  Voucher,
DetailVoucher
}, {
  headerMode: 'none'
})

const ProfileNavigation = createStackNavigator({
  Profile,
  EditProfile
},{
  headerMode:'none'
})

const ChatNavigation = createStackNavigator({
  Join,
  ChatScreen
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

  Join: {
    screen:ChatNavigation,
    navigationOptions: {
      tabBarLabel: 'Inbox',
      tabBarIcon: ({tintColor}) => (
        <Icon
          type="MaterialCommunityIcons"
          name="inbox"
          style={{color: tintColor, fontSize: 30}}
        />
      ),
    },
  },
  Profile: {
    screen: ProfileNavigation,
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