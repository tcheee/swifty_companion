import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Card(props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        { props.children }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 6,
    backgroundColor: '#1F1F25',
    marginHorizontal: 4,
    marginVertical: 2,
    paddingTop: 5,
    opacity: 0.8,
  },
  cardContent: {
    flex: 1,
    marginHorizontal: 20,
    marginTop:0,
    marginBottom: 2,
  }
});
