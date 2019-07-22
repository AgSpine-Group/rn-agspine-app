import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, View, Button } from 'native-base';
import { StackActions } from 'react-navigation';
import { PRIMARY, GREY } from '../constants/Colors';
import Locations from '../components/Locations';
import { fetchLocationsAsync } from '../redux/actions/locations';

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

export class LocationListScreen extends React.Component {
  componentDidMount = async () => {
    await this.props.fetchLocationsAsync();
  };

  handleAreaNavigation = id => () => {
    const navigateAction = StackActions.push({
      routeName: 'Area',
      params: {
        areaId: id,
      },
    });

    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    const { locations } = this.props;

    return (
      <ScrollView>
        <View style={style.background}>
          <View style={style.buttonContainer}>
            <Text style={style.textContainer}>Track your location and your area</Text>
            <Button block style={style.addButton}>
              <Text style={{ color: PRIMARY[500] }}>Add a new location</Text>
            </Button>
          </View>
          <Locations locations={locations} handleAreaNavigation={this.handleAreaNavigation} />
        </View>
      </ScrollView>
    );
  }
}

LocationListScreen.propTypes = {
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
  fetchLocationsAsync: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  locations: state.locations.data,
});

const mapDispatchToProps = {
  fetchLocationsAsync,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationListScreen);
