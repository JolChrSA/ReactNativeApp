import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

export default class AddRecepiComponent extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Add Recipe',
            headerTitleAlign: 'center',
            headerStyle: {
                height: 100,
                backgroundColor: 'rgba(240, 240, 246, 1)',
            },
            headerTitleStyle: {
                fontFamily: 'TimesNewRomanPS-BoldMT',
                fontSize: 30
            },
        }
    }

    constructor() {
        super()
        this.state = {
            recipeName: 'Biryani',
            preparationTime: 'half days',
            serves: 4,
            radioBtnsData: ['Easy', 'Medium', 'Complex'],
            complexity: 'Easy',
            checked: 0,
            isLoading: false
        }
    }

    onPressRadio(key) {
        console.log(key);

    }

    checkComplexity = () => {
        switch(this.state.checked) {

            case 0:
              console.log("Easy");
              this.setState({complexity : 'Easy'})
              break;
            
            case 1:
                console.log("Medium");
                this.setState({complexity : 'Medium'})
              break;
      
            case 2:
                console.log("Complex");
                this.setState({complexity : 'Complex'})
              break;
      
            default:
                console.log("Easy");
                this.setState({complexity : 'Easy'})
            }
    }

    addRecipe = () => {
        console.log("started ----");

        this.checkComplexity()
       
       this.setState({ isLoading: true })
        const { navigate } = this.props.navigation;
        fetch('http://35.160.197.175:3006/api/v1/recipe/add',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s' // 'Bearer ' + this.props.navigation.getParam('token')
                },
                body: JSON.stringify({
                    'name': this.state.recipeName,
                    'preparationTime': this.state.preparationTime,
                    'serves': this.state.serves,
                    'complexity': this.state.complexity
                  })
            }).then((response) => { return response.json() })
            .then((responseJson) => {
            this.setState({ isLoading: false })
                if (responseJson.error != null) {
                    Alert.error('ERROR', responseJson.error)
                }
                else {
                    console.log(responseJson);
                    this.props.navigation.goBack()
                }
            }).catch((error) => {
               this.setState({ isLoading: false })
                Alert.alert('ERROR', error)
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={[styles.topView, styles.shadowView]}>
                        <TextInput
                            placeholder='Enter Recipe name'
                            placeholderTextColor='black'
                            fontFamily='TimesNewRomanPSMT'
                            value={this.state.recipeName}
                            onChangeText={(recipeName) => this.setState({ recipeName })}
                            style={[styles.commonTextInput, styles.recepiTextInput]}
                        >
                        </TextInput>
                        <TextInput
                            placeholder='Enter Preparation time'
                            placeholderTextColor='black'
                            fontFamily='TimesNewRomanPSMT'
                            value={this.state.preparationTime}
                            onChangeText={(preparationTime) => this.setState({ preparationTime })}
                            style={styles.commonTextInput}
                        >
                        </TextInput>
                        <TextInput
                            placeholder='Enter serves'
                            placeholderTextColor='black'
                            fontFamily='TimesNewRomanPSMT'
                            value={`${this.state.serves}`}
                            onChangeText={(serves) => this.setState({ serves })}
                            style={[styles.commonTextInput, styles.recepiTextInput]}
                        >
                        </TextInput>
                        <View style={{ flexDirection: 'row' }} >
                            <Text style={styles.radioComplityTitle}>Complexity: </Text>
                            {this.state.radioBtnsData.map((data, key) => {
                                return (
                                    <View key={key}>
                                        {this.state.checked == key ?
                                            <TouchableOpacity style={styles.radioBtn}>
                                                <Image style={styles.radioImg} source={require("../assets/selectedRadioBtn.png")} />
                                                <Text style={styles.radioTitle}>{data}</Text>

                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity onPress={() => { this.setState({ checked: key }) }} style={styles.radioBtn}>
                                                <Image style={styles.radioImg} source={require("../assets/unselectedRadiobtn.png")} />
                                                <Text style={styles.radioTitle}>{data}</Text>
                                            </TouchableOpacity>
                                        }
                                    </View>
                                )

                            })}
                        </View>
                        <TouchableOpacity style={styles.addRecipeButton} onPress={this.addRecipe}>
                            <Text style={styles.recipeButtonText}>
                                Add Recipe
                             </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'rgba(240, 240, 246, 1 )'
    },
    topView: {
        flex: 0.7,
        margin: 10,
        borderRadius: 8,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    shadowView: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    commonTextInput: {

        width: '80%',
        height: 60,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 20,

    },
    recepiTextInput: {
        marginTop: 20,
        marginBottom: 20
    },
    radioImg: {
        height: 20,
        width: 20,
    },
    radioBtn: {
        flexDirection: 'row',
        margin: 5,
        padding: 5
    },
    radioComplityTitle: {
        padding: 5,
        margin: 5,
    },
    radioTitle: {
        margin: 3,
    },
    addRecipeButton: {
        width: '50%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'orange',
        borderRadius: 8,
        backgroundColor: 'black',
        margin: 2,
        top: 70
      },
      recipeButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
      }
});