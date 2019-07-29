import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Content, List, ListItem, Text } from 'native-base';
import { fetchSubmittedFormsAsync } from '../redux/actions/submitted_forms';
import { getAndPersistProfileAsync } from '../redux/actions/profile';
import { dateUtils } from '../utils';

const ListItemComponent = ({ data }) => (
  <ListItem key={data.uid}>
    <Text>{data.applicator_name}</Text>
    <Text>{dateUtils.dateStamp(data.date)}</Text>
    <Text>{data.formId}</Text>
  </ListItem>
);

ListItemComponent.propTypes = {
  data: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    applicator_name: PropTypes.string.isRequired,
    formId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

class SubmitedList extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.profile.organisationId !== nextProps.profile.organisationId) {
      return true;
    }
    return false;
  }

  componentDidUpdate = async prevProps => {
    if (prevProps.profile.organisationId !== this.props.profile.organisationId) {
      this.props.fetchSubmittedFormsAsync();
    }
  };

  render() {
    console.log('this.props.submittedFormData');
    console.log(this.props.submittedFormData);
    return (
      <Container>
        <Content>
          <List>
            {this.props.submittedFormData.map(data => {
              return <ListItemComponent data={data} key={data.uid} />;
            })}
          </List>
        </Content>
      </Container>
    );
  }
}

SubmitedList.propTypes = {
  submittedFormData: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string.isRequired,
      formId: PropTypes.string.isRequired,
    })
  ).isRequired,
  fetchSubmittedFormsAsync: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    submittedFormData: state.submittedFormData.data || [],
    profile: state.profile,
  };
};

const mapDispatchToProps = {
  fetchSubmittedFormsAsync,
  getAndPersistProfileAsync,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitedList);
