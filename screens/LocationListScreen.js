import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'native-base';

class LocationListScreen extends React.Component {
  static navigationOptions = {
    title: 'Locations',
  };

  render() {
    return (
      <View>
        <Text>HI THIS IS THE LOCATION LIST SCREEN</Text>
      </View>
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
