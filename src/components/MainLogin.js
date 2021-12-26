import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import Alert from "@mui/material/Alert";
import { withRouter } from "react-router";
import axios from "axios";
import Login from "./Login";

const eventBaseUrl = "http://localhost:8080/user/login";
class MainLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      shouldAlertDisplay: false,
      shouldLoginErrorDisplay:false
    };
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleLogin = () => {
    const { username, password } = this.state;
    const {
      history: { push },
    } = this.props;
    if (username === "" || password === "") {
      this.setState({ shouldAlertDisplay: true });
      return;
    }
    this.setState({ shouldAlertDisplay: false });
    this.setState({ shouldLoginErrorDisplay: false });
    const reqJson={
      username:username,password:password
    }
    axios.post(eventBaseUrl,reqJson).then((res) => {
     if(res.data)
     {
       localStorage.setItem("username",username)
      push({
        pathname: "/home",
        username: username, 
      });
     }
     if(!res.data){
       this.setState({shouldLoginErrorDisplay: true})
     }
    });
  };

  render() {
    return (
      <div className="flex flex-col">
      <div className="flex justify-center p-4 text-5xl text-white bg-blue-500 shadow-md font-medium ">Health Care Blockchain System</div>
      <div className="flex mx-auto">
          <Login type="Patient"></Login>
          <Login type="Doctor"></Login>
      </div>
      </div>
    );
  }
}

export default withRouter(MainLogin);
