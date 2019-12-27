import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity,StyleSheet} from 'react-native';

export default class Join extends Component {
  state = {
    name: '',
  };
  continue =()=>  {
    this.props.navigation.navigate('ChatScreen', {name: this.state.name});
    console.log('hello')
  };
  render() {
    return (
      <View style={{flex: 1,backgroundColor:'#059dab'}}>
        
        <View style={{top:200,left:40}}>
          <Text style={{fontSize:22,left:74,color:"white"}}>Masukkan Username</Text>
          <TextInput style={styles.input} placeholder="username" onChangeText={name=>{this.setState({name})}}/>
         
              <TouchableOpacity style={styles.button2} onPress={()=>{this.props.navigation.navigate('ChatScreen',{name:this.state.name})}}>
                  
                  <Text style={{top:10,fontWeight:'bold',fontSize:22}}>Submit</Text>
                 
              </TouchableOpacity>
        
        </View>
      </View>
    );
  }
}
const styles=StyleSheet.create({
    input:{
        height:40,
        width:260,
        backgroundColor:'white',
        borderRadius:7,
        left:30
    },
    button2: {
        alignItems: 'center',
    
        textAlign: 'center',
       
        height: 50,
        width: 150,
        alignSelf: 'center',
        // shadowColor:'black',
        backgroundColor: 'yellow',
        borderRadius: 10,
        // shadowOpacity:100,
        borderTopColor: 'black',
        // shadowOffset:30,
        marginLeft: -100,
        top:20
      },
})
