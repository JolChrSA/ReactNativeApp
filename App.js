import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, TouchableOpacity, Image } from 'react-native';
import LoginComponent from './Component/LoginComponent';
import RecepiListComponent from './Component/RecepiListComponent';
import RecepiDetailComponent from './Component/RecepiDetailComponent';
import AddRecepiComponent from './Component/AddRecepiComponent';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createBottomTabNavigator } from 'react-navigation-tabs';
import SettingComponent from './Component/SettingComponent';
import MapComponent from './Component/MapComponent';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const tabbarNavigator = createBottomTabNavigator({
 
  Recepi: {
    screen: RecepiListComponent, navigationOptions: {
    
      tabBarIcon: ({ tintColor }) => (
        <Image style={{ height: 20, width: 20, tintColor: tintColor }} source={require('./assets/cooking.png')}></Image>
      ),
      title: 'Recipe List',
    }
  },
  Map: {
    screen: MapComponent, navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Image style={{ height: 20, width: 20, tintColor: tintColor }} source={require('./assets/map.png')}></Image>
      ),
      title: 'Map',
    }
  },
  Setting: {
    screen: SettingComponent, navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Image style={{ height: 20, width: 20, tintColor: tintColor }} source={require('./assets/settings.png')}></Image>
      ),
      title: 'Setting',
    }
  },
}, {
  tabBarOptions: {
    activeTintColor: 'black',
  },
  navigationOptions:{
    headerShown: false
  }
})

const detailNavigation = createStackNavigator(
  {
    tabbarNavigator,
    RecepiDetail: { 'screen': RecepiDetailComponent },
    AddRecepi: { 'screen' : AddRecepiComponent }
    // , navigationOptions: { ...TransitionPresets.ModalSlideFromBottomIOS } }
  },
  {
    mode: "card"
  }
);
const navigate = createSwitchNavigator({
  Login: {
    'screen': LoginComponent,
    navigationOptions: { headerShown: false }
  },
  detailNavigation
});


const AppContainer = createAppContainer(navigate);

const initalSate = {
    token: ''
}
const reducer = (state=initalSate,action) => {
    switch (action.type) {
        case 'Token':
          return {token : action.token};
        default:
          return {token : action.token};
    }
}
const store = createStore(reducer)


//export default App;

export default function App() {
  return (
  <Provider store={store}>
    <AppContainer/>
  </Provider>
    );
}
// export default createAppContainer(

  

//   createStackNavigator(
//     {
//       Login: LoginComponent,
//       Recepi: RecepiListComponent,
//       RecepiDetail: RecepiDetailComponent,
//       AddRecepi: AddRecepiComponent
//     }
//   )
// )



