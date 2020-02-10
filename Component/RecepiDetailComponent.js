import React, { Component } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { SafeAreaView } from 'react-navigation';

export default class RecepiDetailComponent extends Component {

    static navigationOptions = {
        title: 'Recepi Detail',
      }

    componentDidMount() {
        console.log('component did mount getting called');
//        console.log(this.props.navigation.state['params']['token'])
    //    console.log(JSON.parse(this.props.navigation.state['params']['recepiInfo']).name);      
          
    }

    render() {
        let data = JSON.parse(this.props.navigation.state['params']['recepiInfo'])
        return (
            <View style={styles.container}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={[styles.topView, styles.shadowView]}>
                        <Image 
                        source={this.getImageUrl(data.photo)}
                        style={styles.imageView}>    
                        </Image>
                           <Text style={styles.recepiName}>{data.name}</Text>
                            <Text style={styles.recepieMadebyName}>Made by 👨🏻‍🍳 {data.firstName + ' ' + data.lastName} </Text>
                            <Text style={styles.recepiPreparationTime}>Preparation Time :- {data.preparationTime}</Text>
                            <Text style={styles.recepiPreparationTime}>Complexity:- {data.complexity}</Text>
                    </View>
                </SafeAreaView>
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(240, 240, 246, 1)'
    },
    topView: {
        flex: 0.5,
        margin: 10,
        borderRadius: 8,
        backgroundColor: 'white'
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
    imageView: {
        resizeMode: 'stretch',
        width: '100%',
        height: '50%',
        borderRadius: 8,
    },
    recepiName: {
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'TimesNewRomanPS-BoldMT',
        fontSize: 25,
        padding: 10,
        paddingTop: 30,
    },
    recepieMadebyName: {
        color: 'grey',
        fontWeight: 'normal',
        fontSize: 16,
        fontFamily: 'TimesNewRomanPSMT',
        paddingLeft: 10,
        
    },
    recepiPreparationTime: {
        color: 'grey',
        fontWeight: 'normal',
        fontSize: 15,
        fontFamily: 'TimesNewRomanPSMT',
        padding: 10
    },
})