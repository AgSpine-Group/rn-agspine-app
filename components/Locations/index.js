import React from 'react';
import { StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Text, View, List, ListItem, Left, Right, Icon } from 'native-base';
import { PRIMARY, GREY, SECONDARY } from '../../constants/Colors';

const LocationPin = () => <Entypo name="location" size={40} color={SECONDARY[200]} />;

const style = StyleSheet.create({
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

export default ({ locations }) => (
  <View>
    <View style={style.locationContainer}>
      <List>
        {locations.map(location => (
          <>
            <ListItem itemDivider>
              <Text style={style.locationText}>{location.name}</Text>
            </ListItem>
            {location.areas.map(area => (
              <ListItem>
                <Left>
                  <View style={Object.assign({}, style.horizontal, style.horizontalCentered)}>
                    <View style={style.locationIcon}>
                      <LocationPin />
                    </View>
                    <View style={style.locationInfo}>
                      <Text style={style.locationHeader}>{area.name}</Text>
                      <View style={style.horizontal}>
                        <Text style={style.lastApplied}>Last Applied:</Text>
                        <Text style={style.date}>{area.date}</Text>
                      </View>
                    </View>
                  </View>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            ))}
            <ListItem>
              <View style={style.addButtonContainer}>
                <Text style={style.addButtonText}>ADD NEW LOCATION</Text>
              </View>
            </ListItem>
          </>
        ))}
        <ListItem itemDivider />
      </List>
    </View>
  </View>
);
