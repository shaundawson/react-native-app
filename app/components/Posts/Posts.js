import React, {Component} from 'react';
import { AppRegistry,
  Platform,
  Text,
  View,
  TextInput,
  StyleSheet
} from 'react-native';

import axios from 'axios';

export default class Posts extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [ ]
    };
  }

componentDidMount(){
  this.fetchPosts();
}

  async fetchPosts(){
    const apiKey = 'AIzaSyCrKG-60DCstE4bAeqfeJSPS9jFLZCmHlg';
    const results = 10
    const channelId = 'UC29ju8bIPH5as8OGnQzwJyA'
    const apiEndpoint =`https://www.googleapis.com/youtube/v3/search/?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${results}`
    const response = await axios.get(apiEndpoint)
    const data = response.data;
    console.log(data);
      const videoId =[]
      response.items.forEach(item => {
        videoId.push(item)
      })
      this.setState({
        data:videoId
      })
      .catch(error => {
      console.error(error)
    });
  }

  render(){
    return (
      <View>
      <Text> Post Component</Text>
        </View>
    );
  }
};

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('Posts', () => Posts);
