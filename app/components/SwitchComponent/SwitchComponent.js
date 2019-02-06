import React, {Component} from 'react';
import {AppRegistry, Text, View, Switch } from 'react-native';
import PropTypes from 'prop-types';

export default class SwitchComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: this.props.value
    }
  }

  static defaultProps = {
    value: false
  }

  onValueChange(value){
    console.log(value);
    this.setState({value: value})
  }

  render(){
    let toggle = this.state.value ? 'ON' : 'OFF' ;
    return (
      <View>
          <Text> {toggle}</Text>
          <Switch
           onValueChange={(value) => this.onValueChange(value)}
           value={this.state.value}
          />
        </View>
    );
  }
};

AppRegistry.registerComponent('SwitchComponent', () => SwitchComponent);

