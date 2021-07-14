import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyles } from '../styles/global';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { MaterialIcons } from '@expo/vector-icons';
import FlatButton from '../shared/button.js';

export default function Login({ navigation }) {
    const app_url = 'exp://10.18.205.228:19000'
    const client_id = 'c0d296f87ad3d2fd9c1980da5f055fb4ee7fae41830be1f5d6985bea22b84a36'
    const url = 'https://api.intra.42.fr/oauth/authorize?client_id=' + client_id + '&redirect_uri=' + app_url + '&response_type=code'


    const handleLogin = async () => {
        console.log(url);
        WebBrowser.openBrowserAsync(url);
        Linking.addEventListener('url', (event) => {
            let data = Linking.parse(event.url);
            let code = data.queryParams.code
            console.log(code);

            WebBrowser.dismissBrowser();
            navigation.navigate('SelectUser', {code: code})
        })
      }
  
    return (
    <View style={globalStyles.container}>
        <FlatButton onPress={handleLogin} text='Login to 42 Intra' />
    </View>
  );
}