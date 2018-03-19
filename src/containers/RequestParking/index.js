import React, {Component } from 'react';
import { connect } from 'react-redux'
import { View , Text } from 'react-native';
import { MapView } from 'expo'
import Dimensions from 'Dimensions';


class ReqPark extends Component {
  constructor(props){
    super(props);
    this.state = {
     

    }
  }
  componentWillMount(){
    
  }
  render(){
    // console.log('space', this.props.space.longitude)
    console.log('customer', this.props.customer.longitude)
    
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    return (
      <View>
          {/* <MapView
          style={{ flex: 1 }}
          showsUserLocation={true}
          followUserLocation={true}
          initialRegion={{
            latitude: this.props.space.latitude,
            longitude: this.props.space.longitude,
            latitudeDelta: .05 * (screenWidth / screenHeight),
            longitudeDelta: .05 * (screenWidth / screenHeight),
          }}
          followUserLocation={true}>
          </MapView> */}
      </View>
    )
  }
}


const mapStateToProps = state => {
  
  return {
    space:state.park.space,
    customer:state.park.customerCoors
  }
}

const mapDispatchToProps = dispatch => {
  return {
 
    
  }
}

export default ConnectedLoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReqPark);