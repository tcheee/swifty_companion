import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground, ImageBackgroundBase} from 'react-native';
import { globalStyles } from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../shared/card';
import { TextInput, ActivityIndicator, Colors } from 'react-native-paper';
import FlatButton from '../shared/button.js';

export default function Home({ navigation }) {
  const code = navigation.getParam('code');
  const [login, setLogin] = useState('');
  const [token, setToken] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const POST_body = {
    'grant_type': 'authorization_code',
    'client_id': 'c0d296f87ad3d2fd9c1980da5f055fb4ee7fae41830be1f5d6985bea22b84a36',
    'client_secret': '4631186c7cc1a5c7d206310ab2c04af3168cc0f41789173160cebaab61588233',
    'code': code,
    'redirect_uri': 'exp://10.18.205.228:19000',
  }

  const getUserInfoFrom42API = async (token, user_id) => {
    const get_url = 'https://api.intra.42.fr/v2/users/' + user_id

    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch(get_url, {
          method: "GET",
          headers: new Headers({
            'Authorization': 'Bearer '+ token, 
            'Content-Type': 'application/json'
          }), 
        });
        let json = await response.json();
        resolve(json);
      } catch (error) {
        console.error(error);
        reject(error)
      }
      });
    };

  const getUserIdFrom42API = async (token) => {
    let filter = login.toLowerCase()
    filter = filter.trim() 
    const get_url = 'https://api.intra.42.fr/v2/users?filter[login]=' + filter

    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch(get_url, {
          method: "GET",
          headers: new Headers({
            'Authorization': 'Bearer '+ token, 
            'Content-Type': 'application/json'
          }), 
        });
        let json = await response.json();
        resolve(json);
      } catch (error) {
        console.error(error);
        reject(error)
      }
      });
    };

    const getTokenFrom42API = () => {
      return new Promise(async (resolve, reject) => {
        try {
          let response = await fetch('https://api.intra.42.fr/oauth/token', {
            method: "POST",
            body: JSON.stringify(POST_body),
            headers: {
              'Content-Type': 'application/json'
            },
          });
          let json = await response.json()
          resolve (json.access_token)
        } catch (err){
          console.log(err)
          reject(err)
        }
      });
    }

  const getTokenInfo = (token) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch('https://api.intra.42.fr/oauth/token/info', {
          method: "GET",
          headers: new Headers({
            'Authorization': 'Bearer '+ token, 
            'Content-Type': 'application/json'
          }), 
        });
        let json = await response.json();
        console.log(json)
        resolve(json);
      } catch (error) {
        console.error(error);
        reject(error)
      }
    });
  };

  const verifyToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        if (token != '') {
          console.log(token)
          const check = await getTokenInfo(token);
          resolve(token)
        }
        else {
          const new_token = await getTokenFrom42API()
          setToken(new_token);
          resolve(new_token)
        }
        resolve (0)
      } catch (err) {
        console.log(err)
        reject (-1)
      }
    })
  }

  const handleSubmit = async () => {
    if (login != '') {
      setIsLoading(true)
      const token = await verifyToken()
      const user = await getUserIdFrom42API(token)
      const user_id = user[0].id
      console.log(isLoading);
      const info = await getUserInfoFrom42API(token, user_id)
      setIsLoading(false)
      navigation.navigate('ReviewDetails', {login: login, userInfo: info})
    }
  }

  return (
    <ImageBackground source={require('../assets/background.jpeg')} style={styles.background}>
      <View style={globalStyles.container}>
        <TextInput
          label="Login"
          onChangeText={setLogin}
          value={login}
          style={styles.textInput}
        />
      <FlatButton onPress={handleSubmit} text='submit' />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  textInput: {     
    marginTop: 150,
    marginBottom:10, 
    backgroundColor: "#E7F0FE",
  },
});