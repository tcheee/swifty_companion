import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';
import Card from '../shared/card';
import { globalStyles } from '../styles/global';

export default function ReviewDetails({ navigation }) {
  const info = navigation.getParam('userInfo')

  const email = info.email
  const first_name = info.first_name
  const last_name = info.last_name
  const image_url = info.image_url
  var projects = info.projects_users;
  const campus = info.campus
  const cursus = info.cursus_users
  const level = cursus[0].level
  const skills = cursus[0].skills

  var campus_id;
  var location;

  info.campus_users.map((item) => {
    if (item.is_primary == true) {
      campus_id = item.campus_id;
    }
  });

  campus.map((item) => {
    if (item.id == campus_id) {
      location = item.name
    }
  })

  projects.sort(function(a,b) {
    return new Date(b.updated_at) - new Date(a.updated_at)
  })

  return (
        <ImageBackground source={require('../assets/background.jpeg')} style={styles.background}>
          <View style={globalStyles.container}>
            <View style={styles.profile}>
              <Card>
                <Image        
                  style={styles.tinyLogo}
                  source={{uri: image_url}}
                />
                <Text style={styles.title}>{ first_name } {last_name}</Text>
                <Text style={styles.mainContent}> {email} </Text>
                <Text style={styles.mainContent}> {location} </Text>
                <Text style={styles.mainContent}> Level {parseInt(level)} </Text>
                <ProgressBar progress={level % 1}style={{marginBottom:4}}/>
              </Card>
            </View>

          <View style={styles.listing}>
              <Card>
                  <Text style={styles.title}> Projects</Text>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={projects}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => 
                    <View style={styles.listingContent}>
                      <Text style={styles.listingName}> {item.project.name} </Text>
                      {item['validated?'] ?  <Text style={styles.listingValid}> {item.final_mark} </Text> : <Text style={styles.listingFailed}> {item.final_mark} </Text> }
                    </View>
                    }
                  />
                </Card>
                
                <Card>
                <Text style={styles.title}> Skills</Text>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={skills}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => 
                      <View style={styles.listingContent}>
                        <Text style={styles.listingName}> {item.name}</Text>
                        <Text style={styles.listingNumber}> {item.level}</Text>
                      </View>
                    }
                  />
              </Card>
          </View>
        </View>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  profile: {
    flex: 1,
  },
  listing: {
    flex: 2,
  },
  listingContent: {
    flexDirection: "row", 
  },
  listingName: {
    color: "#00AFB1",
  },
  listingNumber: {
    color: "#EAEFF2",
    position: 'absolute',
    right: 0,
  },
  listingValid: {
    color: "#5CB85B",
    position: 'absolute',
    right: 0,
  },
  listingFailed: {
    color: "#D7636F",
    position: 'absolute',
    right: 0,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 18,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#EAEFF2', 
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    fontSize: 14,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#EAEFF2',
    fontWeight: 'bold',
  },
  tinyLogo: {
    marginTop:10,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 60,
    borderWidth: 1,
  },
})