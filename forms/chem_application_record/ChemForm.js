import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { StyleSheet, View, Dimensions } from 'react-native';
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

const DateAndLocation = ({ profile, handleChange, errors, values, values: { location } }) => (
  <>
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
  </>
);

const Application = ({ profile, values, values: { location }, errors, handleChange }) => (
  <>
    <InputContainer
      label="Applicator name"
      onChange={handleChange('applicatorName')}
      value={values.applicatorName}
    />
    <ErrorMessage errors={get(errors, 'applicatorName', '')} />
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
  </>
);

const AreaLocation = ({ values, location, profile, errors, handleChange, area }) => (
  <>
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
      {(profile.areas || [])
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
    <InputContainer label="Comment:" onChange={handleChange('area.comment')} value={area.comment} />
  </>
);

const PestInfo = ({ pestDetails, values, handleChange }) => (
  <>
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
  </>
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
      <Button onPress={next} style={isLast ? style.disabled : style.nextButton} disabled={isLast}>
        <Text>Next</Text>
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
    name: 'Application',
    component: Application,
  },
  {
    name: 'AreaLocation',
    component: AreaLocation,
  },
  {
    name: 'Pest Info',
    component: PestInfo,
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
              onAnimationComplete={() => console.log('onAnimationComplete')}
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
          isLast={isLast}
          isFirst={isFirst}
        />
      </Container>
    );
  }
}

export default ChemForm;
