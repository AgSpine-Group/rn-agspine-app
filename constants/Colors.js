const PRIMARY = {
  100: '#DFFFDD',
  200: '#A5E0A2',
  300: '#BDECBB',
  400: '#34AD2F',
  500: '#239E1E',
  600: '#289124',
  700: '#297026',
  800: '#064C04',
};

const GREY = {
  100: '#F7FAF7',
  200: '#EBF0EB',
  300: '#EDF0ED',
  400: '#CFD7CE',
  500: '#939C93',
  600: '#7E847E',
  700: '#6A716A',
  800: '#565956',
};

const SECONDARY = {
  300: '#EFB33B',
  200: '#F9DA69',
};

const WHITE = '#FFF';

const buttonColors = {
  // Green
  PRIMARY_BUTTON_COLOR: '#64B3AB',

  // WHITE
  SECONDARY_BUTTON_COLOR: '#FFF',
};

const colors = {
  // Heavy orange
  PRIMARY_COLOR: '#DB8946',
  // Dark black
  SECONDARY_COLOR: '#2C2C2C',
  // Light yella
  SHADED_PRIMARY: '#FAECCC',
  //
  PRIMARY_TEXT_COLOR: '#F3B85B',
  // White
  SECONDARY_TEXT_COLOR: '#FFF',
};

export { PRIMARY, GREY, SECONDARY, WHITE };
export default {
  ...colors,
  ...buttonColors,
};
