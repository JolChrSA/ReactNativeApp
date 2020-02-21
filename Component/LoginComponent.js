import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Alert, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native'
import RecepiListComponent from './RecepiListComponent'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';


 class LoginComponent extends Component {

  static navigationOptions = {
    title: '',
    headers: null,
    headerShown: false
  }

  constructor() {
    super()
    this.state = {
      email: 'jm1@example.com',
      password: 'jay@123',
      token: null,
      isLoading: false
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
            this.props.token(responseJson.token)
         //  this.setState({ token: responseJson.token })
            this.props.navigation.navigate('Recepi')
          } else {
            Alert.alert('Error', responseJson.error)
          }
        }).catch((error) => {
          this.setState({ isLoading: false });
        })
      } else {
        Alert.alert('Error', 'Please enter Password')
      }
    } else {
      Alert.alert('Error', 'Please enter Email')
    }
  }

  render() {
  
    return (
      <View style={styles.container}>
        <ImageBackground source={require("../assets/newBg.jpeg")} style={{ width: '100%', height: '100%', resizeMode: 'cover' }}>
          <View style={styles.topView}>
            <Text style={styles.logintText}>LOGIN </Text>
          </View>
          <View style={styles.middleView}>
            <TextInput
              placeholder='Email'
              keyboardType='email-address'
              placeholderTextColor='black'
              color='black'
              value={this.state.email}
              onChangeText={(email) => this.setState({ email })}
              style={[styles.commonTextInput, styles.emailTextInput]}
            >
            </TextInput>
            <TextInput
              placeholder='Password'
              secureTextEntry={true}
              placeholderTextColor='black'
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
    // }
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
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 20,
  },
  emailTextInput: {
    bottom: 20
  },
  reactIcon: {
    resizeMode: 'contain'
  },
  logintText: {
    color: 'black',
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

function mapDispatchToProps(dispatch) {
    return {
        token: (value) => dispatch({
            type: 'Token',
            token: value
        })
    }
}

const mapStatetoProps = (state) =>{
    return  {
        token : state.token
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(LoginComponent)