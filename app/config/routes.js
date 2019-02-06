import React from 'react';
import {
  Scene,
  Router,
  ActionConst,
  Stack,
  Modal,
  Tabs,
  Actions} from 'react-native-router-flux';

//Splash Component
import Splash from '../components/Splash/Splash';

//Authentication Scenes
import Welcome from '../modules/auth/scenes/Auth/Welcome';
import Register from '../modules/auth/scenes/Auth/Register';
import CompleteProfile from '../modules/auth/scenes/Auth/CompleteProfile';
import Login from '../modules/auth/scenes/Auth/Login';
import ForgotPassword from '../modules/auth/scenes/Auth/ForgotPassword';
import Home from '../modules/home/scenes/Home';
import NewProject from '../modules/home/scenes/NewProject';

import NavButton from '../components/NavButton';
import SaveButton from '../modules/home/components/SaveButton';

//Import Store, actions
import store from '../redux/store'
import {checkLoginStatus} from "../modules/auth/actions";

import {color, navTitleStyle} from "../styles/theme";

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
            isLoggedIn: false,
            exists: false // indicates if user exist in realtime daabase
        }
    }

    componentDidMount() {
        let _this = this;
        store.dispatch(checkLoginStatus((isLoggedIn) => {
            _this.setState({isReady: true, isLoggedIn});
        }));
    }

    renderAddButton(props) {
        return (
            <NavButton onPress={Actions.NewProject}
                       name={"plus"} type={"entypo"}
                       color={color.black}/>
        )
    }

    renderCloseButton(props) {
        return (
            <NavButton onPress={Actions.pop}
                       name={"md-close"}
                       type={"ionicon"}
                       color={color.black}/>
        )
    }

    renderSaveButton(props) {
        if (props.showButton) return (<SaveButton data={props.data}/>)
        else return null
    }

    render() {
        if (!this.state.isReady)
            return <Splash/>

        return (
            <Router>
                <Modal>
                    <Scene key="root" hideNavBar
                           navigationBarStyle={{backgroundColor: "#fff"}}
                           titleStyle={navTitleStyle}
                           backButtonTintColor={color.black}>
                        <Stack key="Auth" initial={!this.state.isLoggedIn}>
                            <Scene key="Welcome" component={Welcome} title="" initial={true} hideNavBar/>
                            <Scene key="Register" component={Register} title="Register" back/>
                            <Scene key="CompleteProfile" component={CompleteProfile} title="Select Username"
                                   back={false}/>
                            <Scene key="Login" component={Login} title="Login"/>
                            <Scene key="ForgotPassword" component={ForgotPassword} title="Forgot Password"/>
                        </Stack>

                        <Stack key="Main" initial={this.state.isLoggedIn}>
                            <Scene
                            key="Home"
                            component={Home}
                            title="Home" initial={true}
                            type={ActionConst.REPLACE}
                              renderRightButton={this.renderAddButton}/>
                        </Stack>
                    </Scene>
                    <Scene key="NewProject"
                           navigationBarStyle={{backgroundColor: "#fff"}}
                           titleStyle={navTitleStyle}
                           component={NewProject} title="New Project"
                           renderLeftButton={this.renderCloseButton}
                           renderRightButton={this.renderSaveButton}/>
                </Modal>
            </Router>
        )
    }
}
