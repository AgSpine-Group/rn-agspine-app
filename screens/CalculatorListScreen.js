import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView } from 'react-native';
import { Container } from 'native-base';
import { GREY } from '../constants/Colors';

import ListItem from '../components/ListItem'

const style = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: GREY[300],
    flexDirection: 'column',
    padding: 8,
  },
});

const calculators = [
  {
    name: 'Good Size',
    description: 'fuark, not bad good size.',
  },
  {
    name: 'Good Size',
    description: 'fuark, not bad good size.',
  },
  {
    name: 'Good Size',
    description: 'fuark, not bad good size.',
  },
];

class CalculatorListScreen extends React.Component {
  render() {
    return (
      <ScrollView>
        <Container style={style.background}>
          {calculators.map((calculator, idx) => (
            <ListItem
              name={calculator.name}
              description={calculator.description}
              type="calculator"
            />
          ))}
        </Container>
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
)(CalculatorListScreen);
