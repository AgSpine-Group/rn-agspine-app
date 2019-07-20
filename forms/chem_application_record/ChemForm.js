import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Item, Input, Label, DatePicker, Picker } from 'native-base';
import { Entypo } from '@expo/vector-icons';
import { SECONDARY } from '../../constants/Colors';

export const LocationPin = () => (
  <Entypo name="location" style={{ fontSize: 20 }} color={SECONDARY[200]} />
);

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
  // console.log(props);
  const {
    data,
    data: { paddock, pest_details },
    onChange,
    profile,
  } = props;

  return (
    <Container>
      <Content>
        <Label>Property Info</Label>
        <InputContainer label="Property" onChange={onChange('property')} value={data.property} />
        <Item stackedLabel>
          <Label>Date of application</Label>
          <DatePicker
            placeHolderText="Select date"
            placeHolderTextStyle={{ color: '#d3d3d3' }}
            onDateChange={onChange('date')}
            value={data.date}
            defaultDate={new Date()}
          />
        </Item>

        <Label>Paddock Info</Label>
        <InputContainer
          label="Applicator name"
          onChange={onChange('applicator_name')}
          value={data.applicator_name}
        />
        <Picker
          placeholder="Select your location"
          style={{ height: 100 }}
          iosIcon={<LocationPin />}
          placeholderStyle={{ maxWidth: '90%' }}
          onValueChange={onChange('paddock.identification')}
          selectedValue={paddock.identification.locationName}
        >
          {profile.locationData.map(x => {
            return <Picker.Item label={x.locationName} value={x} key={x.locationId} width={100} />;
          })}
        </Picker>

        <InputContainer
          label="Paddock reference no:"
          onChange={onChange('paddock.identification')}
          value={paddock.identification}
        />
        <InputContainer
          label="Treatment area:"
          onChange={onChange('paddock.treatment_area')}
          value={paddock.treatment_area}
        />
        <InputContainer
          label="Growth stage:"
          onChange={onChange('paddock.growth_stage')}
          value={paddock.growth_stage}
        />
        <InputContainer
          label="Crop situation:"
          onChange={onChange('paddock.crop_situation')}
          value={paddock.crop_situation}
        />
        <InputContainer
          label="Comment:"
          onChange={onChange('paddock.comment')}
          value={paddock.comment}
        />

        <Label>Pest Info</Label>
        <InputContainer
          label="Pest type:"
          onChange={onChange('pest_details.pest_type')}
          value={pest_details.pest_type}
        />
        <InputContainer
          label="Growth stage:"
          onChange={onChange('pest_details.growth_stage')}
          value={pest_details.growth_stage}
        />
        <InputContainer
          label="Density:"
          onChange={onChange('pest_details.density')}
          value={pest_details.density}
        />
        <InputContainer
          label="Comments:"
          onChange={onChange('pest_details.comments')}
          value={pest_details.comments}
        />
      </Content>
    </Container>
  );
};

export default ChemForm;
