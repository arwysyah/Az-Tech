import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Dimensions,
  RefreshControl
} from 'react-native';
import {Button, Icon} from 'native-base';

import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios'




export default class DetailVoucher extends Component {
  state = {
    order: 5,
    id_user: 166004,
    item :this.props.navigation.getParam('item'),
    partner:[],
    latitude: 0,
    longitude: 0,
  };

  async componentDidMount() {
     
   
  }
  
  updateVoucher=async()=>{
   await axios.patch(`https://onestopapi.herokuapp.com/partner/v/voucher/${this.state.item.id}`).then(res=>
    console.log(res,'res')).then(ToastAndroid.show('update succesfull',ToastAndroid.SHORT) )
  }
  
  render() {
    console.log(this.state.item ,'item list')
    
 
    return (
      <View>
        {/* <Text>
          hello
          {this.state.partner.location}
        </Text> */}
        <View style={{backgroundColor: '#F2F1F1'}}
         >
          <View>
            <View style={{backgroundColor: 'white'}}>
              <Button
                transparent
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Icon style={{color: 'black'}} name="arrow-back" />
                <Text style={styles.header}>DetailVoucher</Text>
              </Button>
            </View>
          </View>
          <ScrollView
          // 
          >
            <View
              style={{
                height: 270,
                paddingHorizontal: 20,
                backgroundColor: 'white',
                top: 20,
                borderRadius: 20,
              }}>
              <View style={styles.card}>
                <Image
                  source={{uri: this.state.item.image}}
                  style={{height: 160, width: 240, borderRadius: 10}}
                />

                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 18,
                    top: 4,
                  }}>
                  {this.state.item.name}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 18,
                    top: 4,
                  }}>
                  ID  : {this.state.item.id_voucher}
                </Text>
                {/* <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 18,
                    top: 4,
                  }}>
                  {partner.location}
                </Text> */}
              </View>
              <View style={{flexDirection: 'row', top: 110}}></View>
            </View>
            <View style={{height: 200}}>
              <View style={{marginHorizontal: 20, top: 40}}>
                <TouchableOpacity
                  onPress={() => {
                    this.updateVoucher();
                  }}
                  style={styles.button}>
                  <Text style={{fontSize:24,color:'white',top:6}}> {this.state.item.status}
                  
                  </Text>
                </TouchableOpacity>
                
              </View>
            </View>
            
            <View style={{height: 500, marginHorizontal: 20}}>
             
            </View>
          </ScrollView>
          
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    color: 'black',
    fontSize: 23,
    alignContent: 'center',
    left: -140,
    fontWeight: 'bold',
  },
  card: {
    height: 160,
    width: 240,
    backgroundColor: 'black',
    top: 40,
    left: 40,
    borderRadius: 10,
  },
  textinput: {
    backgroundColor: '#E5E6EE',
    borderWidth: 1,
    borderRadius: 7,
    left: 30,
    height: 40,
    width: 180,
    textAlign: 'center',
  },
  box: {
    height: 40,
    width: 120,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderRadius: 5,
    left: 100,
    top: -35,
  },
  button: {
    alignItems: 'center',

    textAlign: 'center',
   
    height: 45,
    width: 120,
    // shadowColor:'black',
    backgroundColor: 'green',
    borderRadius: 10,
    // shadowOpacity:100,
    borderTopColor: 'black',
    // shadowOffset:30
  },
  button1: {
    alignItems: 'center',
alignContent:'center'
,    textAlign: 'center',
    justifyContent: 'center',
    height: 30,
    width: 120,
    // shadowColor:'black',
    backgroundColor: 'yellow',
    borderRadius: 5,
    // shadowOpacity:100,
    borderTopColor: 'black',
    // shadowOffset:30
  },
  map: {
    height: 400,
  },
  imaps: {
    height: 80,
    width: 80,
    marginTop: 10,
    left: 20,
  },
});
