import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Text, View, Button, List, ListItem, Left, Right, Icon } from 'native-base';
import { PRIMARY, GREY, SECONDARY } from '../constants/Colors';

export const LocationPin = () => <Entypo name="location" size={40} color={SECONDARY[200]} />;

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
  locationText: {
    color: GREY[600],
  },
  locationContainer: {
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  locationIcon: {
    padding: 10,
  },
  locationHeader: {
    color: GREY[700],
  },
  lastApplied: {
    fontSize: 13,
    color: GREY[500],
  },
  date: {
    color: GREY[800],
    fontSize: 13,
    marginLeft: 3,
  },
  addButtonContainer: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: PRIMARY[700],
  },
  locationInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 8,
  },
  horizontal: {
    display: 'flex',
    flexDirection: 'row',
  },
  horizontalCentered: {
    alignItems: 'center',
  },
});

class LocationListScreen extends React.Component {
  static navigationOptions = {
    title: 'Locations',
  };

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
          <View>
            <View style={style.locationContainer}>
              <List>
                <ListItem itemDivider>
                  <Text style={style.locationText}>Rouse Hill</Text>
                </ListItem>
                <ListItem>
                  <Left>
                    <View style={Object.assign({}, style.horizontal, style.horizontalCentered)}>
                      <View style={style.locationIcon}>
                        <LocationPin />
                      </View>
                      <View style={style.locationInfo}>
                        <Text style={style.locationHeader}>Nathaniel Clyne</Text>
                        <View style={style.horizontal}>
                          <Text style={style.lastApplied}>Last Applied:</Text>
                          <Text style={style.date}>3 days ago</Text>
                        </View>
                      </View>
                    </View>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
                <ListItem>
                  <Left>
                    <View style={Object.assign({}, style.horizontal, style.horizontalCentered)}>
                      <View style={style.locationIcon}>
                        <LocationPin />
                      </View>
                      <View style={style.locationInfo}>
                        <Text style={style.locationHeader}>Nathaniel Clyne</Text>
                        <View style={style.horizontal}>
                          <Text style={style.lastApplied}>Last Applied:</Text>
                          <Text style={style.date}>3 days ago</Text>
                        </View>
                      </View>
                    </View>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
                <ListItem>
                  <Left>
                    <View style={Object.assign({}, style.horizontal, style.horizontalCentered)}>
                      <View style={style.locationIcon}>
                        <LocationPin />
                      </View>
                      <View style={style.locationInfo}>
                        <Text style={style.locationHeader}>Nathaniel Clyne</Text>
                        <View style={style.horizontal}>
                          <Text style={style.lastApplied}>Last Applied:</Text>
                          <Text style={style.date}>3 days ago</Text>
                        </View>
                      </View>
                    </View>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
                <ListItem>
                  <View style={style.addButtonContainer}>
                    <Text style={style.addButtonText}>ADD NEW LOCATION</Text>
                  </View>
                </ListItem>
                <ListItem itemDivider>
                  <Text style={style.locationText}>Rouse Hill</Text>
                </ListItem>
                <ListItem>
                  <Left>
                    <View style={Object.assign({}, style.horizontal, style.horizontalCentered)}>
                      <View style={style.locationIcon}>
                        <LocationPin />
                      </View>
                      <View style={style.locationInfo}>
                        <Text style={style.locationHeader}>Nathaniel Clyne</Text>
                        <View style={style.horizontal}>
                          <Text style={style.lastApplied}>Last Applied:</Text>
                          <Text style={style.date}>3 days ago</Text>
                        </View>
                      </View>
                    </View>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
                <ListItem>
                  <View style={style.addButtonContainer}>
                    <Text style={style.addButtonText}>ADD NEW LOCATION</Text>
                  </View>
                </ListItem>
              </List>
            </View>
          </View>
          <Text />
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
