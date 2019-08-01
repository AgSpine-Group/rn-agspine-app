import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'native-base';
import { submitFormDataAsync } from '../redux/actions/form_submit';
import forms from '../forms';

class FormScreen extends React.Component {
  constructor(props) {
    super(props);
    this.formId = this.props.navigation.getParam('formId', null);
    [this.form] = forms.map(formTypes => formTypes.forms.find(x => x.id === this.formId));
  }

  render() {
    return (
      <Container style={{ position: 'relative' }}>
        <this.form.Component
          profile={this.props.profile}
          navigation={this.props.navigation}
          formId={this.formId}
          formName={this.form.title}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    formData: state.formData,
    profile: state.profile,
  };
};

const mapDispatchToProps = {
  submitFormDataAsync,
};

FormScreen.propTypes = {
  profile: PropTypes.shape({
    organisationId: PropTypes.string.isRequired,
  }).isRequired,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormScreen);
