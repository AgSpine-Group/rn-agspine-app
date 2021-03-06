import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Text, Card, CardItem } from 'native-base';
import AntIcon from 'react-native-vector-icons/AntDesign';

const styles = StyleSheet.create({
  navContainer: {
    display: 'flex',
    height: 150,
    margin: '2.5%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#add8e6',
  },
});

const QuickNavButton = props => {
  const { navigation, pushToPage, navHelpers } = props;

  return (
    <Card style={{ display: 'flex' }} bordered={false}>
      {navHelpers.map(navItem => (
        <CardItem
          onPress={() => pushToPage(navItem.location, navigation)}
          style={styles.navContainer}
          button
          key={navItem.title}
        >
          <AntIcon
            active
            name={navItem.icon}
            size={30}
            color="green"
            style={{ paddingHorizontal: 20 }}
          />
          <Text style={styles.header}>{navItem.title}</Text>
        </CardItem>
      ))}
    </Card>
  );
};

QuickNavButton.propTypes = {
  navHelpers: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default QuickNavButton;
