import React, {Component} from 'react'
import {View,Text,StyleSheet, Image, TouchableOpacity} from 'react-native'
import {IonIcons, MaterialIcons} from 'react-native-vector-icons'
import {Left, Icon, Button} from 'native-base'

export default class Profile extends Component{

    render(){
        return(
            <View style={{flex:1,backgroundColor:'#F2F1F1'}}>
            <View style={{flexDirection:'row'}}>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
						<Icon
							type='FontAwesome'
							name='chevron-left'
							style={{ color: 'black', fontSize: 20, marginTop: 50 }}
						/>
                <Text style={{marginTop: 45, fontSize: 25, marginLeft: 10}}>Profile</Text>
					</Button>    
            </View> 
            {/* <Image source={require('../Assets/profilebackground.png')} style={{width: 100, height: 100,resizeMode:'contain'}}/> */}
            <View style={{alignSelf:'center'}}>
            <View style={styles.profileImage}>
            <Image source={require('../Assets/profiluser.png')} style={styles.image} ></Image>
            </View>
            <Text style={styles.textname}>
            Aulia Sandie
            </Text>
           <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
				<Button rounded style={styles.edit}>
					<Text style={{ fontSize: 15 , color: 'black' }}>Edit Profile</Text>
				</Button>
			</TouchableOpacity>
            </View>
            <View style={{backgroundColor: '#Ffff', height:400, borderRadius:25, width: 400, marginTop: 20,alignSelf:'center'}}>
            
            </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        // flex: 1,
        width: 170,
        height: 170,
        borderRadius: 200,
        alignSelf: 'center'
    },
    profileImage: {
        width: 170,
        height: 170,
        borderRadius: 63,
        overflow: 'hidden',
        marginTop: 50
    },
    textname: {
        marginTop: 20,
        fontSize: 25,
        textAlign: 'center'
    },
   
    edit: {
		marginTop: 10,
		backgroundColor: 'white',
		paddingVertical: 25,
        // paddingHorizontal: 10,
		width: '60%',
        height: '10%',
        // height: '10%',
		justifyContent: 'center',
        // marginLeft: 30,
        borderRadius: 250,
        alignSelf: 'center'
    }
})