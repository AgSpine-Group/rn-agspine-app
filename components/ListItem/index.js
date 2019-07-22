import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, CardItem, Card, View, Body } from 'native-base';
import { GREY } from '../../constants/Colors';

import { Calculator, Document } from '../Icon';

const style = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: GREY[300],
    flexDirection: 'column',
    padding: 8,
  },
  svgContainer: {
    padding: 10,
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
    padding: 12,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

const icons = {
  calculator: Calculator,
  form: Document
}

const ListItem = ({
  type,
  description,
  name,
  action
}) => {
  const Component = icons[type]
  return (
    <Card>
      <CardItem button onPress={action}>
        <View style={style.svgContainer}>
          <Component />
        </View>
        <View>
          <Body style={style.cardContent}>
            <Text style={Object.assign({ fontSize: 14 }, style.grey)}>{name}</Text>
            <Text style={Object.assign({ fontSize: 10, marginTop: 8, width: 200 }, style.grey)}>
              {description}
            </Text>
          </Body>
        </View>
      </CardItem>
    </Card>
  )
}


export default ListItem