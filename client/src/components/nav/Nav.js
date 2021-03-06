import React, { Component } from "react";
import Modal from "../login/LoginModal.js";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import './Nav.css';


export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUsername: "",
      currentUserId: "",
      show: false,
      modalType: true,
      username: "",
      password: "",
    };
  }
 
  showModalLogin = () => {
    this.setState({
      show: true,
      modalType: true
    });
  };

  showModalRegister = () => {
    this.setState({
      show: true,
      modalType: false
    });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleSubmitLogin = (e) => {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    
    axios.post(`http://localhost:3001/api/users/login`, user)
      .then(res => {
        console.log("login response: ");
        console.log(res.data.token);
        console.log(jwt_decode(res.data.token).username);
        this.props.setToken(res.data.token);
        this.props.setUsername(jwt_decode(res.data.token).username);
        console.log("almost connected");    
        this.setState({show: false});
      })
      .catch(err => {
        console.log(err.response)
      });
  }

  handleSubmitRegister = (e) => {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    console.log(user.username);
    console.log(user.password);

    axios.post(`http://localhost:3001/api/users/register`, user)
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({show: false});
        axios.post(`http://localhost:3001/api/users/login`, user)
        .then(res => {
          console.log("login response: ");
          console.log(res.data.token);
          console.log(jwt_decode(res.data.token).username);
          this.props.setToken(res.data.token);
          this.props.setUsername(jwt_decode(res.data.token).username);
          console.log("almost connected");    
          this.setState({show: false});
        })
        .catch(err => {
          console.log(err.response)
        });
      })
      .catch(err => {
        console.log(err.response)
      });
  }

  onEnter = (e) => {
    if (e.key === "Enter"){
      if(this.state.modalType === true){
        this.handleSubmitLogin(e)
      }
      else{
        this.handleSubmitRegister(e)
      }
    } 
  }

  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  showLoginAndRegister = () => {
    console.log("token: " + this.props.getTokenStatus());    
  } 

  logout = () => {
    this.props.deleteToken();
  }

  showLogin = () => {

    if(this.props.getTokenStatus()){
      return( 
      <div>
        <div className="username">{this.props.getUsername()}</div>
        <div className="logout" onClick={this.logout}>Logout</div>
      </div>
      );
    }
    else{
      return (
      <div>
        <button
          className="button-login"
          id="user"
          type="button"
          onClick={() => this.showModalLogin()}
        >
        Login
        </button>
        
        <button
          className="button-register"
          id="user"
          type="button"
          onClick={() => this.showModalRegister()}
        >
        Register
        </button>
      </div>
      );
    }           
  }

  render() {
    return (
      <div className="nav-container">             
        <Modal 
          ref={node => this.node = node}
          show={this.state.show}
          submitRegister={this.handleSubmitRegister}
          submitLogin={this.handleSubmitLogin}
          onEnter={this.onEnter}
          modalType={this.state.modalType}
          handleClose={this.hideModal}
        >
          <input
            className="input-username"
            type="text"
            value={this.username}
            onChange={this.handleUsernameChange}
            onKeyPress={this.onEnter}
          />
          <input
            className="input-password"
            type="text"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            onKeyPress={this.onEnter}
          />
        </Modal>
        <div className="nav-bar" >
          <h1 className="title">Chat</h1>
          {this.showLogin()}  
        </div>          
      </div>
    );
  }
}

