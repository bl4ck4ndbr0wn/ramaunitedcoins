import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getCurrentTokens } from "../../actions/tokenActions";

import PageContent from "../layout/PageContent";
import Spinner from "../common/Spinner";
import TransactionItem from "./TransactionItem";

class TransactionHistory extends Component {
  componentDidMount() {
    this.props.getCurrentTokens();
  }

  render() {
    const { tokens, loading } = this.props.token;

    let TransactionContent;

    if (tokens == null || loading) {
      TransactionContent = <Spinner />;
    } else {
      if (Object.keys(tokens).length > 0) {
        TransactionContent = (
          <div class="row">
            <div class="col-12">
              <div class="card m-b-30">
                <div class="card-body">
                  <div className="d-flex justify-content-between mb-4">
                    <div className="flexbox">
                      <Link to="/" className="btn btn-primary btn-fix">
                        <span className="btn-icon">Back</span>
                      </Link>
                    </div>
                    <Link
                      to="/request-token"
                      className="btn btn-primary btn-fix"
                    >
                      <i className="ti-plus" />
                      Request Token
                    </Link>
                  </div>

                  <TransactionItem tokens={tokens} />
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        TransactionContent = (
          <div class="row">
            <div class="col-12">
              <div class="card m-b-30">
                <div class="card-body">
                  <div className="d-flex justify-content-between mb-4">
                    <div className="flexbox">
                      <Link to="/" className="btn btn-primary btn-fix">
                        <span className="btn-icon">Back</span>
                      </Link>
                    </div>
                    <Link
                      to="/request-token"
                      className="btn btn-primary btn-fix"
                    >
                      <i className="ti-plus" />
                      Request Token
                    </Link>
                  </div>
                  <div className="d-flex justify-content-center mb-4">
                    <span class="page-title text-center">
                      You have no past Transactions
                    </span>
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
                    <a href="#">User</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="#">transaction</a>
                  </li>
                  <li class="breadcrumb-item active">My Transactions</li>
                </ol>
              </div>
              <h4 class="page-title">My Transactions</h4>
            </div>
          </div>
        </div>
        {/* <!-- end page title end breadcrumb --> */}
        {TransactionContent}
      </PageContent>
    );
  }
}

TransactionHistory.propTypes = {
  getCurrentTokens: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  token: state.token,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentTokens }
)(TransactionHistory);
