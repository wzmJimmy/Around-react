import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import '../styles/Header.css'
export class Header extends Component{
    static propTypes ={
        isLogin:PropTypes.bool.isRequired,
        handle_logout:PropTypes.func.isRequired,
    }

    render(){
        return(
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Around</h1>
                {this.props.isLogin? (
                    <div className="logout">
                    <a onClick={this.props.handle_logout}>
                        <Icon type="logout" />{' '}Logout
                    </a>
                    </div>
                ):null}
            </header>
            );
    }
}

//"default" after export <-|-> import no {}