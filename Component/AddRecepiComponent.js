import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Image } from 'react-native'
import { SafeAreaView } from 'react-navigation'

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
            recipeName: '',
            shefName: '',
            radioBtnsData: ['Easy', 'Medium', 'Complex'],
            checked: 0

        }
    }

    onPressRadio(key) {
        console.log(key);

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
                            placeholder='Enter shef name'
                            placeholderTextColor='black'
                            fontFamily='TimesNewRomanPSMT'
                            value={this.state.shefName}
                            onChangeText={(shefName) => this.setState({ shefName })}
                            style={styles.commonTextInput}
                        >
                        </TextInput>
                        <View style={{flexDirection:'row'}} >
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
        // alignContent: 'center',
        alignItems: 'center',
    },
    // middleView: {
    //     flex: 0.4,
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    // bottomView: {
    //     flex: 0.25,
    //     alignItems: 'center'
    // },
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
        margin:5,
        padding:5
    },
    radioComplityTitle: {
        padding:5,
        margin:5,
    },
    radioTitle: {
        margin:3,
    }
});