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
  <Svg width={24} height={24} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path
        fill={PRIMARY[300]}
        d="M6 2h6v6a2 2 0 0 0 2 2h6v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
      />
      <Path fill={SECONDARY[300]} d="M14 2l6 6h-6z" />
    </G>
  </Svg>
);

export { Calculator, Document };
