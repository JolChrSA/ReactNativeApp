import React, { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Alert, FlatList, RefreshControl, ActivityIndicator, ImageBackground, Image, Button } from 'react-native'
import Loder from './LoadingIndicator'
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'


class RecepiListComponent extends Component {

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
                />
            )
        }
    }

    constructor() {
        super()
        this.state = {
            //token: null,
            isLoading: true,
            recipeInfoList: [],
            isFetching: false,
        }
    }

    componentDidMount() {
        // console.log('token',this.props.navigation.state['params']['token'])
        this.getRecepeList(this.props.token)
        this.setState({ token: this.props.token })

    }

    addRecepie = () => {
        console.log("ddfdfd");

        this.props.navigation.navigate('RecepiDetail')
    }

    onRefresh = () => {

        this.setState({ isFetching: true }, function () { this.getRecepeList(this.props.token) });
    }

    goToRecepieDetail(item) {
        console.log('Selected Item :', item);
        this.props.navigation.navigate('RecepiDetail', {
            recepiInfo: JSON.stringify(item)
        })
    }

    getRecepeList(token) {
        //  this.setState({ isLoading: true })
        const { navigate } = this.props.navigation;
        fetch('http://35.160.197.175:3006/api/v1/recipe/feeds',
            {
                method: 'GET',
                headers: {
                    // 'Authorization':  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s'// 'Bearer ' + this.props.navigation.getParam('token')
                    'Authorization': 'Bearer ' + token
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
                        <Image source={this.getImageUrl(item.photo)} style={styles.recipeCardImage} />
                    </View>
                    <View style={styles.textContentView}>
                        <Text numberOfLines={1} style={styles.recepieName}>{item.name} </Text>
                        <Text numberOfLines={3} style={styles.recepiDescrption}>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out.</Text>
                        <Text numberOfLines={1} style={styles.recepieMadebyName}>Made by 👨🏻‍🍳 {item.firstName + ' ' + item.lastName}</Text>
                    </View>
                        <Image source={require("../assets/rightArrow.png")} style={styles.arrowImageView} />
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

    renderSeparator = () => {
        <View style={styles.seperatorView}></View>
    }

    render() {
        return (
            <View style={{ backgroundColor: 'rgba(240, 240, 246, 1)', flex: 1 }}>
                <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
                    <View style={{ flexDirection: "row", backgroundColor: "white", height: 64, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(231,231,232,1)' }}>
                        <Text style={styles.navigationTtile}>Recipe List</Text>
                        <TouchableOpacity style={styles.navigationButton}
                            onPress={() => this.props.navigation.navigate('AddRecepi')}>
                           <Text style={{color:'black', fontSize: 40, right : 0}}>+</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.isLoading ? <ActivityIndicator color='black' size='large' style={{ backgroundColor: 'rgba(240, 240, 246, 1)', width: '100%', height: '100%' }} /> :
                        <FlatList
                            data={this.state.recipeInfoList}
                            renderItem={this.addCardView}
                            keyExtractor={(item, index) => index}
                            ItemSeparatorComponent={() => <View style={styles.seperatorView} />}
                            showsVerticalScrollIndicator={false}
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
        fontSize: 20,
        paddingLeft: 14
    },
    recepieMadebyName: {
        color: 'black',
        fontWeight: 'normal',
        fontSize: 16,
        fontFamily: 'TimesNewRomanPSMT',
        paddingTop: 8,
        paddingLeft: 14
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
        width: '93%',
        height: '93%',
        resizeMode: 'cover',
        justifyContent: 'center',
        borderRadius: 5
    },
    recipeImageView: {
        height: '100%',
        width: '32%',
        backgroundColor: 'rgba(240, 240, 246, 1)',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContentView: {
        flexDirection: 'column',
        width: '60%',
        // backgroundColor: 'pink'
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

        width: 45
        // backgroundColor: 'green'
    },
    seperatorView: {
        flex: 1, 
        height: 0.9,
        left: 16,
        backgroundColor:  'rgba(237,238,239,1)',
        width: '90%'
    },
    arrowImageView: {
        flex: 1,
        flexDirection: 'row',
        zIndex: 1,
        tintColor: 'gray',
        height: 35,
        width: 35,
        resizeMode: 'center',
        alignSelf: 'center',
        // backgroundColor: 'red',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    recepiDescrption: {
        color: 'grey',
        fontWeight: 'normal',
        fontSize: 15,
        fontFamily: 'TimesNewRomanPSMT',
        paddingTop: 8,
        paddingLeft: 14,
        
    },
});

const mapStateToProps = (state) => {
    return { token: state.token }
}
export default connect(mapStateToProps)(RecepiListComponent)
