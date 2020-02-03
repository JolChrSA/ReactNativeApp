import React, { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Alert, FlatList,RefreshControl,ImageBackground } from 'react-native'
import Loder from './LoadingIndicator'

export default class RecepiListComponent extends Component {

    constructor() {
        super()
        this.state = {
            isLoading: true,
            recipeInfoList: [],
            isFetching: false,
        }
    }

    componentDidMount() {
        return this.getRecepeList()
    }

    onRefresh() {
        this.setState({ isFetching: true }, function() { this.getRecepeList() });
     }

    getRecepeList = () => {
        console.log('Joliph');
        
        fetch('http://35.160.197.175:3006/api/v1/recipe/cooking-list',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s'
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

    addCardView =  ({ item })  => {
        return(
            <View style={[styles.recipeView]}> 
                <ImageBackground source={this.getImageUrl(item.photo)} style={styles.recipeCardImage} imageStyle = {{borderRadius: 8}}>
                     <Text style={styles.recepieMadebyName}> {item.firstName + ' ' + item.lastName}</Text>
                     <Text style={styles.recepieName}>{item.name} </Text>
                </ImageBackground>
            </View>
        )
    }

    getImageUrl(url) {
        console.log(url)

        if (url == null) {
            return require('../assets/noData.jpg')
        } else {
            return {uri: url}
        }
    }

    render() {
        return (
            
            <View style={styles.container}>
                <Loder isLoading={this.state.isLoading} />
               <SafeAreaView>
                  <FlatList
                     data={this.state.recipeInfoList}
                     renderItem={this.addCardView}
                     keyExtractor={item => item.recipeId}
                     onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isFetching}
                  />
              </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: "center",
        backgroundColor: '#ebeced',
    },
    recipeView: {
        flex: 1,
        backgroundColor: '#677AC3',
        borderRadius: 5,
        margin:8,
        height: 180,
        width:390,
       // alignContent:'center',
    },
    recipeCardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        alignContent:'flex-end',
        justifyContent:'flex-end'
    },
    recepieName: {
        color: 'white',
        fontWeight: 'bold',
        fontStyle:'italic',
        fontSize: 25,
        textShadowColor: 'grey',
        textShadowRadius: 5,
        padding: 8
    },
    recepieMadebyName: {
        color: 'white',
        fontWeight: 'normal',
        fontSize: 16,
        padding: 8
    }
});
