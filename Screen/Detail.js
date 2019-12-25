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

import {ScrollView} from 'react-native-gesture-handler';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import RazorpayCheckout from 'react-native-razorpay';
import Axios from 'axios';
import decode from 'jwt-decode'
import AsyncStorage from '@react-native-community/async-storage'

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
    userId=user.id
    console.log(userId,'user')
    let part = this.props.navigation.getParam('part');
  }
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
            userId=user.id
            console.log(userId,'user')

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
                  theme: {color: '#F37254'},
                };
                await RazorpayCheckout.open(options)
                  .then(data => {
                    // handle success
                    alert(`Success: ${data.razorpay_payment_id}`);
                  })
                  .then(async () => {
                    let data =await  AsyncStorage.getItem('jwt');
               
                    const userToken = await AsyncStorage.getItem('jwt');
                    const user = await decode(userToken);
                    userId=user.id
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
                      'Booking Successfuly',
                      ToastAndroid.SHORT,
                    );
                    // await this.props.dispatch(addBorrow(userId, userToken, formData))
                    // this.checkBorrowed()
                  });
              });
            });
            console.log(part.id_partner);
            console.log('succes');
            ToastAndroid.show('Succes Wishlist', ToastAndroid.SHORT);
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
                  {part.location}
                </Text>
              </View>
              <View style={{flexDirection: 'row', top: 110}}>
                {/* <TouchableOpacity>
              <Icon
                type="Feather"
                name="minus-circle"
                style={{left: 48, top: 5}}
              />
            </TouchableOpacity> */}
                {/* <View style={styles.box}>
                  <Text style={{textAlign: 'center', fontSize: 30}}>
                    {this.state.order}
                  </Text>
                </View> */}

                {/* <Icon
              type="Feather"
              name="plus-circle"
              size={28}
              style={{left: 90, top: 5}}
            /> */}
              </View>
              {/* <View>
                <TouchableOpacity
                  onPress={() => {
                    this.handleMinus();
                  }}>
                  <Icon
                    type="Feather"
                    name="minus-circle"
                    style={{left: 48, top: 10}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    // this.handlePlus();
                    this.handleSubmit();
                  }}>
                  <Icon
                    type="Feather"
                    name="plus-circle"
                    style={{left: 48, top: 30}}
                  />
                </TouchableOpacity>
              </View> */}
            </View>
            <View style={{height: 600}}>
              <View style={{marginHorizontal:20, top: 40}}>
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
                  <Text>
                    Description is something that gets in the way of many
                    authors. Why? Well, because it's so darn hard to write. And
                    no wonder. If you're not careful, descriptive sequences can
                    become static, even dull. Writing action and dialogue is so
                    much more fun. On top of that, description incorporates so
                    many elements. It doesn't just cover describing the setting
                    -- it also involves descriptions of the characters' clothes
                    and appearance, the "props" your characters use, the
                    weather, and so forth. If you're not very accomplished at
                    writing description, then sometimes you might want to avoid
                    writing it. But then, you can wind up with stories where
                    people wander vague hallways or buildings, and readers don't
                    get a sense of time or place from your story. A story
                    without enough description is missing something. People who
                    read a story that's lacking in description might ask "Where
                    does this take place? Are there buildings around them?" I
                    must admit that often happens when people look at my early
                    drafts.
                  </Text>
                </View>
              </View>
            </View>

            <View style={{height: 500,marginHorizontal:20}}>
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
                  <Text>{part.owner}</Text>
                  <Text>{part.name}</Text>
                  <Image style={styles.imaps} source={{uri: part.image_url}} />
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
    justifyContent: 'center',
    height: 45,
    width: 120,
    // shadowColor:'black',
    backgroundColor: 'green',
    borderRadius: 10,
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
