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
} from 'react-native';
import {Button, Icon} from 'native-base';
import getDirections from 'react-native-google-maps-directions';
import {ScrollView} from 'react-native-gesture-handler';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import RazorpayCheckout from 'react-native-razorpay';
import Axios from 'axios';
import decode from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Detail extends Component {
  state = {
    order: 5,
    id_user: 166004,
  };

  async componentDidMount() {
    const userToken = await AsyncStorage.getItem('jwt');
    const user = await decode(userToken);
    userId = user.id;
    console.log(userId, 'user');
    let part = this.props.navigation.getParam('part');
  }

  handleGetDirections = () => {
    let part = this.props.navigation.getParam('part');
    console.log(part, 'part');
    const data = {
      //  source: {
      //   latitude: -33.8356372,
      //   longitude: 18.6947617
      // },
      destination: {
        latitude: Number(part.latitude),
        longitude: Number(part.longitude),
      },
      params: [
        {
          key: 'travelmode',
          value: 'driving',
        },
        {
          key: 'dir_action',
          value: 'navigate',
        },
      ],
      //   waypoints: [
      //     {
      //       latitude: -33.8600025,
      //       longitude: 18.697452,
      //     },
      //     {
      //       latitude: -33.8600026,
      //       longitude: 18.697453,
      //     },
      //        {
      //       latitude: -33.8600036,
      //       longitude: 18.697493,
      //     },
      //        {
      //       latitude: -33.8600046,
      //       longitude: 18.69743,
      //     },

      //   ]
    };

    getDirections(data);
  };
  handleSubmit = () => {
    Alert.alert('Confirm Paid', 'Are you want to buy this voucher?', [
      {
        text: 'Cancel',
        onPress: () => console.log('cancel'),
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: async () => {
          try {
            const userToken = await AsyncStorage.getItem('jwt');
            const user = await decode(userToken);
            userId = user.id;
            console.log(userId, 'user');

            let part = this.props.navigation.getParam('part');
            id_partner = part.id_partner;
            console.log(part.id_partner, 'part id');
            console.log(id_partner, 'id');
            // console.log('data',data.id,idBook) //navigator
            let formData = {
              id_user: userId,
              id_partner: id_partner,
            };

            console.log('tipe', formData);
            await Axios.post(
              'https://onestopapi.herokuapp.com/user',
              formData,
            ).then(async () => {
              await Axios.patch(
                `https://onestopapi.herokuapp.com/partner/${id_partner}`,
              ).then(async () => {
                var options = {
                  description: 'Credits towards consultation',
                  image: 'https://i.imgur.com/3g7nmJC.png',
                  currency: 'INR',
                  key: 'rzp_test_1DP5mmOlF5G5ag',
                  amount: '500000000',
                  name: 'kenzo',
                  prefill: {
                    email: 'kenzoymc@razorpay.com',
                    contact: '082369400291',
                    name: 'Razorpay Software',
                  },
                  theme: {color: 'green'},
                };
                await RazorpayCheckout.open(options)
                  .then(data => {
                    // handle success
                    alert(`Success: ${data.razorpay_payment_id}`);
                  })
                  .then(async () => {
                    let data = await AsyncStorage.getItem('jwt');

                    const userToken = await AsyncStorage.getItem('jwt');
                    const user = await decode(userToken);
                    userId = user.id;
                    console.log('user id', user.id);
                    // console.log('resu',user.result) //ini penting
                    let part = this.props.navigation.getParam('part');
                    let id_partner = part.id_partner;
                    id_user = userId;
                    // console.log('data',data.id,idBook) //navigator
                    let formData = {
                      id_user: id_user,
                      id_partner: id_partner,
                    };
                    console.log('user', id_user);
                    console.log('id_patner', id_partner);
                    console.log('forms', formData);
                    // console.log(id_user,id_room, 'data')
                    // console.log('tipe', typeof formData);
                    await Axios.post(
                      'http://onestopapi.herokuapp.com/user/voucher',
                      formData,
                    );
                    console.log(formData, 'fo');
                    console.log('succes');
                    ToastAndroid.show(
                      'Transaction Succesfully',
                      ToastAndroid.SHORT,
                    );
                    // await this.props.dispatch(addBorrow(userId, userToken, formData))
                    // this.checkBorrowed()
                  });
              });
            });
            console.log(part.id_partner);
            console.log('succes');
            ToastAndroid.show('Success Paid Your Coupon', ToastAndroid.SHORT);
          } catch (error) {
            console.log('error', error);
          }
        },
        style: 'default',
      },
    ]);
  };
  handlePlus = () => {
    this.setState({
      order: this.state.order + 1,
    });
    console.log('this', this);
  };
  handleMinus = () => {
    if (this.state.order !== 0) {
      this.setState({
        order: this.state.order - 1,
      });
    }
  };
  render() {
    const part = this.props.navigation.getParam('part');

    return (
      <View>
        <View style={{backgroundColor: '#F2F1F1'}}>
          <View>
            <View style={{backgroundColor: 'white'}}>
              <Button
                transparent
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Icon style={{color: 'black'}} name="arrow-back" />
                <Text style={styles.header}>Detail</Text>
              </Button>
            </View>
          </View>
          <ScrollView>
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
                  source={{uri: part.image}}
                  style={{height: 160, width: 240, borderRadius: 10}}
                />

                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 18,
                    top: 4,
                  }}>
                  {part.name}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 18,
                    top: 4,
                  }}>
                  Stock : {part.stock}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 18,
                    top: 4,
                  }}>
                  {part.location}
                </Text>
              </View>
              <View style={{flexDirection: 'row', top: 110}}></View>
            </View>
            <View style={{height: 200}}>
              <View style={{marginHorizontal: 20, top: 40}}>
                <TouchableOpacity
                  onPress={() => {
                    this.handleSubmit();
                  }}
                  style={styles.button}>
                  <Text style={{left: 5}}>
                    <Icon type="MaterialIcons" name="payment" />
                  </Text>
                </TouchableOpacity>
                <View>
                  <Text>{part.description}</Text>
                </View>
              </View>
            </View>
            <View style={{justifyContent:'center',top:-20,left:120}}> 
              <TouchableOpacity style={styles.button1} onPress={this.handleGetDirections}>
               
                  <Text>Get The Location</Text>
                
              </TouchableOpacity>
            </View>
            <View style={{height: 500, marginHorizontal: 20}}>
              <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={{
                  latitude: Number(part.latitude),
                  longitude: Number(part.longitude),
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}>
                <Marker
                  coordinate={{
                    latitude: Number(part.latitude),
                    longitude: Number(part.longitude),
                  }}
                  title={part.name}>
                  <Callout style={{height: 120}}>
                    <Text>{part.location}</Text>
                    <Text>{part.name}</Text>
                    <Image style={styles.imaps} source={{uri: part.image}} />
                  </Callout>
                </Marker>
              </MapView>
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
