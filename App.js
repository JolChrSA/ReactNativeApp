import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, TouchableOpacity, Image } from 'react-native';
import LoginComponent from './Component/LoginComponent';
import RecepiListComponent from './Component/RecepiListComponent';
import RecepiDetailComponent from './Component/RecepiDetailComponent';
import AddRecepiComponent from './Component/AddRecepiComponent';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const detailNavigation = createStackNavigator(
  {
    Recepi: { 'screen': RecepiListComponent },
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


const App = createAppContainer(navigate);

export default App;

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

// export default function App() {
//   return (
//     <RecepiDetailComponent/>
//     );
// }


