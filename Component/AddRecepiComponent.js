import React, { Component } from 'react'
import { Dimensions, View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, Button } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import TagInput from 'react-native-tags-input';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Loder from './LoadingIndicator'
import {connect} from 'react-redux';

const mainColor = '#3ca897';

 class AddRecepiComponent extends Component {

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

    constructor(props) {
        super(props)
        this.state = {
            recipeName: '',
            preparationTime: '',
            serves: '',
            radioBtnsData: ['Easy', 'Medium', 'Complex'],
            complexity: 'Easy',
            checked: 0,
            tags: {
                tag: '',
                tagsArray: []
            },
            tagsColor: mainColor,
            tagsText: '#fff',
            image: null,
            isLoading: false,
        }
    }

    componentDidMount() {
        this.getImagePermissions();
        console.log("Joliph Add" , this.props.token);
        
    }

    getImagePermissions = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
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

    updateTagState = (state) => {
        this.setState({
            tags: state
        })
    };

    onPressRadio(key) {
        console.log(key);
    }

    checkComplexity = () => {
        switch (this.state.checked) {

            case 0:
                console.log("Easy");
                this.setState({ complexity: 'Easy' })
                break;

            case 1:
                console.log("Medium");
                this.setState({ complexity: 'Medium' })
                break;

            case 2:
                console.log("Complex");
                this.setState({ complexity: 'Complex' })
                break;

            default:
                console.log("Easy dfdfdf");
                break;
        }
    }

    addRecipe = () => {
        this.setState({isLoading:true})
        console.log("started ----");
        const complexcity = this.state.radioBtnsData[this.state.checked]
        // this.checkComplexity()

        this.setState({ isLoading: true })
        const { navigate } = this.props.navigation;
        fetch('http://35.160.197.175:3006/api/v1/recipe/add',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s' // 'Bearer ' + this.props.navigation.getParam('token')
                    'Authorization' : 'Bearer ' + this.props.token
                },
                body: JSON.stringify({
                    'name': this.state.recipeName,
                    'preparationTime': this.state.preparationTime,
                    'serves': this.state.serves,
                    'complexity': complexcity,
                    'metaTags': this.state.tags.tagsArray
                })
            }).then((response) => { return response.json() })
            .then((responseJson) => {
               
                if (responseJson.error != null) {
                    Alert.error('ERROR', responseJson.error)
                }
                else {
                    console.log(responseJson);
                    this.uploadImage(responseJson.id)
                 //   this.props.navigation.goBack()
                }
            }).catch((error) => {
             
                Alert.alert('ERROR', error)
            })
    }

    uploadImage(id) {
        var photo = {
            uri : this.state.image ,
            type : 'image/jpeg',
            name : 'photo.jpg'
        }

        var formData = new FormData();
        formData.append('photo', photo)
        formData.append('recipeId', id)

        fetch('http://35.160.197.175:3006/api/v1/recipe/add-update-recipe-photo',{
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.props.token,//'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s',
                'Content-Type' : 'application/json'
            },
            body: formData
        }).then((responseJson) => {
            this.setState({isLoading:false})
            Alert.alert('Success','Recipe added',[
                {
                    text: 'Okay',
                    style: 'cancel',
                    onPress: () => {
                        this.props.navigation.pop()
                    }
                }
            ])
        }).catch((error) => {
            this.setState({isLoading:false})
            Alert.alert('Upload Image Failed')
        })
    }

    render() {
        return (
         
            <View style={styles.container}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={[styles.topView, styles.shadowView]}>
                        <TouchableOpacity onPress={() => {
                            this.clickedOnImage()
                        }} style={{ backgroundColor: 'white', height: 100, width: 100, margin: 20 }}>
                            {this.state.image ?
                                <Image source={{ uri: this.state.image }} style={{ flex: 1 }} />
                                :
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Image source={require("../assets/add_Image.png")} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} /></View>
                            }
                        </TouchableOpacity>
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
                        <View style={{ flexDirection: 'row', bottom: 20 }} >
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
                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(240, 240, 246, 1)' }}>
                            <TagInput
                                updateState={this.updateTagState}
                                tags={this.state.tags}
                                placeholder="Tags..."
                                label='Press comma & space to add a tag'
                                labelStyle={{ color: 'black' }}
                                containerStyle={{ width: (Dimensions.get('window').width - 40) }}
                                inputContainerStyle={[styles.textInput, { backgroundColor: '#fff' }]}
                                inputStyle={{ color: this.state.tagsText }}
                                onFocus={() => this.setState({ tagsColor: '#fff', tagsText: mainColor })}
                                onBlur={() => this.setState({ tagsColor: mainColor, tagsText: '#fff' })}
                                autoCorrect={false}
                                tagStyle={styles.tag}
                                tagTextStyle={styles.tagText}
                                keysForTag={', '} />
                        </View>
                        <TouchableOpacity style={styles.addRecipeButton} onPress={this.addRecipe}>
                            <Text style={styles.recipeButtonText}>
                                Add Recipe
                             </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
                <Loder isLoading={this.state.isLoading}></Loder>
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
        flex: 1,
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
    },
    textInput: {
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        marginTop: 8,
        borderRadius: 5,
        padding: 3,
    },
    tag: {
        backgroundColor: '#fff'
    },
    tagText: {
        color: mainColor
    },
});

const mapStateToProps = (state) => {
    return{ token: state.token}
}
export default connect (mapStateToProps)(AddRecepiComponent)