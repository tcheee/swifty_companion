import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { globalStyles, images } from '../styles/global';
import Card from '../shared/card';

export default function ReviewDetails({ navigation }) {
  const name = navigation.getParam('login');
  const info = navigation.getParam('userInfo')

  const email = info.email
  const first_name = info.first_name
  const last_name = info.last_name
  const image_url = info.image_url
  const projects = info.projects_users;
  const campus = info.campus
  const location = campus[0].name
  const cursus = info.cursus_users
  const level = cursus[0].level
  const skills = cursus[0].skills

  console.log("-------------")
  projects.map(project => {
    console.log(project)
    console.log(project.project.name + " : " + project.final_mark)
  })
  console.log("-------------")
  skills.map(skill => {
    console.log(skill.name + " : " + skill.level)
  })
  console.log("-------------")

  console.log(skills)

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.item}>
        <TouchableOpacity onPress={() => console.log(name)}>
          <Card>
            <Image        
              style={styles.tinyLogo}
              source={{uri: image_url}}
            />
            <Text style={styles.title}>{ first_name } {last_name}</Text>
            <Text> {email} </Text>
            <Text> {location} </Text>
            <Text> {level} </Text>
          </Card>
        </TouchableOpacity>

        <Card>
          <FlatList
            data={projects}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => 
              <Text> {item.project.name} : {item.final_mark}</Text>
            }
          />
        </Card>

        <Card>
          <FlatList
            data={skills}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => 
              <Text> {item.name} : {item.level}</Text>
            }
          />
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  tinyLogo: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 60,
    borderWidth: 1,
  },
})