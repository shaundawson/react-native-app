import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';

import styles from './styles'

export default class extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Image style={styles.image} source={{uri: "../images/LogoPlaceHolder.jpg"}}/>
                    <Text style={styles.title}></Text>
                </View>
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            </View>
        );
    }
}
