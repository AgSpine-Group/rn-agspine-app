import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, View, Dimensions } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
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

import { SECONDARY, GREY, PRIMARY } from '../../constants/Colors';

let { width } = Dimensions.get('window'); // full width

const style = StyleSheet.create({
  background: {
    backgroundColor: GREY[300],
    flexDirection: 'column',
    width: '100%',
  },
  contentBackground: {
    backgroundColor: '#fff',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
  },
  progressContainer: {
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  progress: {
    flex: 1,
  },
  progressTextContainer: {
    display: 'flex',
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAlignLeft: {
    width: '80%',
    textAlign: 'left',
  },
  titleText: {
    fontSize: 18,
    color: GREY[800],
  },
  nextText: {
    fontSize: 14,
    color: GREY[600],
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: GREY[200],
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    padding: 15,
  },
  nextButton: {
    width: '45%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: PRIMARY[400],
  },
  disabled: {
    width: '45%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: GREY[200],
  },
  previousButton: {
    width: '45%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: PRIMARY[300],
  },
});

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

const DateAndLocation = ({ profile, handleChange, errors, values, area, values: { location } }) => (
  <ScrollView>
    <Picker
      placeholder="Select a location"
      style={{ height: 100 }}
      iosIcon={<FormIcon name="home" />}
      placeholderStyle={{ maxWidth: '90%' }}
      onValueChange={id => {
        const selectedLocation = profile.locations.find(locations => locations.id === id);
        handleChange('location')({
          id: selectedLocation.id,
          locationName: selectedLocation.locationName,
        });
      }}
      selectedValue={location.id}
    >
      {profile.locations.map(l => {
        return <Picker.Item label={l.locationName} value={l.id} key={l.id} width={100} />;
      })}
    </Picker>
    <ErrorMessage errors={get(errors, 'location.id', '')} />

    <Picker
      placeholder="Select an area"
      style={{ height: 100 }}
      iosIcon={<FormIcon name="location" />}
      placeholderStyle={{ maxWidth: '90%' }}
      onValueChange={id => {
        const selectedArea = profile.areas.find(ar => ar.id === id);
        handleChange('area.identification')({
          id: selectedArea.id,
          areaName: selectedArea.areaName,
        });
      }}
      selectedValue={area.identification.id}
    >
      {(profile.areas || [])
        .filter(a => a.location.id === location.id)
        .map(x => {
          return <Picker.Item label={x.areaName} value={x.id} key={x.id} width={100} />;
        })}
    </Picker>
    <ErrorMessage errors={get(errors, 'area.identification.id', '')} />

    <InputContainer
      label="Applicator name"
      onChange={handleChange('applicatorName')}
      value={values.applicatorName}
    />
    <ErrorMessage errors={get(errors, 'applicatorName', '')} />
    <Item stackedLabel>
      <Label>Date of application</Label>
      <DatePicker
        placeHolderText="Select date"
        placeHolderTextStyle={{ color: '#d3d3d3' }}
        onDateChange={date =>
          handleChange('chemicalDetails.whpEndDate')(new Date(date).toISOString())
        }
        value={values.chemicalDetails.whpEndDate}
        defaultDate={new Date()}
      />
    </Item>
    <ErrorMessage errors={get(errors, 'date', '')} />
  </ScrollView>
);

const ChemicalInfortion = ({ values, errors, handleChange }) => (
  <ScrollView>
    <InputContainer
      label="Chemical Product"
      onChange={handleChange('chemicalDetails.product')}
      value={values.chemicalDetails.product}
    />
    <ErrorMessage errors={get(errors, 'chemicalDetails.product', '')} />
    <InputContainer
      label="Action Group"
      onChange={handleChange('chemicalDetails.actionGroup')}
      value={values.chemicalDetails.actionGroup}
    />
    <InputContainer
      label="Batch Number"
      onChange={handleChange('chemicalDetails.batchNo')}
      value={values.chemicalDetails.batchNo}
    />
    <InputContainer
      label="Rate"
      onChange={handleChange('chemicalDetails.rate')}
      value={values.chemicalDetails.rate}
    />
    <InputContainer
      label="WHP"
      onChange={handleChange('chemicalDetails.whp')}
      value={values.chemicalDetails.whp}
    />
    <Item stackedLabel>
      <Label>Date of application</Label>
      <DatePicker
        placeHolderText="Select date"
        placeHolderTextStyle={{ color: '#d3d3d3' }}
        onDateChange={date =>
          handleChange('chemicalDetails.whpEndDate')(new Date(date).toISOString())
        }
        value={values.chemicalDetails.whpEndDate}
        defaultDate={new Date()}
      />
    </Item>
  </ScrollView>
);

const AreaInformation = ({ handleChange, area }) => (
  <ScrollView>
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
    <InputContainer label="Comment:" onChange={handleChange('area.comment')} value={area.comment} />
  </ScrollView>
);
const ApplicationDetails = ({ values, handleChange }) => (
  <ScrollView>
    <InputContainer
      label="Nozzle Brand:"
      onChange={handleChange('applicationDetails.nozzleBrand')}
      value={values.applicationDetails.nozzleBrand}
    />
    <InputContainer
      label="Nozzle Type:"
      onChange={handleChange('applicationDetails.nozzleType')}
      value={values.applicationDetails.nozzleType}
    />
    <InputContainer
      label="Spray Quality:"
      onChange={handleChange('applicationDetails.sprayQuality')}
      value={values.applicationDetails.sprayQuality}
    />
    <InputContainer
      label="Angle:"
      onChange={handleChange('applicationDetails.angle')}
      value={values.applicationDetails.angle}
    />
    <InputContainer
      label="Size:"
      onChange={handleChange('applicationDetails.size')}
      value={values.applicationDetails.size}
    />
    <InputContainer
      label="Pressure:"
      onChange={handleChange('applicationDetails.pressure')}
      value={values.applicationDetails.pressure}
    />
    <InputContainer
      label="Water rate:"
      onChange={handleChange('applicationDetails.waterRate')}
      value={values.applicationDetails.waterRate}
    />
    <InputContainer
      label="Quantity Applied:"
      onChange={handleChange('applicationDetails.quantityApplied')}
      value={values.applicationDetails.quantityApplied}
    />
    <InputContainer
      label="Water source:"
      onChange={handleChange('applicationDetails.waterSource')}
      value={values.applicationDetails.waterSource}
    />
  </ScrollView>
);

const PestInfo = ({ pestDetails, handleChange }) => (
  <ScrollView>
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
      onChange={handleChange('pestDetails.comment')}
      value={pestDetails.comment}
    />
  </ScrollView>
);

const BottomButtons = ({ next, isLast, isFirst, previous }) => (
  <View style={style.bottomContainer}>
    <View style={style.buttonContainer}>
      <Button
        onPress={previous}
        style={isFirst ? style.disabled : style.previousButton}
        disabled={isFirst}
      >
        <Text style={{ color: isFirst ? GREY[400] : PRIMARY[400] }}>Back</Text>
      </Button>
      <Button onPress={next} style={style.nextButton}>
        <Text>{isLast ? 'Submit' : 'Next'}</Text>
      </Button>
    </View>
  </View>
);

const forms = [
  {
    name: 'Date and Location',
    component: DateAndLocation,
  },
  {
    name: 'Area',
    component: AreaInformation,
  },
  {
    name: 'Pest',
    component: PestInfo,
  },
  {
    name: 'Chemical',
    component: ChemicalInfortion,
  },
  {
    name: 'Application Details',
    component: ApplicationDetails,
  },
];

/* eslint-disable */
class ChemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
    };
  }

  handleIncrement = () => {
    const current = this.state.progress;
    const inc = current + 1;

    this.setState({
      progress: inc,
    });
  };

  handleDecrement = () => {
    const current = this.state.progress;
    const inc = current - 1;
    this.setState({
      progress: inc,
    });
  };

  render() {
    const {
      values: { area, pestDetails, location },
      handleSubmit,
    } = this.props;

    const Form = forms[this.state.progress].component;
    const progress = Math.round(((this.state.progress + 1) / forms.length) * 100);
    const isLast = this.state.progress + 1 === forms.length;
    const isFirst = this.state.progress === 0;

    return (
      <Container style={style.background}>
        <View style={style.progressContainer}>
          <View style={style.progress}>
            <AnimatedCircularProgress
              size={100}
              width={10}
              fill={progress}
              tintColor={SECONDARY[300]}
              backgroundColor={SECONDARY[200]}
            />
          </View>
          <View style={style.progressTextContainer}>
            <Text style={Object.assign({}, style.textAlignLeft, style.titleText)}>
              {forms[this.state.progress].name}
            </Text>
            {!isLast && (
              <Text style={Object.assign({}, style.textAlignLeft, style.nextText)}>
                Next: {forms[this.state.progress + 1].name}
              </Text>
            )}
          </View>
        </View>
        <Container style={style.contentBackground}>
          <View style={style.contentContainer}>
            <Form {...this.props} {...{ area, pestDetails, location }} />
          </View>
        </Container>
        <BottomButtons
          next={isLast ? handleSubmit : this.handleIncrement}
          previous={this.handleDecrement}
          isFirst={isFirst}
          isLast={isLast}
        />
      </Container>
    );
  }
}

export default ChemForm;
