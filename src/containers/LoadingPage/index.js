import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  View
} from 'react-native';

class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async () => {
    const token = await AsyncStorage.getItem('token');

    setTimeout(() => {
      this.props.navigation.navigate(token ? 'App' : 'Auth');
    }, 0);
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{ flex: 1, justifyContent: `center`, alignItems: `center` }}>
        <ActivityIndicator size='large' color='#0000ff'/>
      </View>
    );
  }
}

export default LoadingScreen;