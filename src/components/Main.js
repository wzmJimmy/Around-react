import React, {Component} from 'react';
import {Register} from "./Register.js";
import {Login} from "./Login";
import {Home} from "./Home";
import {Switch, Route, Redirect} from 'react-router-dom';

export class Main extends Component {
    getRoot = () => {
        return <Redirect to="/login"/>
    }
    getLogin = () => {
        return this.props.isLogin ? <Redirect to="/home"/> : <Login handle_login={this.props.handle_login}/>;
    }
    getHome = () => {
        return this.props.isLogin ? <Home/> : <Redirect to="/login"/>;
    }

    render() {
        return (
            <div className="main">
                <Switch>
                    <Route path="/login" render={this.getLogin}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/home" render={this.getHome}/>
                    <Route render={this.getRoot}/>
                </Switch>
            </div>

        );
    }
}
