import React, { Component } from 'react';
import '../styles/App.css';
import {Header} from "./Header.js";
import {Main} from "./Main.js";
import {KEY} from "../util/constant";

class App extends Component {
    state = {
        isLogin: !!localStorage.getItem(KEY),
    }
    handle_login = (response)=>{
        localStorage.setItem(KEY,response);
        this.setState({isLogin:true});
    }
    handel_logout = ()=>{
        localStorage.removeItem(KEY);
        this.setState({isLogin:false});
    }
  render() {
        console.log(this.state.isLogin)
    return (
      <div className="App">
        <Header isLogin={this.state.isLogin} handle_logout={this.handel_logout}/>
        <Main isLogin={this.state.isLogin} handle_login={this.handle_login} />
      </div>
    );
  }
}

export default App;
