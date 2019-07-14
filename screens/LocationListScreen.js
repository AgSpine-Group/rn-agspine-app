import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, View, Button } from 'native-base';
import { PRIMARY, GREY } from '../constants/Colors';
import Locations from '../components/Locations';

const style = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: GREY[300],
    flexDirection: 'column',
  },
  buttonContainer: {
    flexDirection: 'column',
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 8,
    paddingBottom: 12,
    margin: 8,
    borderBottomColor: GREY[400],
    borderBottomWidth: 1,
  },
  textContainer: {
    color: PRIMARY[700],
    paddingTop: 8,
    paddingBottom: 12,
  },
  addButton: {
    backgroundColor: PRIMARY[300],
    marginBottom: 8,
  },
});

const locations = [
  {
    name: 'Rouse Hill',
    areas: [
      {
        name: 'Kellyville',
        date: '3 days ago',
      },
      {
        name: 'Bella Vista',
        date: '3 days ago',
      },
      {
        name: 'Beaumount Hills',
        date: '3 days ago',
      },
    ],
  },
  {
    name: 'Rouse Hill',
    areas: [
      {
        name: 'Kellyville',
        date: '3 days ago',
      },
      {
        name: 'Bella Vista',
        date: '3 days ago',
      },
      {
        name: 'Beaumount Hills',
        date: '3 days ago',
      },
    ],
  },
];

class LocationListScreen extends React.Component {
  render() {
    return (
      <ScrollView>
        <View style={style.background}>
          <View style={style.buttonContainer}>
            <Text style={style.textContainer}>Track your location and your area</Text>
            <Button block style={style.addButton}>
              <Text style={{ color: PRIMARY[500] }}>Add an area</Text>
            </Button>
          </View>
          <Locations locations={locations} />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = () => ({
  // items: state.items,
});

const mapDispatchToProps = {
  // submitFormDataAsync,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationListScreen);
