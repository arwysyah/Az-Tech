import React, { Component } from 'react'
import {View,Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ToastAndroid} from  'react-native'
import {SliderBox} from 'react-native-image-slider-box'
import {Item, Button, Input, Icon, Label} from 'native-base'
import axios from 'axios'

export default class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      username: '',
      password: '',
      Image: ['https://res.cloudinary.com/auliasandie/image/upload/v1577108002/Assets%20Aztech/imagelogin_up6av8.jpg', 'https://res.cloudinary.com/auliasandie/image/upload/v1577108001/Assets%20Aztech/imageregister_ckov11.jpg']
    };
  }

  registerUser() {
    const formData = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
      fullname: this.state.fullname
    };

    axios.post('https://onestopapi.herokuapp.com/register', formData)
    .then(res => {
      console.log(
        'ini res, response,token',
        res,
        res.data.message,
        res.data.succes,
        res.data.token,);ToastAndroid.show("Register succes",ToastAndroid.SHORT)
    this.props.navigation.navigate('Login')
      })
      .catch(error=>{
          console.log(error)
      })
  }
render(){
    
 return(
            <>
               <SliderBox
						images={this.state.Image}
						sliderBoxHeight={300}
						autoplay='true'
						circleLoop
						onCurrentImagePressed={index =>
							console.warn(`Image ${index} pressed`)
						}
						dotColor='#FFEE58'
						inactiveDotColor='#90A4AE'
						resizeMode={'cover'}
						dotStyle={{ marginTop: 10, marginBottom: 11 }}
					/>
                <View>
                    <Text style={styles.textlogin}>
                        Become a member and enjoy the benefits!
                    </Text>
            <KeyboardAvoidingView enabled>
            <View>
            <Item floatingLabel style={styles.form}>
              <Label style={{color: '#059dab'}}>Fullname</Label>
              <Input
              autoCapitalize='none'
              returnKeyType="next"
              onChangeText={fullname => this.setState({fullname: fullname})} />
            </Item>
            <Item floatingLabel style={styles.form}>
              <Label style={{color: '#059dab'}}>Username</Label>
              <Input
              autoCapitalize='none'
              returnKeyType="next"
              onChangeText={username => this.setState({username: username})} />
            </Item>
            <Item floatingLabel style={styles.form}>
              <Label style={{color: '#059dab'}}>Email</Label>
              <Input
              autoCapitalize='none'
              returnKeyType="next"
              onChangeText={email => this.setState({email: email})} />
            </Item>
            <Item floatingLabel style={styles.form}>
              <Label style={{color: '#059dab'}}>Password</Label>
              <Input 
              secureTextEntry
              autoCapitalize='none'
              returnKeyType="go"
              onChangeText={password => this.setState({password: password})}/>
              <Button transparent onPress={() => hideUnhide()}>
	
				</Button>
            </Item>
            </View>
            </KeyboardAvoidingView>
           
            <TouchableOpacity onPress={this.insertUser.bind(this)}>
				<Button rounded style={styles.buttonlogin}>
					<Text style={{ fontSize: 18, color: 'white' }}>SIGN UP</Text>
				</Button>
			</TouchableOpacity>
            {/* {errors && <Text style={styles.errors}>{errors.password}</Text>} */}
			
                </View>
            
                <View>
				<TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
					<Text style={styles.textregister}>
						Already Have a Account? SIGN IN
					</Text>
				</TouchableOpacity>
			</View>
            
                
            </>
        )
    }
}
    


const styles = StyleSheet.create({
    textlogin : {
        fontSize: 18,
        marginTop: 20,
        textAlign: 'center'

    },
    form: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		marginTop: 15,
		marginVertical: 5,
		marginLeft: 40,
		justifyContent: 'center',
        width: '80%',
        borderRadius: 5,
       
         
    },

    buttonlogin: {
		marginTop: 30,
		backgroundColor: '#059dab',
		paddingVertical: 25,
		width: '50%',
		justifyContent: 'center',
        marginLeft: 100,
        borderRadius: 5
        
    },
    textregister: {
		marginTop: 30,
		textAlign: 'center',
		fontSize: 15,
    },

})
