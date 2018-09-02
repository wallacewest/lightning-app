import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Picker, View } from 'react-native';
import { storiesOf } from '../storybook-react';
import { action } from '@storybook/addon-actions';
import Text from '../../src/component/text';
import {
  ListContent,
  List,
  ListItem,
  ListHeader,
  SettingItem,
  SettingPicker,
} from '../../src/component/list';
import { color } from '../../src/component/style';

storiesOf('List', module)
  .add('List Content', () => (
    <ListContent>
      <List
        data={[...Array(1000)].map((x, i) => ({ id: String(i), data: 'foo' }))}
        renderHeader={() => (
          <ListHeader>
            <Text style={{ flex: 1, color: color.greyText }}>ID</Text>
            <Text style={{ flex: 1, color: color.greyText }}>Data</Text>
          </ListHeader>
        )}
        renderItem={item => <CustomListItem item={item} />}
      />
    </ListContent>
  ))
  .add('Setting Item', () => (
    <View>
      <SettingItem name="First Item" onSelect={action('clicked')}>
        <Text>✓</Text>
      </SettingItem>
      <SettingItem name="Second Item" onSelect={action('clicked')}>
        <Text>✗</Text>
      </SettingItem>
      <SettingItem name="Third Item" onSelect={action('clicked')}>
        <Text>✗</Text>
      </SettingItem>
    </View>
  ))
  .add('Setting Picker', () => (
    <SettingPicker selectedValue="first" onValueChange={action('clicked')}>
      <Picker.Item label="First Option" value="first" />
      <Picker.Item label="Second Option" value="second" />
      <Picker.Item label="Third Option" value="third" />
    </SettingPicker>
  ));

class CustomListItem extends PureComponent {
  render() {
    const { item } = this.props;
    return (
      <ListItem onSelect={action('select')}>
        <Text style={{ flex: 1, color: color.blackText }}>{item.id}</Text>
        <Text style={{ flex: 1, color: color.blackText }}>{item.data}</Text>
      </ListItem>
    );
  }
}

CustomListItem.propTypes = {
  item: PropTypes.object.isRequired,
};
