
import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

export default class SplashScreen extends Component {
  async componentDidMount() {
    {
      try {
        if (await AsyncStorage.getItem('jwt')) {
          setTimeout(() => {
            // go to Home page
            this.props.navigation.navigate('App');
          }, 3000);
        } else {
          setTimeout(() => {
            // go to Login page
            this.props.navigation.navigate('Auth');
          }, 3000);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    console.log(AsyncStorage.getItem('jwt'))
    
    return (
      <View style={{flex: 1, backgroundColor: '#02656b'}}>
        <View
          style={{
            height: 200,
            alignContent: 'center',
            justifyContent: 'center',
            top: 150,
          }}>
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#FF5A5F" />
          </View>
          <Text style={styles.airkab}>
            AZ-Tech
          </Text>
          <Image source={require('../Assets/imagelogin.jpg')} style={styles.imageair} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  imageair: {
    alignContent: 'center',
    height: 90,
    width: 90,
    left: 140,
    tintColor: '#FF5A5F',
    top:40,

    borderRadius: 15,
  },
  airkab:{
    color: '#FF5A5F', fontSize: 30, textAlign: 'center'
  }
});
