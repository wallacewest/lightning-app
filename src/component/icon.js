import React from 'react';
import { TextPropTypes } from 'react-native';
import PropTypes from 'prop-types';

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

const Icon = ({ image, style }) => {
  const Svg = require(`../../assets/react-svg/${capitalize(image)}`).default;
  return <Svg style={style} />;
};

Icon.propTypes = {
  image: PropTypes.string.isRequired,
  style: TextPropTypes.style,
};

export default Icon;
