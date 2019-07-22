import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import moment from 'moment';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Container, Text, List, ListItem } from 'native-base';
import { fetchAreaAsync, fetchAreaFormsAsync } from '../redux/actions/area';
import { GREY } from '../constants/Colors';

const styles = StyleSheet.create({
  background: {
    backgroundColor: GREY[300],
  },
  content: {
    display: 'flex',
    padding: 10,
    flexDirection: 'column',
  },
  locationText: {
    fontSize: 24,
    color: GREY[600],
  },
  locationContainer: {
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  areaContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 3,
  },
  monthTitle: {
    fontSize: 16,
    color: GREY[500],
  },
  monthText: {
    fontSize: 14,
    width: '100%',
  },
  dayText: {
    fontSize: 12,
    color: GREY[500],
    width: '100%',
  },
  formName: {
    fontSize: 14,
    width: '100%',
  },
  userName: {
    fontSize: 12,
    color: GREY[500],
    width: '100%',
  },
});

// eslint-disable-next-line
class AreaScreen extends React.Component {
  componentDidMount = async () => {
    const areaId = this.props.navigation.getParam('areaId', null);

    await this.props.fetchAreaAsync(areaId);
    await this.props.fetchAreaFormsAsync(areaId);
  };

  render() {
    const {
      area,
      area: { location },
      submittedForms,
    } = this.props;

    const formsByDate = _.groupBy(submittedForms, 'date');

    return (
      <ScrollView>
        <Container style={styles.background}>
          <View style={styles.content}>
            <Text style={styles.locationText}>{area.areaName}</Text>
            {Object.keys(formsByDate).map(date => (
              <>
                <View style={Object.assign({ marginTop: 20 }, styles.locationContainer)}>
                  <List>
                    <ListItem>
                      <Text style={styles.monthTitle}>July</Text>
                    </ListItem>
                  </List>
                </View>

                <View style={styles.locationContainer}>
                  <List>
                    <ListItem style={styles.areaContainer}>
                      <View style={styles.dateContainer}>
                        <Text style={styles.monthText}>{moment(date).format('MMMM')}</Text>
                        <Text style={styles.dayText}>{moment(date).format('dddd HH:MM:SS')}</Text>
                      </View>
                      <View style={styles.formContainer}>
                        <Text style={styles.formName}>Chemical crop application</Text>
                        <Text style={styles.userName}>Hyun Kim</Text>
                      </View>
                    </ListItem>
                  </List>
                </View>
              </>
            ))}
          </View>
        </Container>
      </ScrollView>
    );
  }
}

AreaScreen.propTypes = {
  area: PropTypes.shape({
    id: PropTypes.string.isRequired,
    areaName: PropTypes.string.isRequired,
    lastAppliedDate: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    location: PropTypes.shape({
      id: PropTypes.string.isRequired,
      locationName: PropTypes.string.isRequired,
      areas: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          areaName: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
  submittedForms: PropTypes.shape().isRequired,
  fetchAreaFormsAsync: PropTypes.func.isRequired,
  fetchAreaAsync: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  area: state.area.data,
  submittedForms: state.areaForms.data,
});

const mapDispatchToProps = {
  fetchAreaAsync,
  fetchAreaFormsAsync,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AreaScreen);
