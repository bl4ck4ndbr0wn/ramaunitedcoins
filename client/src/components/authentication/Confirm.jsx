import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { confirmAccount } from "../../actions/authActions";

import AuthLayout from "./layout";

class Confirm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      verify: false,
      token: ""
    };
  }
  componentDidMount() {
    if (this.props.match.params.id) {
      this.setState(prevState => ({
        verify: !prevState.verify,
        token: this.props.match.params.id
      }));
    }
  }

  onSubmit(e) {
    if (this.props.match.params.id) {
      let tokenField = {
        token: this.state.token
      };
      this.props.confirmAccount(tokenField, this.props.history);
    } else {
      this.props.history.push("/");
    }
  }

  render() {
    const { verify } = this.state;

    let displayContent;

    if (!verify) {
      displayContent = (
        <AuthLayout title="Confirm Email">
          <div className="alert alert-info alert-dismissible">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-hidden="true"
            >
              ×
            </button>
            We sent you a confirmation email.
          </div>
          <h6 className=" text-center ">
            <strong>Please check your email</strong> for further instructions on
            how to complete your account setup.
          </h6>
        </AuthLayout>
      );
    } else {
      displayContent = (
        <AuthLayout title="Verify Email">
          <div className="alert alert-info alert-dismissible">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-hidden="true"
            >
              ×
            </button>
            Please click <strong>Verify</strong> to complete your account setup.
          </div>
          <div className="form-group text-center row m-t-20">
            <div className="col-12">
              <button
                className="btn btn-info btn-block waves-effect waves-light"
                type="submit"
                onClick={this.onSubmit.bind(this)}
              >
                Verify Email
              </button>
            </div>
          </div>
        </AuthLayout>
      );
    }
    return displayContent;
  }
}

Confirm.propTypes = {
  confirmAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = () => {};

export default connect(
  mapStateToProps,
  { confirmAccount }
)(Confirm);
