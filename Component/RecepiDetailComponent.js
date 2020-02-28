import React, { Component } from 'react'
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

class RecepiDetailComponent extends Component {

    // static navigationOptions = {
    //     title: 'Recepi Detail',
    // }
    static navigationOptions = {
        title: '',
        headers: null,
        headerShown: false
    }

    componentDidMount() {
        console.log('component did mount getting called');

        //        console.log(this.props.navigation.state['params']['token'])
        //    console.log(JSON.parse(this.props.navigation.state['params']['recepiInfo']).name);      

    }

    render() {
        let data = JSON.parse(this.props.navigation.state['params']['recepiInfo'])
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(231,241,249,1)' }}>
                <View style={styles.container}>
                    <View style={{ backgroundColor: 'rgba(231,241,249,1)', height: 45 }}>
                        {/* <TouchableOpacity
                            onPress={this.clicledOnClose}
                        >
                            <Image source={require("../assets/close.png")} style={styles.closeBtnView} />
                        </TouchableOpacity> */}

                    </View>
                    <View style={styles.topView}>
                        <Image
                            source={this.getImageUrl(data.photo)}
                            style={styles.imageView}>
                        </Image>
                    </View>
                    <View style={styles.shadowView}>
                        <View style={styles.starRatingView}>
                            <Text style={styles.recepiName}>{data.name}</Text>
                            <Image
                                source={require('../assets/5star.png')}
                                style={{ top: 10, resizeMode: 'cover', height: 25, width: 100 }}
                            />
                        </View>
                        <Text style={styles.recepiDescrption}>Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients baked at a high temperature, traditionally in a wood-fired oven. A small pizza is sometimes called a pizzetta</Text>
                        <Text style={styles.recepieMadebyName}>Made by 👨🏻‍🍳 {data.firstName + ' ' + data.lastName} </Text>
                        <View style={styles.seperatorView}></View>
                        <View style={styles.detailView}>
                            <View style={styles.timeView}>
                                <Text style={styles.timeTitle}>Time</Text>
                                <Text style={[styles.recepiPreparationTime, styles.commonDetailPropertyView]}>{data.preparationTime}</Text>
                            </View>
                                <View style={[styles.seperatorColumView, styles.seperatorColumSpaceView]}></View>
                            <View style={styles.complexityView}>
                                <Text style={styles.complexityTitle}>Complexity</Text>
                                <Text style={[styles.recepiComplexity, styles.commonDetailPropertyView]}>{data.complexity}</Text>
                            </View>
                                <View style={styles.seperatorColumView}></View>
                            <View style={styles.priceView}>
                                <Text style={styles.priceTitle}>Price</Text>
                                <Text style={[styles.recepiPrice, styles.commonDetailPropertyView]}>30 $</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.selectMenu}
                             onPress={this.clicledOnClose}
                        >
                            <Text style={styles.selectMenuTitle}>Close Recipe</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
            </SafeAreaView>
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

    clicledOnClose = () => {

        this.props.navigation.pop()
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    topView: {
        flex: 0.45,
        backgroundColor: 'rgba(231,241,249,1)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
        paddingTop: 20
    },
    closeBtnView: {

        height: 35,
        width: 35,
        alignSelf: 'flex-end',
        right: 16,
        top: 10
    },
    imageView: {
        width: Dimensions.get('window').width * 0.85,
        height: '100%',
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        resizeMode: 'cover',
    },
    shadowView: {
        //flex: 0.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        position: 'absolute',
        width: '85%',
        height: '47%',
        backgroundColor: 'white',
        bottom: 90,
        zIndex: 1,
        borderRadius: 10,
        alignSelf: 'center',
    },
    recepiName: {
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'TimesNewRomanPS-BoldMT',
        fontSize: 25,
        padding: 10,
        flex: 0.95,
        alignSelf: 'flex-start',
        // paddingTop: 30,

    },
    recepieMadebyName: {
        color: 'black',
        fontWeight: 'normal',
        fontSize: 16,
        fontFamily: 'AvenirNext-Heavy',
        paddingLeft: 16,

    },
    recepiPreparationTime: {

        textAlign: 'left',

    },
    recepiComplexity: {

        textAlign: 'center',
        // padding: 16,

    },
    recepiPrice: {

        textAlign: 'right',
        marginRight: 10
        // padding: 16,

    },
    commonDetailPropertyView: {
        color: 'rgba(0,0,0,1)',
        fontWeight: 'normal',
        fontSize: 22,
        fontFamily: 'Optima-Bold',
        // fontFamily: 'AcademyEngravedLetPlain',
        top: 8,
    },
    starRatingView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 10,
    },
    recepiDescrption: {
        color: 'grey',
        fontWeight: 'normal',
        fontSize: 15,
        fontFamily: 'TimesNewRomanPSMT',
        padding: 10,
        paddingLeft: 16,
        lineHeight: 0
    },
    detailView: {
        flexDirection: "row",
        top: 45,
        height: 60

    },
    timeView: {
        height: '100%',
        width: '33.33%',
        flexDirection: 'column',
        alignSelf: 'flex-start',
        // backgroundColor: 'red',
        paddingLeft: 16
    },
    timeTitle: {

        color: 'rgba(119,119,119,1)',
        fontSize: 14,
        fontFamily: 'Times New Roman',
        textAlign: 'left',
        marginLeft: 8
    },
    complexityView: {
        height: '100%',
        width: '33.33%',
        flexDirection: 'column',
        alignSelf: 'center',
        // backgroundColor: 'green'
    },
    complexityTitle: {

        color: 'rgba(119,119,119,1)',
        fontSize: 14,
        fontFamily: 'Times New Roman',
        textAlign: 'center'
    },
    priceView: {
        height: '100%',
        width: '33.33%',
        flexDirection: 'column',
        alignSelf: 'flex-end',
        // backgroundColor: 'yellow'
    },
    priceTitle: {
        color: 'rgba(119,119,119,1)',
        fontSize: 14,
        fontFamily: 'Times New Roman',
        textAlign: 'right',
        paddingRight: 16
    },
    seperatorView: {
        paddingHorizontal: 16,
        paddingLeft: 16,
        top: 30,
        height: 0.9,
        left: 16,
        backgroundColor: 'rgba(237,238,239,1)',
        width: '90%'
    },
    seperatorColumView: {
        height: '90%',
        left: 16,
        backgroundColor: 'rgba(237,238,239,1)',
        width: 0.98
    },   
    seperatorColumSpaceView: {
        // right: -50,
        left: 5
    },
    selectMenu: {
        width: '50%',
        height: 50,
        borderRadius: 20,
        backgroundColor: 'rgba(87,185,149,1)',
        position: 'absolute',
        zIndex: 2,
        justifyContent: 'center',
        alignItems: "center",
        bottom: -20,
        alignSelf: 'center'
    },
    selectMenuTitle: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Noteworthy-Bold',
        textAlign: 'center',

    }
})

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(RecepiDetailComponent)