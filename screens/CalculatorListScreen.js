import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'native-base';

class CalculatorListScreen extends React.Component {
  static navigationOptions = {
    title: 'Calculators',
  };

  render() {
    return (
      <View>
        <Text>HI THIS IS THE CALCULATOR LIST SCREEN</Text>
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
)(CalculatorListScreen);
