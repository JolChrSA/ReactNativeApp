import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import * as Permissions from 'expo-permissions'
import MapView, { Marker } from 'react-native-maps'
import * as ImagePicker from 'expo-image-picker';

export default class ProfileComponent extends Component {

    constructor(props) {
        super(props)
        Permissions.askAsync(Permissions.LOCATION)
        navigator.geolocation.watchPosition(this.onSuccess, this.onError)
        this.state = {
            image: null
        }

    }
    onSuccess = (position) => {
        console.log(position);
    }

    onError = (error) => {
        console.log(error.description);

    }

    onMapRegionChange = (region) => {
        //  console.log(region);

    }

    onMapMarkerPressed = (region) => {
        console.log(region);
        console.log('Marker Pressed');
    }

    clickedOnImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        })
        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        } else {
            console.log('Image picker Cancelled')
        }
    }

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.topView}>
                        <Text style={styles.nameText}> Jay Mehta </Text>
                        <TouchableOpacity 
                            onPress={this.clickedOnImage} >
                             {this.state.image ?
                                <Image source={{ uri: this.state.image }} style={styles.imageView} />
                                :
                                <Image source={require("../assets/user.png")} style={styles.imageView} />
                            }   
                            {/* <Image
                                source={require('../assets/user.png')}
                                style={styles.imageView}
                            /> */}
                        </TouchableOpacity>
                        <View style={styles.touchableView}>
                            <TouchableOpacity style={styles.touchableButton} activeOpacity={0.5}>
                                <Image
                                    source={require('../assets/call.png')}
                                    style={styles.imageIconStyle}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.touchableButton} activeOpacity={0.5}>
                                <Image
                                    source={require('../assets/messages.png')}
                                    style={styles.imageIconStyle}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.touchableButton} activeOpacity={0.5}>
                                <Image
                                    source={require('../assets/chats.png')}
                                    style={styles.imageIconStyle}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.secondView}>
                        <Text style={styles.contactInfoTitile}>
                            Contact Information
                        </Text>
                    </View>
                    <View style={styles.thirdView}>
                        <Text style={styles.placeholderText}>
                            Email
                        </Text>
                        <Text style={styles.infoText}>
                            abc@gmail.com
                        </Text>
                        <Text style={styles.placeholderText}>
                            Home
                        </Text>
                        <Text style={styles.infoText}>
                            (079) 555- 5555
                        </Text>
                        <Text style={styles.placeholderText}>
                            Mobile
                        </Text>
                        <Text style={styles.infoText}>
                            (+91) 9876543210
                        </Text>
                        <Text style={styles.placeholderText}>
                            Work
                        </Text>
                        <Text style={styles.infoText}>
                            (+91) 9876543210
                        </Text>
                    </View>
                    <View style={styles.mapView}>
                        <MapView
                            initialRegion={{
                                latitude: 23.029213,
                                longitude: 72.570387,
                                latitudeDelta: 0.09,
                                longitudeDelta: 0.09
                            }
                            }
                            style={{ flex: 1 }}
                            showsUserLocation={true}
                            onRegionChange={this.onMapRegionChange}
                            onMarkerPress={this.onMapMarkerPressed}
                        >
                            <Marker
                                coordinate={{
                                    latitude: 23.029213, longitude: 72.570387
                                }}

                                title='Soution Analyst'
                                description='Analyzing needs Delivering Solutions'
                                identifier='1'
                                onPress={() => {
                                    alert('You tapped the marker!');
                                }} />
                        </MapView>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: "center",
    },
    scrollView: {
        backgroundColor: 'yellow',
        flex: 1
    },
    topView: {
        // flex: 0.5,
        backgroundColor: 'rgba(2,169,255,0.8)',
        alignItems: 'center',
        paddingTop: 70
    },
    nameText: {
        color: 'white',
        // fontWeight: 'bold',
        fontFamily: 'AvenirNext-Heavy',
        fontSize: 25,
        paddingBottom: 40,
    },
    imageView: {
        width: 140,
        height: 140,
        borderRadius: 140 / 2,
        resizeMode: 'cover',
        backgroundColor: 'white'
    },
    touchableView: {
        flexDirection: 'row'
    },
    touchableButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,152,233,1)',//'#485a96',
        // borderWidth: 0.5,
        // borderColor: '#fff',
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        margin: 8,
    },
    imageIconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        tintColor: 'white',
        // borderRadius: 30 / 2,
        resizeMode: 'stretch',
    },
    secondView: {
        backgroundColor: 'rgba(233,234,235,1)',
        height: 60,
        alignContent: 'center',
        justifyContent: 'center'
    },
    contactInfoTitile: {
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'TimesNewRomanPS-BoldMT',
        fontSize: 20,
        padding: 16
    },
    thirdView: {
        backgroundColor: 'white',
        padding: 16,
    },
    placeholderText: {
        color: 'rgba(2,169,255,1)',
        fontWeight: 'bold',
        fontFamily: 'TimesNewRomanPS-BoldMT',
        fontSize: 18,
        paddingBottom: 8,
    },
    infoText: {
        color: 'black',
        fontSize: 16,
        paddingBottom: 8,
    },
    mapView: {
        //    position: 'absolute',
        justifyContent: 'flex-end',
        // alignItems: 'center',
        height: 300,
        //  paddingBottom: 50
    }
});