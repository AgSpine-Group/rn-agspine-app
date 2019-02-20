import React, { Component } from 'react';
import { Container, Content, Item, Input, Label, DatePicker } from 'native-base';

export default ChemForm = (props) => {
  const { data, data: { paddock, pest_details }, onChange } = props
  return (
    <Container>
      <Content>
        <Item stackedLabel last>
          <Label>Property</Label>
          <Input
            onChangeText={onChange('property')}
            value={data.property}
          />
        </Item>
        <Item stackedLabel>
          <Label>Date of application</Label>
          <DatePicker
            placeHolderText="Select date"
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={onChange('date')}
            value={data.date}
            defaultDate={new Date()}
          />
        </Item>
        <Item stackedLabel>
          <Label>Applicator name</Label>
          <Input
            onChangeText={onChange('applicator_name')}
            value={data.applicator_name}
          />
        </Item>
        <Item stackedLabel>
          <Label>Paddock reference no:</Label>
          <Input
            onChangeText={onChange('paddock.identification')}
            value={data.paddock.identification}
          />
        </Item>
        <Item stackedLabel>
          <Label>Treatment area:</Label>
          <Input
            onChangeText={onChange('paddock.treatment_area')}
            value={paddock.treatment_area}
          />
        </Item>
        <Item stackedLabel>
          <Label>Growth stage:</Label>
          <Input
            onChangeText={onChange('paddock.growth_stage')}
            value={paddock.growth_stage}
          />
        </Item>
        <Item stackedLabel>
          <Label>Crop situation:</Label>
          <Input
            onChangeText={onChange('paddock.growth_stage')}
            value={paddock.crop_situation}
          />
        </Item>
        <Item stackedLabel>
          <Label>Comment:</Label>
          <Input
            onChangeText={onChange('paddock.comment')}
            value={paddock.comment}
          />
        </Item>
        <Item stackedLabel>
          <Label>Pest type:</Label>
          <Input
            onChangeText={onChange('pest_details.pest_type')}
            value={pest_details.pest_type}
          />
        </Item>
        <Item stackedLabel>
          <Label>Growth stage:</Label>
          <Input
            onChangeText={onChange('pest_details.growth_stage')}
            value={pest_details.growth_stage}
          />
        </Item>
        <Item stackedLabel>
          <Label>Density:</Label>
          <Input
            onChangeText={onChange('pest_details.density')}
            value={pest_details.density}
          />
        </Item>
        <Item stackedLabel>
          <Label>Comments:</Label>
          <Input
            onChangeText={onChange('paddock.comments')}
            value={pest_details.identification}
          />
        </Item>
      </Content>
    </Container >
  );
}
