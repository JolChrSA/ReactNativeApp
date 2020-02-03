import React, { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Alert, FlatList, RefreshControl, ActivityIndicator, ImageBackground ,Image} from 'react-native'
import Loder from './LoadingIndicator'

export default class RecepiListComponent extends Component {

    constructor() {
        super()
        this.state = {
            isLoading: false,
            recipeInfoList: [],
            isFetching: false,
        }
    }

    componentDidMount() {
        return this.getRecepeList()
    }

    onRefresh() {
        this.setState({ isFetching: true }, function () { this.getRecepeList() });
    }

    getRecepeList = () => {
        this.setState({ isLoading: true })
        fetch('http://35.160.197.175:3006/api/v1/recipe/cooking-list',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.props.token
                }
            }).then((response) => { return response.json() })
            .then((responseJson) => {
                this.setState({ isLoading: false })
                if (responseJson.error != null) {
                    Alert.error('ERROR', responseJson.error)
                }
                else {
                    console.log(responseJson);
                    this.setState({ recipeInfoList: responseJson, isFetching: false })
                }
            }).catch((error) => {
                this.setState({ isLoading: false })
                Alert.alert('ERROR', error)
            })
    }

    addCardView = ({ item, index }) => {
        return (
            <View style={styles.recipeView}>
                <View style={styles.recipeImageView}>
                {/* <Image source={props.postImage ? {uri: props.postImage} : backgroundImage} style={styles.postImage} /> */}
                <Image source= {this.getImageUrl(item.photo)} style={styles.recipeCardImage}/>
                </View>
                <View style={styles.textContentView}>
                 <Text style={styles.recepieName}>{item.name} </Text>
                <Text style={styles.recepieMadebyName}>Made by 👨🏻‍🍳 {item.firstName + ' ' + item.lastName}</Text>
                </View>
            </View>
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
            <View style={{ backgroundColor: 'rgba(240, 240, 246, 1)' }}>
                <SafeAreaView>
                    <View style={styles.receipeNavView}>
                        <Text style={styles.receipeNavigtionTitle}> Recipe List</Text>
                    </View>
                    {this.state.isLoading ? <ActivityIndicator color='black' size='large' style={{ backgroundColor: 'rgba(240, 240, 246, 1)', width: '100%', height: '100%' }} /> :
                        <FlatList
                            data={this.state.recipeInfoList}
                            renderItem={this.addCardView}
                            onRefresh={() => this.onRefresh()}
                            refreshing={this.state.isFetching}
                            keyExtractor={(item, index) => index}
                            key={(item, index) => index}
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
        // textShadowColor: 'grey',
        // textShadowRadius: 5,
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
      // justifyContent: 'center',
        padding: 10,
        paddingLeft: 12,
        flexDirection:'row'
    },
    recipeCardImage: {
        width: '75%',
        height: '72%',
         resizeMode: 'cover',
        justifyContent: 'center',
        borderRadius:10
    },
    recipeImageView: {
        height: 120,
        width: 120,
        backgroundColor: 'rgba(240, 240, 246, 1)',
        borderRadius: 10,
        justifyContent: 'center',
        // alignContent:'center',
        alignItems: 'center'
    },
    textContentView: {
        flexDirection:'column'
    }
});