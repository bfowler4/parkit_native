import React from 'react';
import { Icon, Button, Header, Container, Content, Left } from 'native-base';

export default ({ navigation, children }) => {
  return (
    <Container style={{ flex: 1 }}>
      <Header>
        <Left>
          <Icon name="ios-menu" onPress={() => navigation.navigate('DrawerOpen')} />
        </Left>
      </Header>
      <Content contentContainerStyle={{ flex: 1 }}>
        {children}
      </Content>
    </Container>
  );
}