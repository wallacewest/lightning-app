import React from 'react';
import { storiesOf } from '@storybook/react';
import Background from '../../src/component/background';
import MainContent from '../../src/component/main-content';
import Icon from '../../src/component/icon';
import { colors } from '../../src/component/style';

const styles = {
  icon: {
    color: colors.white,
    height: '2em',
    width: '2em',
  },
};

storiesOf('Icons', module)
  .addDecorator(story => (
    <Background image="purple-gradient-bg">
      <MainContent style={{ justifyContent: 'center' }}>{story()}</MainContent>
    </Background>
  ))
  .add('Back', () => <Icon image="back" style={styles.icon} />)
  .add('Cancel', () => <Icon image="cancel" style={styles.icon} />);
