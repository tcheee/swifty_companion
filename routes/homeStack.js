import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import React from 'react';
import Header from '../shared/header';
import SelectUser from '../screens/selectUser';
import Login from '../screens/login';
import ReviewDetails from '../screens/reviewDetails';

const screens = {
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Login to 42 Looker' />
      }
    }
  },  
  SelectUser: {
    screen: SelectUser,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='42 Looker' />
      }
    },
  },
  ReviewDetails: {
    screen: ReviewDetails,
    navigationOptions: {
      title: 'User',
    }
  },
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: { backgroundColor: '#eee', height: 60 }
  }
});

export default createAppContainer(HomeStack);