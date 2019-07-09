import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet, Button, FlatList, View } from 'react-native';
import { Text } from 'native-base';
import { StackActions } from 'react-navigation';
import { submitFormDataAsync } from '../redux/actions/form_submit';
import forms from '../forms';

const pushToForm = item =>
  StackActions.push({
    routeName: 'Form',
    params: {
      formId: item.id,
    },
  });

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  item: {
    fontSize: 18,
    height: 44,
    backgroundColor: 'grey',
  },
  title: {
    fontSize: 22,
  },
  formListContainer: {
    display: 'flex',
    alignItems: 'flex-start',
  },
});

const FormListComponent = props => {
  return (
    <View style={styles.formListContainer}>
      <Text style={styles.title}>{props.title}</Text>
      <FlatList
        data={props.forms}
        renderItem={({ item }) => (
          <Button
            onPress={() => {
              props.navigation.dispatch(pushToForm(item));
            }}
            style={styles.item}
            title={item.title}
          />
        )}
      />
    </View>
  );
};

FormListComponent.propTypes = {
  title: PropTypes.string.isRequired,
  forms: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class FormsScreen extends React.Component {
  static navigationOptions = {
    title: 'Forms',
  };

  render() {
    const { navigation } = this.props;

    return (
      <ScrollView style={styles.container}>
        {forms.map(x => (
          <FormListComponent
            navigation={navigation}
            title={x.title}
            forms={x.forms}
            key={x.title}
          />
        ))}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items,
});

const mapDispatchToProps = {
  submitFormDataAsync,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormsScreen);
