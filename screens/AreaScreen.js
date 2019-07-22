import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Container, Text, List, ListItem } from 'native-base';
import { GREY } from '../constants/Colors';

const styles = StyleSheet.create({
  background: {
    backgroundColor: GREY[300],
  },
  content: {
    display: 'flex',
    padding: 10,
    flexDirection: 'column'
  },
  locationText: {
    fontSize: 24,
    color: GREY[600]
  },
  locationContainer: {
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  areaContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
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
})

const dummyData = {
  locationName: 'Beaumount Hills',
  months: [
    {
      name: 'January',
      submittedForms: [{}, {}, {}]
    },
    {
      name: 'September',
      submittedForms: [{}, {}, {}]
    }
  ]
}

const AreaScreen = ({
  locationName = dummyData.locationName,
  months = dummyData.months,
}) =>
  <ScrollView>
    <Container style={styles.background}>
      <View style={styles.content}>
        <Text style={styles.locationText}>{locationName}</Text>
        {
          months.map(month =>
            <>
              <View style={Object.assign({ marginTop: 20, }, styles.locationContainer)} >
                <List>
                  <ListItem>
                    <Text style={styles.monthTitle}>{month.name}</Text>
                  </ListItem>
                </List>
              </View>

              <View style={styles.locationContainer}>
                <List>
                  {
                    month.submittedForms.map(form =>
                      <ListItem style={styles.areaContainer}>
                        <View style={styles.dateContainer}>
                          <Text style={styles.monthText}>Jan 3</Text>
                          <Text style={styles.dayText}>Wed 1:34 pm</Text>
                        </View>
                        <View style={styles.formContainer}>
                          <Text style={styles.formName}>Manage winter crop application</Text>
                          <Text style={styles.userName}>Hyun Kim</Text>
                        </View>
                      </ListItem>
                    )
                  }
                </List>
              </View>
            </>
          )
        }
      </View>
    </Container>
  </ScrollView >

export default AreaScreen
