import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";

import {
  getTokenById,
  confrimRequest
} from "../../../../actions/admin/requestAction";

import PageContent from "../../../layout/PageContent";
import isEmpty from "../../../../validation/is-empty";
import Spinner from "../../../common/Spinner";
import UserDetails from "./UserDetails";
import DocumentDetails from "./DocumentDetails";

class EditTransaction extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getTokenById(this.props.match.params.id);
    }
  }

  render() {
    const { token, loading, errors, failure, success } = this.props.token;
    let tokenDetails;
    let alertMessage;
    if (!isEmpty(errors)) {
      alertMessage = (
        <div className="col-12">
          <div className="alert alert-warning alert-dismissible">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-hidden="true"
            >
              ×
            </button>
            <strong>Failed to Update!</strong>
            Refresh the page and try once again.
            <br />
            {errors.tokennotfound}
          </div>
        </div>
      );
    }
    if (isEmpty(token) || loading) {
      tokenDetails = <Spinner />;
    } else {
      if (Object.keys(token).length > 0) {
        if (failure && !success) {
          alertMessage = (
            <div className="col-12">
              <div className="alert alert-warning alert-dismissible">
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-hidden="true"
                >
                  ×
                </button>
                <strong>Failed to Update!</strong>
                Refresh the page and try once again.
              </div>
            </div>
          );
        } else if (!failure && success) {
          alertMessage = (
            <div className="col-12">
              <div className="alert alert-success alert-dismissible">
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-hidden="true"
                >
                  ×
                </button>
                <strong>Successfull!</strong>
                Transaction {token.confirmed ? "Confirmed." : "Canceled"}.
              </div>
            </div>
          );
        }
        tokenDetails = (
          <div className="row">
            <div className="col-12">
              <div className="card m-b-30">
                <div className="card-body">
                  <div className="row">
                    <UserDetails token={token} />
                  </div>
                  <div className="row">
                    <DocumentDetails token={token} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    return (
      <PageContent>
        {/* <!-- Page-Title --> */}
        <div className="row">
          <div className="col-sm-12">
            <div className="page-title-box">
              <div className="btn-group pull-right">
                <ol className="breadcrumb hide-phone p-0 m-0">
                  <li className="breadcrumb-item">
                    <a href="#">Admin</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Transaction</a>
                  </li>
                  <li className="breadcrumb-item active">Transaction Details</li>
                </ol>
              </div>
              <h4 className="page-title">Transaction Details</h4>
            </div>
          </div>
        </div>

        {/* <!-- end page title end breadcrumb --> */}
        {alertMessage}
        {tokenDetails}
      </PageContent>
    );
  }
}

EditTransaction.propTypes = {
  getTokenById: PropTypes.func.isRequired,
  confrimRequest: PropTypes.func.isRequired,
  token: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  token: state.token,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getTokenById, confrimRequest }
)(withRouter(EditTransaction));
