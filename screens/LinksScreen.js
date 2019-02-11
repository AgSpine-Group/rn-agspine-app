import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, Button } from 'react-native';
import fetchItemsAsync from '../redux/actions/items';
import { ExpoLinksView } from '@expo/samples';

const fakeItems = [{
  id: '123',
  title: 'Magic',
  structure: 'WhoGivesAHoot'
}]

class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  updateItems = () => {
    return this.props.fetchItemsAsync(fakeItems)
  }
  render() {
    const { items } = this.props
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        {/* <ExpoLinksView /> */}
        <Button title="Click me" onPress={this.updateItems} />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items,
});

const mapDispatchToProps = {
  fetchItemsAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(LinksScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
