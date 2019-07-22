import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet, Button, FlatList, View } from 'react-native';
import { Text } from 'native-base';
import { StackActions } from 'react-navigation';
import { submitFormDataAsync } from '../redux/actions/form_submit';
import forms from '../forms';
import ListItem from '../components/ListItem';
import { GREY } from '../constants/Colors';

const pushToForm = item =>
  StackActions.push({
    routeName: 'FormScreen',
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
  background: {
    flex: 1,
    backgroundColor: GREY[300],
    flexDirection: 'column',
    padding: 8,
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


class FormsScreen extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <ScrollView style={styles.background}>
        {
          forms.map(form =>
            <ListItem
              name={form.title}
              description={form.description}
              type="form"
              action={() => navigation.dispatch(pushToForm(form))}
            />
          )
        }
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
