

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import ChatBot from 'react-native-chatbot';

const steps = [
  {
    id: '0',
    message: 'Welcome Az Tech!',
    trigger: '1',
  },
  {
    id: '1',
    message: 'May I Help You!',
    trigger: '2',
  },
  {
    id: '2',
    user: true,
    trigger: '3',
  },
  {
    id: '3',
    message: 'okay , Tell Me Please',
    trigger: '4',
  },
  {
    id: '4',
    user: true,
    trigger: '5',
  },
  {
    id: '5',
    message:
      'okay, after you are registered as our customer, you can choose a store that is our partner, here we offer affordable prices, where with the price of 90000 you can get a voucher worth one hundred thousand while the stock is still there, and the voucher can be exchanged to Our partner stores, at least shopping to exchange vouchers, it costs 50000',
    trigger:'6'
    },
    {
      id:'6',
      message:'does that help you?',
      trigger:'7'
    },
    {
      id:'7',
      options: [
        { value: 1, label: 'yes', trigger: '8' },
        { value: 2, label: 'no', trigger: '9' },
        
      ],
    },
    // {
    //   id:'8',
    //   user:true,
    //   end:true

    // },
    {
      id:'8',
      message:'okay ,thank you for using our services',
      trigger:'9'
    },
    {
      id:'9',
      message:'please contact our number at 0872727272',
      end:true
    }
];

class Chatbot extends Component {
  render() {
    return (
      <View>
        <ChatBot steps={steps} />
      </View>
    );
  }
}

export default Chatbot;
