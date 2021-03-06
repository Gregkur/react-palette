import React, { Component } from "react";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { MenuItem, Snackbar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import styles from "../styles/NavbarStyles";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import logo from "../styles/logoBlack.svg";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { format: "hex", open: false };
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }
  handleFormatChange(e) {
    this.setState({
      format: e.target.value,
      open: true,
    });
    this.props.handleChange(e.target.value);
  }
  closeSnackbar() {
    this.setState({
      open: false,
    });
  }
  render() {
    const { level, changeLevel, sliderOpen, classes } = this.props;
    const { format, open } = this.state;
    return (
      <header className={classes.Navbar}>
        <div className={classes.logo}>
          <Link to="/">
            <img src={logo} alt="logo" height="50px" />
          </Link>
        </div>
        {sliderOpen && (
          <div className={classes.sliderContainer}>
            <span>Level: {level}</span>
            <div className={classes.slider}>
              <Slider
                defaultValue={level}
                min={100}
                max={900}
                step={100}
                onAfterChange={changeLevel}
              />
            </div>
          </div>
        )}
        <div className={classes.selectContainer}>
          <Select value={format} onChange={this.handleFormatChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={open}
          autoHideDuration={3000}
          message={<span>Format changed to {format.toLocaleUpperCase()}</span>}
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          onClose={this.closeSnackbar}
          action={[
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              key="close"
              onClick={this.closeSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>,
          ]}
        />
      </header>
    );
  }
}
Navbar.defaultProps = {
  sliderOpen: true,
};

export default withStyles(styles)(Navbar);
