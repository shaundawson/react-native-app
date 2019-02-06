import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Font, AppLoading } from 'expo';
import Router from './app/config/routes';
import store from './app/redux/store';

function cacheFonts(fonts) {
    return fonts.map(font => Font.loadAsync(font));
}

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
        }
    }

   async _loadAssetsAsync() {
        const fontAssets = cacheFonts([
            {LatoSemiBold: require('./app/assets/fonts/Lato-SemiBold.ttf')},
            {LatoBold: require('./app/assets/fonts/Lato-Bold.ttf')},
            {LatoMedium: require('./app/assets/fonts/Lato-Medium.ttf')},
            {LatoRegular: require('./app/assets/fonts/Lato-Regular.ttf')},
            {LatoLight: require('./app/assets/fonts/Lato-Light.ttf')}
        ]);

        await Promise.all([...fontAssets]);
    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={() => this.setState({isReady: true})}
                    onError={console.warn}
                />
            );
        }

        return (
            <Provider store={store}>
                <Router/>
            </Provider>
        );
    }
}


