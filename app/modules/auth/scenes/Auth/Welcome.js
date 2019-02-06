import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';

import {Button, SocialIcon, Divider} from 'react-native-elements'
import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux';

import {Facebook} from 'expo';

import {actions as auth, constants as c} from "../../index"

const {signInWithFacebook} = auth;

import styles from "./styles"


class Welcome extends React.Component {
    // prompts the user to log into Facebook and grant app permission to access data
   onSignInWithFacebook =  async () => {
        const options = {permissions: ['public_profile', 'email'],}
        const {type, token} = await Facebook.logInWithReadPermissionsAsync(c.FACEBOOK_APP_ID, options);

        // if login is successful, call the signInWithFacebook function in auth/actions.js
        if (type === 'success') {
            this.props.signInWithFacebook(token)

                 // if function returns successfully, navigate to CompleteProfile or Main
                .then(({exists, user}) => {
                    if (exists) Actions.Main()
                    else Actions.CompleteProfile({user})
                })

                 // if function returns an error, display error message
                .catch((error) => alert(error.message))
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Image style={styles.image} source={require('../../../../assets/reachLogo.png')}/>
                    <Text style={styles.title}></Text>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={[styles.buttonContainer]}>
                        <Button
                            raised
                            borderRadius={4}
                            title={'SIGN UP AS A INFLUENCER'}
                            containerViewStyle={[styles.containerView]}
                            buttonStyle={[styles.button1]}
                            textStyle={styles.buttonText}
                            onPress={Actions.Register}/>

                        <View style={styles.orContainer}>
                            <Divider style={styles.divider}/>
                            <Text style={styles.orText}>
                                OR
                            </Text>
                        </View>

                        <Button
                            raised
                            borderRadius={4}
                            title={'SIGN UP AS A BRAND'}
                            containerViewStyle={[styles.containerView]}
                            buttonStyle={[styles.button]}
                            textStyle={styles.buttonText}
                            onPress={Actions.Register}/>
                    </View>
                    <View style={styles.bottom}>
                        <Text style={styles.bottomText}>
                            Already have an account?
                        </Text>

                        <TouchableOpacity onPress={Actions.Login}>
                            <Text style={styles.signInText}>
                                SIGN IN
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }
}


export default connect(null, {signInWithFacebook})(Welcome);
