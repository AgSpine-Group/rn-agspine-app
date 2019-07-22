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
    values: { area, pestDetails, location },
    handleChange,
    handleSubmit,
    profile,
    errors,
  } = props;

  return (
    <Container>
      <Content>
        <Picker
          placeholder="Select a location"
          style={{ height: 100 }}
          iosIcon={<FormIcon name="home" />}
          placeholderStyle={{ maxWidth: '90%' }}
          onValueChange={l => handleChange('location')({ id: l.id, locationName: l.locationName })}
          selectedValue={location.locationName}
        >
          {profile.locations.map(l => {
            return <Picker.Item label={l.locationName} value={l} key={l.id} width={100} />;
          })}
        </Picker>
        <ErrorMessage errors={get(errors, 'location.id', '')} />

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

        <Label>Area Information</Label>
        <InputContainer
          label="Applicator name"
          onChange={handleChange('applicatorName')}
          value={values.applicatorName}
        />
        <ErrorMessage errors={get(errors, 'applicatorName', '')} />

        <Picker
          placeholder="Select an area"
          style={{ height: 100 }}
          iosIcon={<FormIcon name="location" />}
          placeholderStyle={{ maxWidth: '90%' }}
          onValueChange={val =>
            handleChange('area.identification')({
              id: val.id,
              areaName: val.areaName,
            })
          }
          selectedValue={area.identification.areaName}
        >
          {profile.areas
            .filter(a => a.location.id === location.id)
            .map(x => {
              return <Picker.Item label={x.areaName} value={x} key={x.id} width={100} />;
            })}
        </Picker>
        <ErrorMessage errors={get(errors, 'area.identification.id', '')} />

        <InputContainer
          label="Treatment area:"
          onChange={handleChange('area.treatmentArea')}
          value={area.treatmentArea}
        />
        <InputContainer
          label="Growth stage:"
          onChange={handleChange('area.growthStage')}
          value={area.growthStage}
        />
        <InputContainer
          label="Crop situation:"
          onChange={handleChange('area.cropSituation')}
          value={area.cropSituation}
        />
        <InputContainer
          label="Comment:"
          onChange={handleChange('area.comment')}
          value={area.comment}
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
