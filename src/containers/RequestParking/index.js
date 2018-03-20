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

  componentWillMount (){
    this.setState({})
  
  }
  
  render(){
 
   console.log(this.props.space.latitude)
   console.log(this.props.space.longitude)
    
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    return (
      <View style={{flex:1}}>
        <MapView
        style={{ flex: 1 }}
       initialRegion={{
      latitude: this.props.space.latitude,
      longitude: this.props.space.longitude,
      latitudeDelta: .05 * (screenWidth / screenHeight),
      longitudeDelta: .05 * (screenWidth / screenHeight),
    }}>
    <MapView.Marker
            coordinate={{latitude: this.props.space.latitude,
            longitude: this.props.space.longitude}} />
    
    </MapView>

    
          
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