import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import Alert from "@mui/material/Alert";
import { withRouter } from "react-router";
import axios from "axios";

const eventBaseUrl = "http://localhost:8080/user/register";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
      shouldAlertDisplay: false,
      shouldErrorMessageDisplay: false,
      signupErrorMessage:""

    };
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePhoneNumberChange = (e) => {
    this.setState({ phoneNumber: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = () => {
    const { username, email, phoneNumber, password } = this.state;
    const {
      history: { push },
    } = this.props;
    if (
      username === "" ||
      email === "" ||
      phoneNumber === "" ||
      password === ""
    ) {
      this.setState({ shouldAlertDisplay: true });
      return;
    }
    const reqJson={
     username:username,
     password:password,
      email:email,
       phone:phoneNumber
    }
    axios.post(eventBaseUrl,reqJson).then((res) => {
      if(res.data.isRegistered)
      {
        push('/');
      }
      if(!res.data.isRegistered){
       this.setState({
        signupErrorMessage:res.data.error,
        shouldErrorMessageDisplay:true
       }) 
      }
    });
  };

  render() {
    const { username, email, phoneNumber, password, shouldAlertDisplay,shouldErrorMessageDisplay,signupErrorMessage } =
      this.state;
      
    return (
      <div className="flex flex-col space-y-5 max-w-md mx-auto my-16 min-w-500">
        <h2 className="text-4xl font-semibold text-blue-800">Signup</h2>
        <TextField
          required
          id="outlined-username"
          value={username}
          label="Username"
          autoComplete="off"
          onChange={(e) => this.handleUsernameChange(e)}
        />
        <TextField
          required
          id="outlined-email"
          value={email}
          label="Email"
          onChange={(e) => this.handleEmailChange(e)}
        />
        <TextField
          required
          id="outlined-phone"
          value={phoneNumber}
          label="Phone Number"
          onChange={(e) => this.handlePhoneNumberChange(e)}
        />
        <TextField
          value={password}
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          onChange={(e) => this.handlePasswordChange(e)}
        />
        <div className="flex items-center justify-between">
          <Button variant="contained" onClick={this.handleSubmit}>
            Submit
          </Button>
          <div className="flex">
            <p className="text-lg">Existing User?</p>
            <Link to="/" className="text-blue-500 font-semibold text-lg px-1">
              Login
            </Link>
          </div>
        </div>
        {shouldAlertDisplay &&
          <Alert severity="error">Field cannot be empty</Alert>
        }
         {shouldErrorMessageDisplay &&
          <Alert severity="error"> {signupErrorMessage} </Alert>
        }
        
      </div>
    );
  }
}

export default withRouter(Signup);
