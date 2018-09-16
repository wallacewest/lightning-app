import React, { Component } from 'react';
import {
  TextInput as RNTextInput,
  Text as RNText,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { color, font } from './style';

//
// Base Text Input
//

const baseStyles = StyleSheet.create({
  input: {
    fontFamily: 'OpenSans Regular',
    fontSize: font.sizeM,
    lineHeight: font.lineHeightM + 2 * 12,
    color: color.blackText,
  },
});

export const TextInput = ({ style, ...props }) => (
  <RNTextInput
    style={[baseStyles.input, style]}
    autoCorrect={false}
    autoCapitalize="none"
    underlineColorAndroid="rgba(0,0,0,0)"
    placeholderTextColor={color.greyPlaceholder}
    {...props}
  />
);

TextInput.propTypes = {
  style: RNText.propTypes.style,
};

//
// Horizontal Expanding Text Input
//

export class HorizontalExpandingTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '', width: 0 };
  }
  render() {
    const { value, charWidth, onChangeText, style, ...props } = this.props;
    return (
      <TextInput
        value={value || this.state.text}
        onChangeText={text => {
          this.setState({ text, width: charWidth * (text.length + 1) });
          onChangeText && onChangeText(text);
        }}
        style={[
          style,
          {
            width: Math.max(
              charWidth * 2,
              value ? charWidth * (value.length + 1) : this.state.width
            ),
          },
        ]}
        {...props}
      />
    );
  }
}

HorizontalExpandingTextInput.propTypes = {
  value: PropTypes.string,
  charWidth: PropTypes.number.isRequired,
  onChangeText: PropTypes.func,
  style: RNText.propTypes.style,
};

//
// Adjusting Text Input
//

const calculateWidthAndFontSize = (
  text,
  maxWidth,
  defaultFontSize,
  fontWidthHeightRatio
) => {
  const predictedTextLength = text.length || 1;
  const calculatedWidth = Math.min(
    maxWidth,
    predictedTextLength * defaultFontSize * fontWidthHeightRatio
  );
  const calculatedFontSize =
    calculatedWidth >= maxWidth
      ? Math.min(
          defaultFontSize,
          calculatedWidth / predictedTextLength / fontWidthHeightRatio
        )
      : defaultFontSize;

  return { calculatedWidth, calculatedFontSize };
};

export class AdjustingTextInput extends Component {
  constructor(props) {
    super(props);
    const { defaultFontSize, fontWidthHeightRatio } = props;

    this.state = {
      text: '',
      width: defaultFontSize * fontWidthHeightRatio,
      fontSize: defaultFontSize,
    };

    this.onChangeTextHandler = this.onChangeTextHandler.bind(this);
  }

  onChangeTextHandler(
    changedText,
    maxWidth,
    defaultFontSize,
    fontWidthHeightRatio,
    onChangeText
  ) {
    const { calculatedWidth, calculatedFontSize } = calculateWidthAndFontSize(
      changedText,
      maxWidth,
      defaultFontSize,
      fontWidthHeightRatio
    );

    if (changedText.match(/^(?:[1-9]\d*|0)?(?:\.\d*)?$/)) {
      this.setState({
        text: changedText,
        width: calculatedWidth,
        fontSize: calculatedFontSize,
      });
      onChangeText && onChangeText(changedText);
    }
  }

  render() {
    const {
      value,
      style,
      fontWidthHeightRatio,
      defaultFontSize,
      maxWidth,
      onChangeText,
      ...props
    } = this.props;
    const { text, width, fontSize } = this.state;
    const calculatedStyle = [
      style,
      {
        width,
        fontSize,
      },
    ];

    return (
      <TextInput
        value={value || text}
        onChangeText={changedText =>
          this.onChangeTextHandler(
            changedText,
            maxWidth,
            defaultFontSize,
            fontWidthHeightRatio,
            onChangeText
          )
        }
        style={calculatedStyle}
        {...props}
      />
    );
  }
}

AdjustingTextInput.propTypes = {
  value: PropTypes.string,
  fontWidthHeightRatio: PropTypes.number.isRequired,
  defaultFontSize: PropTypes.number.isRequired,
  maxWidth: PropTypes.number.isRequired,
  onChangeText: PropTypes.func,
  style: RNText.propTypes.style,
};

export default TextInput;
