import React from 'react';
import {
  View,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  Alert}
  from 'react-native';

import {
 Container,
 Header,
 Content,
 Card,
 CardItem,
 Thumbnail,
 Text,
 Left,
 Body,
 Footer,
 FooterTab,
 Button,
 Icon}
 from 'native-base';

import Welcome from '../../../auth/scenes/Auth/Welcome';



const { getProjects } = home;

import {actions as home} from "../../index"
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Project from "../../components/Project"

import styles from "./styles"

import {actions as auth, theme} from "../../../auth/index"

const {signOut} = auth;

const {color} = theme;

class Home extends React.Component {
    constructor() {
        super();
        this.state = {}

        this.renderItem = this.renderItem.bind(this);
    }

   onSignOut = () => {
        this.props.signOut()
            .then(() => Actions.reset("Auth"))
            .catch((error) => {
                Alert.alert('Oops!', error.message);
            })
    }

    componentDidMount() {
        this.props.getProjects((error) => alert(error.message))
    }

    renderItem({item, index}) {
        return <Project index={index}/>
    }

    render() {
        if (this.props.isLoading){
            return(
                <View style={styles.activityIndicator}>
                    <ActivityIndicator animating={true}/>
                </View>
            )
        }else{
            return (
                <View>
                     <Button block light
                      onPress={this.onSignOut}>
                      <Text> Log Out </Text>
                      </Button>
                    <FlatList
                        ref='listRef'
                        data={this.props.projects}
                        renderItem={this.renderItem}
                        initialNumToRender={5}
                        keyExtractor={(item, index) => index.toString()}/>

                </View>
            );
        }
    }
}


function mapStateToProps(state, props) {
    return {
        isLoading: state.homeReducer.isLoading,
        projects: state.homeReducer.projects
    }
}


export default connect(mapStateToProps, { getProjects, signOut })(Home);
