import React from 'react';
import Svg, { G, Path, Rect } from 'react-native-svg';

import { PRIMARY, GREY, SECONDARY } from '../../constants/Colors';

const Calculator = props => (
  <Svg width={72} height={90} {...props}>
    <G fill="none" fillRule="evenodd" stroke="#064C04" transform="translate(1 1)">
      <Path
        fill="#BDECBB"
        d="M2 0h66a2 2 0 0 1 2 2v84a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm12 13a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h42a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H14zm0 18a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-6zm18 0a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-6zm18 0a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-6zM14 49a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-6zm18 0a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-6zM14 67a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-6zm18 0a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-6z"
      />
      <Rect width={8} height={26} x={49} y={49} fill="#EFB33B" rx={1} />
    </G>
  </Svg>
);

const Document = props => (
  <Svg width={72} height={90} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path
        fill="#BDECBB"
        stroke="#064C04"
        d="M9.747 1h26.241v26.4c0 4.86 3.916 8.8 8.747 8.8h26.24v44c0 4.86-3.915 8.8-8.746 8.8H9.747C4.917 89 1 85.06 1 80.2V9.8C1 4.94 4.916 1 9.747 1z"
      />
      <Path fill="#EFB33B" stroke="#014D00" d="M44.47 1l26.506 26.506H44.47z" />
    </G>
  </Svg>
);

export { Calculator, Document };
