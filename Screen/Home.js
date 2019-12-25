import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {Button, Icon} from 'native-base';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import decode from 'jwt-decode'

export default class Home extends Component {
state={
  partner:[]
}


async componentDidMount(){
  // let data = await AsyncStorage.getItem('jwt')
  //  let profile= decode(data)
  //  this.setState({
  //    name:profile.result.username
  //  })
  try { await 
    axios.get('https://onestopapi.herokuapp.com/partner').then(
    result=>{this.setState({
      partner:result.data.response
    })
      console.log(result, 'result')
      // console.log(this.state.partner)
    }
  )
    
  } catch (error) {
    console.log(error)
    
  }

  
 

}

  render() {
    
    return (
      <View style={{backgroundColor: '#F2F1F1', flex: 1}}>
        <View>
          <View>
            <View style={styles.topNav}>
              <TouchableOpacity>
                <Icon
                  style={{color: 'black', alignItems: 'center'}}
                  name="search"
                />
              </TouchableOpacity>
            </View>

            <View>
              <Text
                style={styles.title}>
                Hello Arwy
              </Text>
            </View>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text style={{paddingLeft: 30, fontSize: 15, top: 20}}>
              Popular Merchants
            </Text>
            {/* <ScrollView
            horizontal={true}> */}
            <ScrollView horizontal={true} style={styles.scroll}>
              <View style={{flexDirection: 'row', paddingRight: 20}}>
                {this.state.partner.map((part,index)=>(
                <View style={{top: 30, paddingRight: 20}}
                key={index}>
                  <TouchableOpacity
                   onPress={()=>{
                     this.props.navigation.navigate('Detail',{
                       part: {...part},
                     })
                   }}>
                    <Image
                      source={{uri:part.image}}
                      style={{borderRadius: 10, height: 150, width: 120}}
                    />
                  </TouchableOpacity>
                  <Text style={{textAlign: 'center'}}>{part.name}</Text>
  <Text style={{textAlign: 'center'}}>{part.location}</Text>
                </View>
                ))}
                {/* <View style={{top: 30, paddingRight: 20}}>
                  <Image
                    source={require('../Assets/experiences.jpg')}
                    style={{borderRadius: 10, height: 150, width: 120}}
                  />
                  <Text style={{textAlign: 'center'}}>Nama Merchants</Text>
                  <Text style={{textAlign: 'center'}}>price</Text>
                </View>
                <View style={{top: 30}}>
                  <Image
                    source={require('../Assets/experiences.jpg')}
                    style={{borderRadius: 10, height: 150, width: 120}}
                  />
                  <Text style={{textAlign: 'center'}}>Nama Merchants</Text>
                  <Text style={{textAlign: 'center'}}>price</Text>
                </View> */}
              </View>
            </ScrollView>
          </View>
          {/* <View style={{}}></View> */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topNav: {
    backgroundColor: 'white',
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    height: 40,
    marginLeft: 300,
    top: 8,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 28,
    top: 35,
  },
  scroll: {
    paddingLeft: 20,
    flexDirection: 'row',
    height: 300,
  },
  title:{
  
        fontSize: 28,
       
        fontWeight: 'bold',
        marginLeft: 25,
     
  }
});
