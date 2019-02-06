import React, {Component} from 'react';
import {AppRegistry, Text, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';

export default class TextInputComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: this.props.value
    }

  }

  static defaultProps = {
    value: "Some Other Text"
  }

  onChangeText(value){
    this.setState({value: value});
  }

  onSubmitEditing(e){
    console.log('onSubmitEditing Called: '+ e);
  }

  render(){
    return (
      <View>
        <TextInput
          placeholder="Type Something"
          value={this.state.value}
          maxLength={250}
          selectionColor='red'
          onChangeText ={(value) => this.onChangeText(value)}
          onSubmitEditing={(e) => this.onSubmitEditing(e.nativeEvent.text)}
          />
          <Text>{this.state.value}</Text>
        </View>
    );
  }
};

AppRegistry.registerComponent('TextInputComponent', () => TextInputComponent);
