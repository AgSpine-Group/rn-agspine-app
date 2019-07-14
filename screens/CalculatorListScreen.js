import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, Container, CardItem, Card, View, Body, Icon } from 'native-base';
import { PRIMARY, GREY, SECONDARY } from '../constants/Colors';

import { Calculator } from '../components/Icon';

const style = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: GREY[300],
    flexDirection: 'column',
    padding: 8,
  },
  svgContainer: {
    padding: 20,
  },
  horizontal: {
    display: 'flex',
    flexDirection: 'row',
  },
  vertical: {
    display: 'flex',
    flexDirection: 'column',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  grey: {
    color: GREY[800],
  },
  cardContent: {
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

const calculators = [
  {
    name: 'Good Size',
    descritpion: 'fuark, not bad good size.',
  },
  {
    name: 'Good Size',
    descritpion: 'fuark, not bad good size.',
  },
  {
    name: 'Good Size',
    descritpion: 'fuark, not bad good size.',
  },
];

class CalculatorListScreen extends React.Component {
  render() {
    return (
      <ScrollView>
        <Container style={style.background}>
          {calculators.map((calculator, idx) => (
            <Card key={`calc-${idx}`}>
              <CardItem button>
                <View style={style.svgContainer}>
                  <Calculator />
                </View>
                <View>
                  <Body style={style.cardContent}>
                    <View>
                      <Text style={style.grey}>{calculator.name}</Text>
                      <Text style={Object.assign({ fontSize: 13, marginTop: 8 }, style.grey)}>
                        {calculator.descritpion}
                      </Text>
                    </View>
                  </Body>
                </View>
              </CardItem>
            </Card>
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
