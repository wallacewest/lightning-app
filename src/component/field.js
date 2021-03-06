import React from 'react';
import { Text as RNText, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Text from './text';
import { TextInput, AdjustingTextInput } from './input';
import { color, font, fontFamily } from './style';

//
// Amount Input Field
//

const amountFont = fontFamily.WorkSansExtraLight;

const amountStyles = StyleSheet.create({
  input: {
    textAlign: 'right',
    fontFamily: amountFont.name,
    height: 105,
  },
});

export const AmountInputField = ({ style, ...props }) => (
  <AdjustingTextInput
    style={[amountStyles.input, style]}
    fontWidthHeightRatio={amountFont.widthHeightRatio}
    defaultFontSize={font.sizeXXXL}
    keyboardType="numeric"
    placeholder="0"
    {...props}
  />
);

AmountInputField.propTypes = {
  style: RNText.propTypes.style,
};

//
// Input Field
//

const inputStyles = StyleSheet.create({
  input: {
    alignSelf: 'stretch',
    textAlign: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export const InputField = ({ style, ...props }) => (
  <TextInput style={[inputStyles.input, style]} {...props} />
);

InputField.propTypes = {
  children: PropTypes.string,
  style: RNText.propTypes.style,
};

//
// Named Field
//

const namedStyles = StyleSheet.create({
  content: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: color.blackText,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  name: {
    color: color.blackText,
    fontSize: font.sizeM,
    lineHeight: font.lineHeightM + 2 * 12,
    marginRight: 15,
  },
  text: {
    flex: 1,
    textAlign: 'right',
    fontSize: font.sizeM,
    lineHeight: font.lineHeightM + 2 * 12,
    color: color.blackText,
    opacity: 0.5,
  },
});

export const NamedField = ({ name, children, style }) => (
  <View style={[namedStyles.content, style]}>
    <Text style={namedStyles.name}>{name}</Text>
    <Text style={namedStyles.text} numberOfLines={1}>
      {children}
    </Text>
  </View>
);

NamedField.propTypes = {
  name: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  style: View.propTypes.style,
};

//
// Detail Field
//

const detailStyles = StyleSheet.create({
  content: {
    alignSelf: 'stretch',
    marginTop: 12,
    borderBottomColor: color.greyLight,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  name: {
    fontFamily: 'OpenSans Bold',
    fontSize: font.sizeXS,
    lineHeight: font.lineHeightXS,
    color: color.blackDark,
  },
  text: {
    fontSize: font.sizeXS,
    lineHeight: font.lineHeightXS + 2 * 3,
    color: color.blackDark,
  },
});

export const DetailField = ({ name, children, style }) => (
  <View style={[detailStyles.content, style]}>
    <Text style={detailStyles.name}>{name}</Text>
    <Text style={detailStyles.text}>{children}</Text>
  </View>
);

DetailField.propTypes = {
  name: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  style: View.propTypes.style,
};
