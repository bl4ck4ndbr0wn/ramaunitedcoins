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
          <div className="row">
            <div className="col-12">
              <div className="card m-b-30">
                <div className="card-body">
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
          <div className="row">
            <div className="col-12">
              <div className="card m-b-30">
                <div className="card-body">
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
                    <span className="page-title text-center">
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
        <div className="row">
          <div className="col-sm-12">
            <div className="page-title-box">
              <div className="btn-group pull-right">
                <ol className="breadcrumb hide-phone p-0 m-0">
                  <li className="breadcrumb-item">
                    <a href="#">User</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">transaction</a>
                  </li>
                  <li className="breadcrumb-item active">My Transactions</li>
                </ol>
              </div>
              <h4 className="page-title">My Transactions</h4>
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
