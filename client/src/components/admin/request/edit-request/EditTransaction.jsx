import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";

import { getTokenById } from "../../../../actions/admin/requestAction";

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
    const { token, loading } = this.props.token;

    let tokenDetails;
    if (isEmpty(token) || loading) {
      tokenDetails = <Spinner />;
    } else {
      if (Object.keys(token).length > 0) {
        tokenDetails = (
          <div class="row">
            <div class="col-12">
              <div class="card m-b-30">
                <div class="card-body">
                  <div class="row">
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
        <div class="row">
          <div class="col-sm-12">
            <div class="page-title-box">
              <div class="btn-group pull-right">
                <ol class="breadcrumb hide-phone p-0 m-0">
                  <li class="breadcrumb-item">
                    <a href="#">Admin</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="#">Transaction</a>
                  </li>
                  <li class="breadcrumb-item active">Transaction Details</li>
                </ol>
              </div>
              <h4 class="page-title">Transaction Details</h4>
            </div>
          </div>
        </div>
        {/* <!-- end page title end breadcrumb --> */}
        {tokenDetails}
      </PageContent>
    );
  }
}

EditTransaction.propTypes = {
  getTokenById: PropTypes.func.isRequired,
  token: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  token: state.token,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getTokenById }
)(withRouter(EditTransaction));
