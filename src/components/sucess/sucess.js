import React from "react";
import "./sucess.scss";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  button: {
    marginLeft: "auto",
    marginRigth: "auto",
    width: 200
  }
});

const Sucess = ({ firstName, lastName, signedUp, classes }) => {
  if (!signedUp) {
    return (
      <div className="main">
        <div className="success">
          <h2> Congratulations!</h2>
          <h4> You have successfully Logged In</h4>

          <Link to="/">
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
            >
              Log out
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="main">
      <div className="success">
        <h2> Congratulations!</h2>
        <h4> You have successfully Signed up</h4>
        <h3>
          Welcome
          <p>{firstName}</p>
          <p>{lastName}</p>
        </h3>
        <Link to="/">
          <Button variant="contained" color="primary" size="small">
            Log out
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default withStyles(styles)(Sucess);
