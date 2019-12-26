import React, {Component} from 'react'
import {View,Text,Stylesheet} from 'react-native'

export default class Home extends Component{

    render(){
        return(
            <View>
                <Text>
                    History
                </Text>
            </View>
        )
    }
}
// import React, {Component} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Image,
// } from 'react-native';
// import {Button, Badge, Icon} from 'native-base';
// import axios from 'axios';
// import AsyncStorage from '@react-native-community/async-storage';
// import decode from 'jwt-decode';

// class Home extends Component {
//   state = {
//     partner: [],
//     name: '',
//   };

//   async componentDidMount() {
//     // let data = await AsyncStorage.getItem('jwt')
//     //  let profile= decode(data)
//     //  this.setState({
//     //    name:profile.result.username
//     //  })
//     try {
//       await axios
//         .get('https://onestopapi.herokuapp.com/partner')
//         .then(result => {
//           this.setState({
//             partner: result.data.response,
//           });
//           console.log(result, 'result');
//           // console.log(this.state.partner)
//         });
//     } catch (error) {
//       console.log(error);
//     }

//     const userToken = await AsyncStorage.getItem('jwt');
//     const user = await decode(userToken);

//     console.log(user.username, 'usern');
//     this.setState({
//       name: user.username,
//     });
//   }

//   render() {
//     return (
//       <View style={{backgroundColor: '#059dab', flex: 1}}>
//         {/* <View> */}
//           {/* <View> */}
//             <View style={styles.topNav}>
//               <TouchableOpacity
//                 onPress={() => {
//                   this.props.navigation.navigate('Search');
//                 }}>
//                 <Icon
//                   style={{color: 'black', alignItems: 'center'}}
//                   name="search"
//                 />
//               </TouchableOpacity>
//             </View>

//             <View>
//               <Text style={styles.title}>Hello {this.state.name}!</Text>
//             </View>
//           {/* </View> */}
//         {/* </View> */}

//         {/* POPULAR MERCHANT */}
        
//         <ScrollView showsHorizontalScrollIndicator={false}>
//           <View style={styles.container}>
//             <Text style={{paddingLeft: 30, fontSize: 20, top: 20}}>
//               Popular Merchants
//             </Text>
//             {/* <ScrollView
//             horizontal={true}> */}
//             <ScrollView
//               showsHorizontalScrollIndicator={false}
//               horizontal={true}
//               style={styles.scroll}>
//               <View
//                 style={{flexDirection: 'row', paddingRight: 20, marginTop: 15}}>
//                 {this.state.partner.map((part, index) => (
//                   <View style={{top: 30, paddingRight: 20}} key={index}>
//                     <TouchableOpacity
//                       onPress={() => {
//                         this.props.navigation.navigate('Detail', {
//                           part: {...part},
//                         });
//                       }}>
//                       <Image
//                         source={{uri: part.image}}
//                         style={{borderRadius: 10, height: 150, width: 120}}
//                       />
//                     </TouchableOpacity>
//                     <Text
//                       style={{
//                         textAlign: 'center',
//                         marginTop: 10,
//                         fontSize: 18,
//                       }}>
//                       {part.name}
//                     </Text>
//                     <Text style={{textAlign: 'center', fontSize: 13}}>
//                       {part.location}
//                     </Text>
//                   </View>
//                 ))}
//               </View>
//             </ScrollView>
//           </View>

//           {/* ALL MERCHANT */}
          
//             <View style={styles.experienceView}>            
//               {this.state.partner.map((part, index) => (
//                 <View
//                   style={{width: 160, marginTop: 80, marginLeft: 20}}
//                   key={index}>
//                   <TouchableOpacity
//                     onPress={id => {
//                       this.props.navigation.navigate('Detail', {
//                         part: {...part},
//                       });
//                     }}>
//                     <Image
//                       style={{height: 100, width: 145, borderRadius: 5, top: 8}}
//                       source={{uri: part.image}}
//                     />
//                     <Text
//                       style={{fontSize: 15, color: '#059dab', marginTop: 15}}>
//                       {part.name.toUpperCase()}
//                     </Text>
//                     <Text style={styles.commonText}>
//                       {part.location.toUpperCase()}
//                     </Text>
//                     <Text style={{fontSize: 16, color: 'grey'}}>
//                       Rp. {part.price}
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               ))}

