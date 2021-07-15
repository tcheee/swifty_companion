import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground} from 'react-native';
import { globalStyles } from '../styles/global';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

export default function Login({ navigation }) {
    const app_url = Linking.createURL()
    const client_id = 'c0d296f87ad3d2fd9c1980da5f055fb4ee7fae41830be1f5d6985bea22b84a36'
    const url = 'https://api.intra.42.fr/oauth/authorize?client_id=' + client_id + '&redirect_uri=' + app_url + '&response_type=code'


    const handleLogin = async () => {
        WebBrowser.openBrowserAsync(url);
        Linking.addEventListener('url', (event) => {
            let data = Linking.parse(event.url);
            let code = data.queryParams.code
            console.log(code);

            WebBrowser.dismissBrowser();
            navigation.navigate('Home', {code: code})
        })
      }
  
    return (
    <ImageBackground source={require('../assets/background.jpeg')} style={styles.background}>
        <View style={globalStyles.container}>
                <TouchableOpacity onPress={handleLogin}>
                    <View style={styles.loginButton}>
                        <Image source={require('../assets/42_Logo.png')} style={styles.headerImage} />
                        <Text style={styles.loginButtonText}>Login</Text>
                    </View>
                </TouchableOpacity>
        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
    },
    loginButton: {     
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: '#00AFB1',
        alignItems: 'center',
        justifyContent: 'center',
        justifyContent: 'center',
        marginTop: 250,
        flexDirection: 'row',
      },
      loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center',
      },
      headerImage: {
        width: 26,
        height: 26,
        marginHorizontal: 10
      },
  })