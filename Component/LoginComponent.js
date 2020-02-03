import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Alert, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native'
import RecepiListComponent from './RecepiListComponent'

export default class LoginComponent extends Component {

  constructor() {
    super()
    this.state = {
      email: 'jm1@example.com',
      password: 'jay@123',
      token: null,
      isLoading: false
    }
  }

  render() {
    if (this.state.token != null) {
      return (
        //<View style={styles.container}>
          <RecepiListComponent token={this.state.token} />
        //</View>
      )
    } else {
      return (
        <View style={styles.container}>
          <ImageBackground source={require("../assets/foodBg.jpeg")} style={{ width: '100%', height: '100%', resizeMode: 'cover' }}>
            <View style={styles.topView}>
              <Image
                style={[{ width: 150, height: 150 }, styles.reactIcon]}
                source={require('../assets/reactLogo.png')}
              ></Image>
              <Text style={styles.logintText}>LOGIN </Text>
            </View>
            <View style={styles.middleView}>
              <TextInput
                placeholder='Email'
                keyboardType='email-address'
                placeholderTextColor='white'
                value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
                style={[styles.commonTextInput, styles.emailTextInput]}
              >
              </TextInput>
              <TextInput
                placeholder='Password'
                secureTextEntry={true}
                placeholderTextColor='white'
                fontWeight='bold'
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
                style={styles.commonTextInput}
              >
              </TextInput>
            </View>
            <View style={styles.bottomView}>
              <TouchableOpacity style={styles.loginButton} onPress={this.onLogin}>
                <Text style={styles.loginButtonText}>
                  LOGIN
                  </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      );
    }
  }

  onLogin = () => {
    if (this.state.email != '') {
        if (this.state.password != '') {
            this.setState({ isLoading: true });
            fetch('http://35.160.197.175:3006/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'email': this.state.email,
                    'password': this.state.password
                })
            }).then((response) => {
                return response.json()
            }).then((responseJson) => {
                this.setState({ isLoading: false });
                if (responseJson.error == null) {
                    console.log(responseJson);
                    this.setState({token:responseJson.token})
                } else {
                    Alert.alert('Error', responseJson.error)
                }
            }).catch((error) => {
                this.setState({ isLoading: false });
            })
        } else {
           Alert.alert('Error','Please enter Password')
        }
    } else {
      Alert.alert('Error','Please enter Email')
    }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
  },
  topView: {
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  middleView: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomView: {
    flex: 0.25,
    alignItems: 'center'
  },
  commonTextInput: {
    width: '80%',
    height: 60,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    padding: 20,
    color: 'white'
  },
  emailTextInput: {
    bottom: 20
  },
  reactIcon: {
    resizeMode: 'contain'
  },
  logintText: {
    color: 'white',
    fontSize: 30,
    paddingTop: 10,
    fontFamily: 'Verdana-Bold'
  },
  loginButton: {
    width: '50%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'orange',
    borderRadius: 8,
    backgroundColor: 'black',
    margin: 2
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  }
});