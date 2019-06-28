// Maintain mostly white background
// Drop in contrasting elements using primary_color and secondary_color as key key backdrops
// Secondary text and Primary Text will only be used on coloured backgrounds.
const buttonColors = {
  // Green
  PRIMARY_BUTTON_COLOR: '#64B3AB',

  // WHITE
  SECONDARY_BUTTON_COLOR: '#FFF',
}

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
export default { ...colors, ...buttonColors };
