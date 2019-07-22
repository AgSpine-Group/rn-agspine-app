import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
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

const ListComponent = ({ locations, handleAreaNavigation }) => (
  <View>
    <View style={style.locationContainer}>
      <List>
        {locations.map(location => (
          <>
            <ListItem itemDivider key={location.id}>
              <Text style={style.locationText}>{location.locationName}</Text>
            </ListItem>
            {location.areas.map(area => (
              <ListItem key={area.id} onPress={handleAreaNavigation(area.id)}>
                <Left>
                  <View style={Object.assign({}, style.horizontal, style.horizontalCentered)}>
                    <View style={style.locationIcon}>
                      <LocationPin />
                    </View>
                    <View style={style.locationInfo}>
                      <Text style={style.locationHeader}>{area.areaName}</Text>
                      <View style={style.horizontal}>
                        <Text style={style.lastApplied}>Last Applied:</Text>
                        <Text style={style.date}>
                          {area.lastAppliedDate ? area.lastAppliedDate : 'No recent history'}
                        </Text>
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
                <Text style={style.addButtonText}>ADD NEW AREA</Text>
              </View>
            </ListItem>
          </>
        ))}
        <ListItem itemDivider />
      </List>
    </View>
  </View>
);

ListComponent.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      locationName: PropTypes.string.isRequired,
      areas: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          areaName: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired
  ).isRequired,
  handleAreaNavigation: PropTypes.func.isRequired,
};

export default ListComponent;
