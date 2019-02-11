import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, DatePicker } from 'native-base';

export default ChemForm = (props) => {
  return (
    <Container>
      <Content>
        <Item stackedLabel last>
          <Label>Property</Label>
          <Input />
        </Item>
        <Item stackedLabel>
          <Label>Date of application</Label>
          <DatePicker
            placeHolderText="Select date"
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={props.onChange('date')}
          />
        </Item>
        <Item stackedLabel>
          <Label>Applicator Name</Label>
          <Input
            onChangeText={props.onChange('applicator_name')}
            value={props.data.applicator_name}
          />
        </Item>
        <Item stackedLabel>
          <Label>Paddock reference no:</Label>
          <Input />
        </Item>
        <Item stackedLabel first>
          <Label>Treatment area</Label>
          <Input />
        </Item>
      </Content>
    </Container >
  );
}
