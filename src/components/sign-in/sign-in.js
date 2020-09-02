import React, { useState, useEffect } from "react";
import { Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ErrorHandler from "../error/error";
import { validation } from "../validation/validation";
import SucessContainer from "../../containers/Sucess-Container";
import { Link } from "react-router-dom";

const styles = theme => ({
  inputMargin: {
    marginBottom: 20
  },
  link: {
    fontSize: 16,
    textAlign: "right"
  },
  button: {
    marginLeft: 30
  }
});

const SignIn = ({ classes }) => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [errors, setError] = useState({
    error_email: false,
    error_password: false,
    loginEmailError: false,
    loginPasswordError: false,
    loggedIn: false
  });
  const [data, setData] = useState({
    allData: null,
    allPasswords: [],
    allEmails: []
  });

  const {
    error_email,
    error_password,
    loginPasswordError,
    loginEmailError,
    loggedIn
  } = errors;
  const { email, password } = user;
  const { allData, allPasswords, allEmails } = data;
  const error = error_password || error_email || !email || !password;

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(response => response.json())
      .then(result => setData({ ...data, allData: result }));
  }, []);

  useEffect(() => {
    let email_array = [];
    let password_array = [];
    if (data.allData) {
      allData.forEach(element => {
        email_array.push(element.email);
        password_array.push(element.password);
      });
      setData({
        ...data,
        allEmails: email_array,
        allPasswords: password_array
      });
    }
  }, [allData]);
  const handleInputChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    if (name === "password") {
      validation(name, value)
        ? setError({ ...errors, error_password: false })
        : setError({ ...errors, error_password: true });
    }
    if (name === "email") {
      validation(name, value)
        ? setError({ ...errors, error_email: false })
        : setError({ ...errors, error_email: true });
    }
  };
  const onSubmit = e => {
    e.preventDefault();
    allPasswords.includes(password) && allEmails.includes(email)
      ? setError({
          ...errors,
          loggedIn: true,
          loginPasswordError: false,
          loginEmailError: false
        })
      : setError({
          ...errors,
          loggedIn: false,
          loginPasswordError: true,
          loginEmailError: true
        });
  };
  if (!loggedIn) {
    return (
      <>
        <form className="form" onSubmit={onSubmit}>
          <label className="mb-5"> Sign In</label>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleInputChange}
            className={classes.inputMargin}
          />
          {error_email && <ErrorHandler name="email" />}
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
            className={classes.inputMargin}
          />
          {error_password && <ErrorHandler name="password" />}
          <Button
            variant="contained"
            color="secondary"
            disabled={error}
            type="submit"
            style={{ marginRight: "auto", marginLeft: "auto" }}
          >
            Submit
          </Button>
          <div style={{ marginBottom: 50 }}>
            {loginEmailError && <ErrorHandler name="loginEmail" />}
          </div>
          <div style={{ marginBottom: 50 }}>
            {loginPasswordError && <ErrorHandler name="loginPassword" />}
          </div>
          <p className={classes.link}>
            If you don't have account
            <Link to="/signup">
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
              >
                Sign Up
              </Button>
            </Link>
          </p>
        </form>
      </>
    );
  }
  return <SucessContainer />;
};

export default withStyles(styles)(SignIn);
