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
    // return this.props.navigation.navigate('Payment');
    if (token) {
      const activeRole = await AsyncStorage.getItem(`activeRole`);
      switch (activeRole) {
        case `park`:
          return this.props.navigation.navigate(`ParkHome`);
        case `host`:
          return this.props.navigation.navigate(`HostHome`);
        default:
          return this.props.navigation.navigate(`RolePick`);
      }
    } else {
      this.props.navigation.navigate('Auth');
    }
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