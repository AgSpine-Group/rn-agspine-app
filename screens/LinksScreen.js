import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, Button } from 'react-native';
import fetchItemsAsync from '../redux/actions/items';

const fakeItems = [
  {
    id: '123',
    title: 'Magic',
    structure: 'WhoGivesAHoot',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  updateItems = () => {
    return this.props.fetchItemsAsync(fakeItems);
  };

  render() {
    const { items } = this.props;
    return (
      <ScrollView style={styles.container}>
        <Button title="Click me" onPress={this.updateItems} />
      </ScrollView>
    );
  }
}

LinksScreen.propTypes = {
  fetchItemsAsync: React.propTypes.func.isRequired,
  items: React.propTypes.Array.isRequired,
};

const mapStateToProps = state => ({
  items: state.items,
});

const mapDispatchToProps = {
  fetchItemsAsync,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinksScreen);
