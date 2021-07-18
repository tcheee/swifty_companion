import React, { useState } from 'react';
import { Text, StyleSheet, View, ImageBackground, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { globalStyles } from '../styles/global';
import { TextInput, ActivityIndicator, Colors } from 'react-native-paper';
import FlatButton from '../shared/button.js';

export default function Home({ navigation }) {
  const code = navigation.getParam('code');
  const app_url = navigation.getParam('app_url');
  const [login, setLogin] = useState('');
  const [token, setToken] = useState('');
  const [unknown, setUnknown] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const POST_body = {
    'grant_type': 'authorization_code',
    'client_id': 'c0d296f87ad3d2fd9c1980da5f055fb4ee7fae41830be1f5d6985bea22b84a36',
    'client_secret': '4631186c7cc1a5c7d206310ab2c04af3168cc0f41789173160cebaab61588233',
    'code': code,
    'redirect_uri': app_url,
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
        let check;
        if (token != '') {
          check = await getTokenInfo(token);
          if (check.expires_in_seconds > 0) {
            resolve(token)
          }
        }
        if (token == '' || check.expires_in_seconds == undefined) {
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
    setUnknown(false)
    if (login != '') {
      setIsLoading(true)
      const token = await verifyToken()
      const user = await getUserIdFrom42API(token)
      if (user[0] != undefined) {
        const info = await getUserInfoFrom42API(token, user[0].id)
        setIsLoading(false);
        navigation.navigate('StudentDetails', {login: login, userInfo: info})
      }
      else {
        setUnknown(true)
        setIsLoading(false)
      }
    }
  }

  let button = isLoading ? <ActivityIndicator /> : <FlatButton onPress={handleSubmit} text='submit' />
  let errorMessage = unknown ? <Text style={styles.errorMessage}> This user can not be found ... </Text> : null

  return (
    <ImageBackground source={require('../assets/background.jpeg')} style={styles.background}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={globalStyles.container}>
          <TextInput
            label="Login"
            onChangeText={setLogin}
            value={login}
            style={styles.textInput}
          />
          {errorMessage}
          {button}
      </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
    );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  textInput: {     
    marginBottom: 15, 
    backgroundColor: "#E7F0FE",
  },
  errorMessage: {
    color:'#D7636F',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 4,
  }
});