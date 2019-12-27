import firebase from 'firebase'

class Fire{
    constructor(){
        this.init()
        this.checkAuth()
    }
    init=()=>{
        if(!firebase.apps.length){
            firebase.initializeApp({
                apiKey: "AIzaSyCr0o8aXeSJLD8g04tOhv3m14vjTfHpya0",
                authDomain: "chatting-c282c.firebaseapp.com",
                databaseURL: "https://chatting-c282c.firebaseio.com",
                projectId: "chatting-c282c",
                storageBucket: "chatting-c282c.appspot.com",
                messagingSenderId: "560388687416",
                appId: "1:560388687416:web:4fcf9aec080cd20352c8cd",
                measurementId: "G-1V0HGEVWDD"
            })
        }
    }

    checkAuth=()=>{
        firebase.auth().onAuthStateChanged(user =>{
            if(!user){
                firebase.auth().signInAnonymously()
            }
        })
        
       
        }
        send = messages =>{
            messages.forEach(item=>{
                const message ={
                    text : item.text,
                    timestamp:firebase.database.ServerValue.TIMESTAMP,
                    user: item.user
                }
                this.db.push(message)
                console.log(message,'mess')
            })
        }
        parse = message =>{
            const {user,text,timestamp} = message.val()
            const{key:_id} = message
            const createdAt = new Date(timestamp)
    
            return {
                _id,
                createdAt,
                text,
                user
            }
        }
        get = callback =>{
            this.db.on('child_added',snapshot => callback(this.parse(snapshot)))
        }
        off(){
            this.db.off()
        }
        get db(){
            return firebase.database().ref('messages')
    }
    get uid(){
        return(firebase.auth().currentUser || {}).uid
    }
}
export default new Fire()

    
    
    


