import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native';
import * as Permissions from 'expo-permissions'
import MapView, { Marker, Polyline } from 'react-native-maps'

export default class MapComponent extends Component {

    constructor() {
        super()
        Permissions.askAsync(Permissions.LOCATION)
        navigator.geolocation.watchPosition(this.onSuccess, this.onError)
    }

    onSuccess = (position) => {
        console.log(position);
    }

    onError = (error) => {

    }


    render() {
        return <View style={styles.container}>
            <MapView
                initialRegion={{
                    latitude: 23.025836,
                    longitude: 72.503349,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.09
                    }
                }
               style={{flex:1}}
               showsUserLocation={true}
               onRegionChange= {this.onMapRegionChange}
               onMarkerPress={this.onMapMarkerPressed}
            >
                <Polyline
                  	coordinates={[
                        { latitude: 22.258652, longitude: 71.192383 }, 
                        { latitude: 23.109144, longitude: 71.919733 }, 
                        { latitude: 23.015004, longitude: 71.418560 },
                        { latitude: 23.019386, longitude: 71.075313 },
                        { latitude: 23.240952, longitude: 69.672179 },
                        { latitude: 23.302622, longitude: 69.682503 }
                    ]}
                    strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeColors={[
                        '#7F0000',
                        '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                        '#B24112',
                        '#E5845C',
                        '#238C23',
                        '#7F0000'
                    ]}
                    strokeWidth={5}
                        />
                <Marker
                    coordinate={{
                       latitude: 22.258652,longitude: 71.192383
                    }}
                    
                    title='Soution Analyst'
                    description='Analyzing needs Delivering Solutions'
                    identifier= '1'
                    onPress={() => {
                        alert('You tapped the marker!');
                   }} /> 
            </MapView>
        </View>
    }

    onMapRegionChange = (region) => {
      //  console.log(region);
        
    }

    onMapMarkerPressed = (region) => {
        console.log(region);
        console.log('Marker Pressed');
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})