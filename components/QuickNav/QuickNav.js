import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Text, Card, CardItem, Content, Icon } from 'native-base';
import AntIcon from "react-native-vector-icons/AntDesign";

const QuickNavButton = (props) => (
  <Card style={{ display: 'flex', flexGrow: 1 }} onClic>
    <CardItem
      onClick={() => { }}
      style={styles.navContainer}
      button
    >
      <AntIcon active name="smile-circle" size={30} color='green' style={{ paddingHorizontal: 20 }} />
      <Text style={styles.header}>
        Form Templates
          {props.buttonText}</Text>
    </CardItem>
    <CardItem
      onClick={() => { }}
      style={styles.navContainer}
      button
    >
      <AntIcon active name="smile-circle" size={30} color='green' style={{ paddingHorizontal: 20 }} />
      <Text style={styles.header}>
        Saved forms
          {props.buttonText}</Text>
    </CardItem>
  </Card>
)

const styles = StyleSheet.create({
  navContainer: {
    display: 'flex',
    height: 150,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d3d3d3',
    // border: 'none',
  }
})

export default QuickNavButton;


