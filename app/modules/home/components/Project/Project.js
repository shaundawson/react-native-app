import React from 'react';
import { Text, View, TouchableOpacity, ActionSheetIOS } from 'react-native';
import { Icon } from 'react-native-elements';
import moment from "moment";
import styles from "./styles";
import { connect } from "react-redux";
import { actions, theme } from "../../index"
import { Actions } from "react-native-router-flux";
import { deleteProject, toggleLove } from '../../actions'
import {padding, color, fontFamily, normalize} from '../../../../styles/theme';



class Project extends React.Component {
    constructor() {
        super();
        this.state = {}

        this.onOption = this.onOption.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onToggleLove = this.onToggleLove.bind(this);

        this.renderLoveButton = this.renderLoveButton.bind(this);
    }

    onOption(){
        const { projects, index } = this.props;
        const project = projects[index];

        // edit project, delete project, or cancel popup screen
        ActionSheetIOS.showActionSheetWithOptions({
                options: ['Edit', 'Delete', 'Cancel'],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 2,
            },
            (buttonIndex) => {
                if (buttonIndex === 0) Actions.NewProject({ edit:true, project })
                else if (buttonIndex === 1) this.onDelete();
            });
    }

    onDelete(){
        const { projects, index } = this.props;
        const project = projects[index];

        this.props.deleteProject(project, (error) =>  alert(error.message))
    }

    onToggleLove(){
        const { user, projects, index } = this.props;
        const project = projects[index];

        const data = { project, uid:user.uid };

        this.props.toggleLove(data, (error) =>  alert(error.message))
    }

    renderOptionButton(){
        return(
            <View style={styles.right}>
                <TouchableOpacity onPress={this.onOption}>
                    <View style={styles.buttonContainer}>
                        <Icon
                            name={'md-open'}
                            type='ionicon'
                            color='#fff'
                            size={normalize(20)}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    renderLoveButton(){
        const { user, projects, index } = this.props;
        const project = projects[index];
        const { loves } = project;

        return(
            <TouchableOpacity onPress={this.onToggleLove}>
                <View style={styles.buttonContainer}>
                    <Icon
                        name={
                            (loves && loves[user.uid]) ?
                                'md-heart'
                                :
                                'md-heart-outline'
                        }
                        type='ionicon'
                        color='#fff'
                        iconStyle={{height:normalize(20)}}
                        size={normalize(20)}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { user, projects, index } = this.props;
        const project = projects[index];
        const { text, name, time, color, userId } = project;

        return (
            <View style={[styles.container]}>
                <View style={[styles.wrapper, {backgroundColor: color, borderColor: color}]}>

                    <View style={[styles.project]}>
                        <Text style={[styles.text]}>
                            {text}
                        </Text>
                        {(user.uid === userId) && this.renderOptionButton()}
                    </View>

                    <View style={styles.bottom}>

                        <View style={styles.left}>
                            <Text style={[styles.name]}>
                                {name.name}
                            </Text>
                            <Text style={[styles.publishedAt]}>
                                {moment(time).fromNow()}
                            </Text>
                        </View>
                        <View style={styles.right}>
                            {this.renderLoveButton()}
                        </View>
                    </View>
                </View>

            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.authReducer.user,
        projects: state.homeReducer.projects
    }
}

export default connect(mapStateToProps, { deleteProject, toggleLove })(Project);
