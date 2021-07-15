import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import React from 'react';
import Header from '../shared/header';
import SelectUser from '../screens/selectUser';
import Login from '../screens/login';
import StudentDetails from '../screens/studentDetails';

const screens = {
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='42 Looker' />, 
        headerTransparent: true,
      }
    }
  },  
  Home: {
    screen: SelectUser,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='42 Looker' />,
        headerLeft: ()=> null,
        headerTransparent: true,
      }
    },
  },
  StudentDetails: {
    screen: StudentDetails,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Student Details' />,
      }
    },
  },
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: { backgroundColor: '#1F1F25', height: 60 },
  }
});

export default createAppContainer(HomeStack);