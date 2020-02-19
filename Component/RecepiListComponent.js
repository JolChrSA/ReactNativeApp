import React, { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Alert, FlatList, RefreshControl, ActivityIndicator, ImageBackground, Image, Button } from 'react-native'
import Loder from './LoadingIndicator'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

export default class RecepiListComponent extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Recipe List',
            headerTitleAlign: 'center',
            headerBackImage: null,
            headerBackTitleVisible: false,
            headerStyle: {
                height: 100,
                backgroundColor: 'rgba(240, 240, 246, 1)',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
                fontFamily: 'TimesNewRomanPS-BoldMT',
                fontSize: 30
            },
            headerRight: () => (
                <Button
                    style={styles.addButtonStyleNavigation}
                    onPress={() => navigation.navigate('AddRecepi')}
                    title="Add"
                //color="black"
                />
            )
        }
    }

    constructor() {
        super()
        this.state = {
            isLoading: true,
            recipeInfoList: [],
            isFetching: false,
        }
    }

    componentDidMount() {
        console.log(this.props.navigation.state['params']['token'])
        return this.getRecepeList()
    }

    // componentDidUpdate(){
    //     console.log('componentDidUpdate getting called')
    //     return this.getRecepeList()
    // }

    // componentWillMount(){
    //     return this.getRecepeList()
    // }

    addRecepie = () => {
        console.log("ddfdfd");

        this.props.navigation.navigate('RecepiDetail')
    }

    onRefresh = () => {
        // this.setState({ isFetching: true })
        // this.getRecepeList()
        this.setState({ isFetching: true }, function () { this.getRecepeList() });
    }

    goToRecepieDetail(item) {
        console.log('Selected Item :', item);
        this.props.navigation.navigate('RecepiDetail', {
            recepiInfo: JSON.stringify(item)
        })
    }

    getRecepeList = () => {
        //  this.setState({ isLoading: true })
        const { navigate } = this.props.navigation;
        fetch('http://35.160.197.175:3006/api/v1/recipe/feeds',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.props.navigation.getParam('token') //'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s'/
                }
            }).then((response) => { return response.json() })
            .then((responseJson) => {
                this.setState({ isLoading: false, isFetching: false })
                if (responseJson.error != null) {
                    Alert.error('ERROR', responseJson.error)
                }
                else {
                    console.log(responseJson);
                    this.setState({ recipeInfoList: responseJson })
                }
            }).catch((error) => {
                this.setState({ isLoading: false })
                Alert.alert('ERROR', error)
            })
    }

    addCardView = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback onPress={() => this.goToRecepieDetail(item)}>
                <View style={styles.recipeView}>
                    <View style={styles.recipeImageView}>
                        {/* <Image source={props.postImage ? {uri: props.postImage} : backgroundImage} style={styles.postImage} /> */}
                        <Image source={this.getImageUrl(item.photo)} style={styles.recipeCardImage} />
                    </View>
                    <View style={styles.textContentView}>
                        <Text style={styles.recepieName}>{item.name} </Text>
                        <Text style={styles.recepieMadebyName}>Made by 👨🏻‍🍳 {item.firstName + ' ' + item.lastName}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    getImageUrl(url) {
        console.log(url)

        if (url == null) {
            return require('../assets/noData.jpg')
        } else {
            return { uri: url }
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: 'rgba(240, 240, 246, 1)', flex: 1 }}>
                <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
                    <View style={{ flexDirection: "row", backgroundColor: "white", height: 64, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(231,231,232,1)' }}>
                        <Text style={styles.navigationTtile}>Recipe List</Text>
                            <Button style={styles.navigationButton}
                                onPress={() => this.props.navigation.navigate('AddRecepi')}
                                title="Add"
                            />
                    </View>
                    {this.state.isLoading ? <ActivityIndicator color='black' size='large' style={{ backgroundColor: 'rgba(240, 240, 246, 1)', width: '100%', height: '100%' }} /> :
                        <FlatList
                            data={this.state.recipeInfoList}
                            renderItem={this.addCardView}
                            keyExtractor={(item, index) => index}
                            key={(item, index) => index}
                            refreshControl={
                                <RefreshControl
                                    onRefresh={() => this.onRefresh()}
                                    refreshing={this.state.isFetching}
                                />
                            }
                        />}
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(240, 240, 246, 1)'
    },
    recepieName: {
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'TimesNewRomanPS-BoldMT',
        fontSize: 25,
        padding: 8
    },
    recepieMadebyName: {
        color: 'black',
        fontWeight: 'normal',
        fontSize: 16,
        fontFamily: 'TimesNewRomanPSMT',
        padding: 8
    },
    receipeNavigtionTitle: {
        fontFamily: 'TimesNewRomanPS-BoldMT',
        color: 'black',
        fontSize: 30,
        padding: 8
    },
    receipeNavView: {
        backgroundColor: 'rgba(240, 240, 246, 1)',
        height: 60,
    },
    recipeView: {
        flex: 1,
        borderRadius: 5,
        margin: 8,
        height: 140,
        width: '96%',
        backgroundColor: 'white',// 'rgba(52, 52, 52, 0.8)'
        padding: 10,
        paddingLeft: 12,
        flexDirection: 'row'
    },
    recipeCardImage: {
        width: '75%',
        height: '72%',
        resizeMode: 'cover',
        justifyContent: 'center',
        borderRadius: 10
    },
    recipeImageView: {
        height: 120,
        width: 120,
        backgroundColor: 'rgba(240, 240, 246, 1)',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContentView: {
        flexDirection: 'column'
    },
    addButtonStyleNavigation: {
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'TimesNewRomanPS-BoldMT',
        fontSize: 25,
        padding: 8
    },
    navigationTtile: {
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'TimesNewRomanPS-BoldMT',
        fontSize: 30,
        textAlign: 'center',
        paddingLeft: 50,
        flex: 1,
    },
    navigationButton: {
        color: 'blue',
        fontFamily: 'TimesNewRomanPSMT',
        fontSize: 18,
        // backgroundColor: 'green'
    }
});