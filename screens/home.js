import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyles } from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../shared/card';
import FlatButton from '../shared/button.js';

export default function Home({ navigation }) {
  const [login, setLogin] = useState('');
  const [users, setUsers] = useState({});

  const getUsersFromApiAsync = async () => {
    try {
      console.log('here')
      let response = await fetch('https://retoolapi.dev/guWK8x/data');
      let json = await response.json();
      console.log(json)
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    const users = await getUsersFromApiAsync();
    setUsers(users)
    navigation.navigate('ReviewDetails', {login: login, users: users})
  }

  return (
    <View style={globalStyles.container}>
      <TextInput
        onChangeText={setLogin}
        value={login}
      />
    <FlatButton onPress={handleSubmit} text='submit' />
    </View>
  );
}