import React from 'react';

import { View, TouchableOpacity } from 'react-native';

import {Actions} from 'react-native-router-flux';
import {Icon} from 'react-native-elements';

import styles from "./styles";
import {connect} from "react-redux";

import {actions as home, theme} from "../../index";
import { addProject, updateProject } from '../../actions';
import {normalize} from '../../../../styles/theme';


class SaveButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.onPress = this.onPress.bind(this)
    }

    onPress() {
        const { data } = this.props;
        const { edit } = data;

        if (edit) this.editProject()
        else this.saveProject()
    }

    editProject(){
        let { data } = this.props;
        const { text, color, project } = data;

        project['text'] = text;
        project['color'] = color;

        this.props.updateProject(project, this.onSuccess, this.onError)
    }

    saveProject(){
        const { data, user } = this.props;
        const { text, color } = data;

        const newProject = {
            text: text,
            color,
            time: Date.now(),
            userId: user.uid,
            loveCount: 0,
            name: {
                name: user.username
            }
        };

        this.props.addProject(newProject, this.onSuccess, this.onError)
    }

    onSuccess(){
        Actions.pop();
    }

    onError(error){
        alert(error.message)
    }

    render() {
        return (
            <TouchableOpacity onPress={this.onPress}>
                <View style={styles.wrapper}>
                    <Icon name={"md-send"}
                          type={"ionicon"}
                          size={25}
                          iconStyle={styles.icon}
                          color={"rgba(0,0,0,.84)"}/>
                </View>
            </TouchableOpacity>
        )
    }
}


function mapStateToProps(state, props) {
    return {
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps, { addProject, updateProject })(SaveButton);