//               <View style={{top: 40, paddingLeft: 10, alignItems: 'center'}}>
//                 <Text
//                   style={{
//                     fontSize: 15,
//                     alignItems: 'center',
//                     color: 'grey',
//                   }}></Text>
//               </View>
//             </View>
            
          

//           <View
//             // key={index}
//             style={{
//               flexDirection: 'row',
//               marginLeft: 5,
//               paddingRight: 20,
//               flex: 1,
//               borderRadius: 15,
//               height: 280,
//               paddingLeft: 20,
//               top: 60,
//               backgroundColor: 'white',
//             }}>
//             <View style={styles.ViewData1}>
//               {/* <TouchableOpacity
//                         onPress={id => {
//                           this.props.navigation.navigate('DetailStay', {
//                             st: {...st},
//                           });
//                         }}> */}
//               <View>
//                 <Image
//                   source={require('../Assets/experiences.jpg')}
//                   style={{
//                     height: 120,
//                     width: 140,
//                     borderRadius: 5,
//                     top: 20,
//                   }}
//                 />
//               </View>
//               <View style={{top: 5, flexDirection: 'row'}}>
//                 <Badge style={styles.Badge}>
//                   <Text>nama</Text>
//                 </Badge>
//               </View>
//               <View>
//                 <Text style={{top: 10, fontSize: 17}}>hello</Text>
//                 <Text style={{fontSize: 17, fontWeight: 'bold', top: 10}}>
//                   Rp. /malam
//                 </Text>
//               </View>
//               {/* </TouchableOpacity> */}
//             </View>
//             <View style={styles.ViewData1}>
//               {/* <TouchableOpacity
//                         onPress={id => {
//                           this.props.navigation.navigate('DetailStay', {
//                             st: {...st},
//                           });
//                         }}> */}
//               <View>
//                 <Image
//                   source={require('../Assets/experiences.jpg')}
//                   style={{
//                     top: 20,
//                     height: 120,
//                     width: 140,
//                     borderRadius: 5,
//                   }}
//                 />
//               </View>
//               <View style={{top: 5, flexDirection: 'row'}}>
//                 <Badge style={styles.Badge}>
//                   <Text>nama</Text>
//                 </Badge>
//               </View>
//               <View>
//                 <Text style={{top: 10, fontSize: 17}}>hello</Text>
//                 <Text style={{fontSize: 17, fontWeight: 'bold', top: 10}}>
//                   Rp. /malam
//                 </Text>
//               </View>
//               {/* </TouchableOpacity> */}
//             </View>
//           </View>
//           {/* <View style={{}}></View> */}
//         </ScrollView>
//       </View>
//     );
//   }
// }
// export default Home;
// const styles = StyleSheet.create({
//   topNav: {
//     backgroundColor: 'white',
//     width: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 50,
//     height: 40,
//     marginLeft: 300,
//     top: 30,
//   },
//   experienceView: {
//     marginTop: 90,

//     flexDirection: 'row',

//     flexWrap: 'wrap',
//     paddingHorizontal: 20,
//     backgroundColor: 'white',
//     borderRadius: 29,
//   },
//   commonText: {
//     fontSize: 16,
//   },
//   ViewData1: {
//     shadowColor: 13,
//     borderRadius: 12,
//     height: 240,
//     width: 220,
//     flex: 1,
//   },
//   container: {
//     backgroundColor: 'white',
//     borderRadius: 28,
//     top: 35,
//   },
//   Badge: {
//     backgroundColor: 'white',
//     borderColor: 'black',
//     borderBottomWidth: 1,
//     borderRightWidth: 1,
//     borderLeftWidth: 1,
//     borderTopWidth: 1,
//     width: 145,
//     height: 20,
//   },
//   scroll: {
//     paddingLeft: 20,
//     flexDirection: 'row',
//     height: 300,
//   },
//   title: {
//     fontSize: 28,
//     marginTop: 5,
//     fontWeight: 'bold',
//     marginLeft: 25,
//     color: 'white',
//   },
// });
