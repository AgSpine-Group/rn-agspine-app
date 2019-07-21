import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import {
  Container,
  Content,
  Item,
  Input,
  Label,
  DatePicker,
  Picker,
  Text,
  Button,
  Icon,
} from 'native-base';

import { SECONDARY } from '../../constants/Colors';

export const FormIcon = ({ name }) => (
  <Icon name={name} type="Entypo" style={{ fontSize: 20 }} color={SECONDARY[200]} />
);

FormIcon.propTypes = {
  name: PropTypes.string.isRequired,
};

const ErrorMessage = ({ errors }) =>
  errors ? <Text style={{ color: 'red' }}>{errors}</Text> : null;

ErrorMessage.propTypes = {
  errors: PropTypes.string.isRequired,
};
const InputContainer = props => (
  <Item stackedLabel last>
    <Label>{props.label}</Label>
    <Input onChangeText={props.onChange} value={props.value} />
  </Item>
);

InputContainer.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

/* eslint-disable */
const ChemForm = props => {
  const {
    values,
    values: { paddock, pestDetails, property },
    handleChange,
    handleSubmit,
    profile,
    errors,
  } = props;

  return (
    <Container>
      <Content>
        <Picker
          placeholder="Select a property"
          style={{ height: 100 }}
          iosIcon={<FormIcon name="home" />}
          placeholderStyle={{ maxWidth: '90%' }}
          onValueChange={handleChange('property')}
          selectedValue={property.propertyName}
        >
          {profile.properties.map(p => {
            return <Picker.Item label={p.propertyName} value={p} key={p.propertyId} width={100} />;
          })}
        </Picker>
        <ErrorMessage errors={get(errors, 'property.propertyId', '')} />

        <Item stackedLabel>
          <Label>Date of application</Label>
          <DatePicker
            placeHolderText="Select date"
            placeHolderTextStyle={{ color: '#d3d3d3' }}
            onDateChange={date => handleChange('date')(new Date(date).toISOString())}
            value={values.date}
            defaultDate={new Date()}
          />
        </Item>
        <ErrorMessage errors={get(errors, 'date', '')} />

        <Label>Paddock Info</Label>
        <InputContainer
          label="Applicator name"
          onChange={handleChange('applicatorName')}
          value={values.applicatorName}
        />
        <ErrorMessage errors={get(errors, 'applicatorName', '')} />

        <Picker
          placeholder="Select your location"
          style={{ height: 100 }}
          iosIcon={<FormIcon name="location" />}
          placeholderStyle={{ maxWidth: '90%' }}
          onValueChange={handleChange('paddock.identification')}
          selectedValue={paddock.identification.locationName}
        >
          {profile.locations
            .filter(x => x.propertyData.propertyId === property.propertyId)
            .map(x => {
              return (
                <Picker.Item label={x.locationName} value={x} key={x.locationId} width={100} />
              );
            })}
        </Picker>
        <ErrorMessage errors={get(errors, 'paddock.identification.locationId', '')} />

        <InputContainer
          label="Treatment area:"
          onChange={handleChange('paddock.treatmentArea')}
          value={paddock.treatmentArea}
        />
        <InputContainer
          label="Growth stage:"
          onChange={handleChange('paddock.growthStage')}
          value={paddock.growthStage}
        />
        <InputContainer
          label="Crop situation:"
          onChange={handleChange('paddock.cropSituation')}
          value={paddock.cropSituation}
        />
        <InputContainer
          label="Comment:"
          onChange={handleChange('paddock.comment')}
          value={paddock.comment}
        />

        <Label>Pest Info</Label>
        <InputContainer
          label="Pest type:"
          onChange={handleChange('pestDetails.pestType')}
          value={pestDetails.pestType}
        />
        <InputContainer
          label="Growth stage:"
          onChange={handleChange('pestDetails.growthStage')}
          value={pestDetails.growthStage}
        />
        <InputContainer
          label="Density:"
          onChange={handleChange('pestDetails.density')}
          value={pestDetails.density}
        />
        <InputContainer
          label="Comments:"
          onChange={handleChange('pestDetails.comments')}
          value={pestDetails.comments}
        />
        <Button primary full onPress={handleSubmit}>
          <Text>Create</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default ChemForm;
