import React from 'react';
import { Button } from 'native-base';
import { pick } from 'lodash';
import colors from '../constants/Colors';

const primaryStyles = {
  backgroundColor: colors.PRIMARY_BUTTON_COLOR,
}
const secondaryStyles = {
  backgroundColor: colors.SECONDARY_BUTTON_COLOR,
}

export const PrimaryButton = (props) => <Button {...props} style={primaryStyles} />

export const SecondaryButton = (props) => <Button {...props} style={secondaryStyles} />