import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert, Dimensions, SafeAreaView } from 'react-native';
import * as Permissions from 'expo-permissions'
import MapView, { Marker, Polyline, } from 'react-native-maps'

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

export default class MapComponent extends Component {

    constructor(props) {
        super(props)
        Permissions.askAsync(Permissions.LOCATION)
        navigator.geolocation.watchPosition(this.onSuccess, this.onError)
        this.state= {

            coords: null,
          mapRegion: null,
          loading: true
        }
    }

    onSuccess = (position) => {
        console.log(position);
    }

    onError = (error) => {
        console.log(error.description);
        
    }

    componentDidMount(){
        this._watchLocation();
    }
    _watchLocation = async () => {
        await navigator.geolocation.watchPosition(position => {
          this.setState({ coords: position.coords, loading: false });
        });
      };

      _getLocation = async () => {
        await navigator.geolocation.getCurrentPosition(position => {
          // this.setState({ coords: position.coords, loading: false });
          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.012,
            longitudeDelta: 0.012
          };
          this.map.animateToRegion(region, 500);
        });
      };

      render() {
        return (
          <View style={styles.topHeader}>
            <SafeAreaView>
              <View style={{ flex: 1 }}>
                <MapView
                //   provider={PROVIDER_GOOGLE}
                  style={styles.map}
                  showsUserLocation={true}
                  followsUserLocation={true}
                  showsMyLocationButton={true}
                  showsPointsOfInterest={true}
                  showsCompass={true}
                  initialRegion={{
                    latitude: 23.029213,
                    longitude: 72.570387,
                    latitudeDelta: 0.0009,
                    longitudeDelta: 0.0009
                  }}
                >
                  <Marker
                    coordinate={{ latitude: 23.029213, longitude: 72.570387 }}
                    title="Solution Analysts Pvt Ltd"
                    description="Solution Analysts Pvt Ltd, 101, Sankalp Iconic, Opp. Vikram Nagar, Ambli - Bopal Road, Iskcon Cross Road, Ahmedabad, Gujarat" 
                    onPress={() => {
                      // Alert.alert("Ahmedabad", "Solution Analysts Pvt Ltd");
                      this._getLocation()
                    }}
                  />  
    
                  <Polyline
                    coordinates={[
                      { latitude: 23.029213, longitude: 72.570387 },
                      // { latitude: 23.109144, longitude: 71.919733 },
                      // { latitude: 23.015004, longitude: 71.41856 },
                      // { latitude: 23.019386, longitude: 71.075313 },
                      { latitude: 23.240952, longitude: 69.672179 },
                      { latitude: 23.302622, longitude: 69.682503 }
                    ]}
                    strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeColors={[
                      "#7F0000",
                      "#00000000", // no color, creates a "long" gradient between the previous and next coordinate
                      "#B24112",
                      "#E5845C",
                      "#238C23",
                      "#7F0000"
                    ]}
                    strokeWidth={5}
                  />
                </MapView>
              </View>
            </SafeAreaView>
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      map: {
        height: screenHeight,
        width: screenWidth
      },
      topHeader: {
        ...Platform.select({
          ios: {},
        })
      }
    });

//     render() {
//         return <View style={styles.container}>
//             <MapView
//                 initialRegion={{
//                     latitude: 23.025836,
//                     longitude: 72.503349,
//                     latitudeDelta: 0.09,
//                     longitudeDelta: 0.09
//                     }
//                 }
//                style={{flex:1}}
//                showsUserLocation={true}
//                onRegionChange= {this.onMapRegionChange}
//                onMarkerPress={this.onMapMarkerPressed}
//             >
//                 <Polyline
//                   	coordinates={[
//                         { latitude: 22.258652, longitude: 71.192383 }, 
//                         { latitude: 23.109144, longitude: 71.919733 }, 
//                         { latitude: 23.015004, longitude: 71.418560 },
//                         { latitude: 23.019386, longitude: 71.075313 },
//                         { latitude: 23.240952, longitude: 69.672179 },
//                         { latitude: 23.302622, longitude: 69.682503 }
//                     ]}
//                     strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
//                     strokeColors={[
//                         '#7F0000',
//                         '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
//                         '#B24112',
//                         '#E5845C',
//                         '#238C23',
//                         '#7F0000'
//                     ]}
//                     strokeWidth={5}
//                         />
//                 <Marker
//                     coordinate={{
//                        latitude: 22.258652,longitude: 71.192383
//                     }}
                    
//                     title='Soution Analyst'
//                     description='Analyzing needs Delivering Solutions'
//                     identifier= '1'
//                     onPress={() => {
//                         alert('You tapped the marker!');
//                    }} /> 
//             </MapView>
//         </View>
//     }

//     onMapRegionChange = (region) => {
//       //  console.log(region);
        
//     }

//     onMapMarkerPressed = (region) => {
//         console.log(region);
//         console.log('Marker Pressed');
//     }

// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     }
// })