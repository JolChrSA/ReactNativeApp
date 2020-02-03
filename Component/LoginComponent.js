import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Alert, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native'

export default class LoginComponent extends Component {

  constructor() {
    super()
    this.state = { email: '', password: '' }
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require("../assets/foodBg.jpeg")} style={{ width: '100%', height: '100%', resizeMode: 'cover' }}>
          <View style={styles.topView}>
            {/* <Image
              style={[{ width: 180, height: 180 }, styles.pumaLoginIcon]}
              source={require('../assets/reactLogo.png')}
            ></Image> */}
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
              secureTextEntry='true'
              placeholderTextColor='white'
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

  onLogin = () => {
    this.setState({ showProcess: true })
    fetch('http://35.160.197.175:3006/api/v1/user/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'email': this.state.email,
          'password': this.state.password
        })
      }).then((response) => {
        if (response.status == 200) {
          return response.json()
        } else {

        }
      }).then((responseJSON) => {
        this.setState({ showProcess: false })
        console.log("response: ", responseJSON);
        if (this.state.email.length == 0) {
          Alert.alert('Email', 'Email is require', [
            {
              text: 'Okay',
              style: 'cancel'
            }
          ])
        } else if (this.state.password.length == 0) {
          Alert.alert('Password', 'Password is require', [
            {
              text: 'Okay',
              style: 'cancel'
            }
          ])
        } else {
          try {
            var email = responseJSON['email'];
            if (email) {
              console.log("success: ", responseJSON);
            }
            var message = email ? "You have successfully logged in" : "Your user name or password are wrong";
            var title = email ? "Success" : "Failure";
            Alert.alert(title, message, [
              {
                text: 'Okay',
                style: 'cancel'
              }
            ])
          }
          catch (err) {
            console.log("error")
            var message = "Your user name or password are wrong";
            var title = "Failure";
            Alert.alert(title, message, [
              {
                text: 'Okay',
                style: 'cancel'
              }
            ])
          }
        }
      })
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
    alignItems: 'center'
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