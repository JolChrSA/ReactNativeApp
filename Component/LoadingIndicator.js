import React,{ Component } from 'react'
import {View, ActivityIndicator, StyleSheet} from 'react-native'

export default function Loder(props){
    
    if (props.isLoading) {
        return <View style={styles.container}>
            <ActivityIndicator color='black' size='large' style={{ flex: 1, width: '100%', height: '100%' }} />
        </View>
    }else {
        return<View></View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        zIndex: 1,
        position: 'absolute',
        justifyContent: 'center'
    }

})

// const Loader = props => {

//     if (props.isLoading) {
//         return <View style={{width: '100%',height: '100%', zIndex: '1'}}>
//             <ActivityIndicator color='red' size='large' >
//             </ActivityIndicator>
//         </View>
//     }else {
//         return<View></View>
//     }
// }
// export default Loader;




 