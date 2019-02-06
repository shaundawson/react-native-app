import React, {Component} from 'react';
import {AppRegistry, Text, View, Picker } from 'react-native';
import PropTypes from 'prop-types';

export default class PickerComponent extends Component {
  constructor(){
    super();
    this.state = {
      category: 'reviews'
    }
  }

 onValueChange(key, value){
  console.log(key+':'+value);
  this.setState({category: value});
 }

  render(){
    return (
      <View>
          <Picker
            selectedValue={this.state.category}
            onValueChange={this.onValueChange.bind(this, 'category')}
            prompt="Category"
            enabled = {true}
            >
            <item label ="Reviews" value="reviews" />
            <item label ="Tutorials" value="tutorials" />
          </Picker>
          <Text>Selected Category: {this.state.category} </Text>
        </View>
    );
  }
};

AppRegistry.registerComponent('PickerComponent', () => PickerComponent);
