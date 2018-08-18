import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getCurrentTokens } from "../../actions/tokenActions";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import TransactionItem from "./TransactionItem";
import Spinner from "../common/Spinner";

class TransactionList extends Component {
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
          <div>
            <div class="flexbox mb-4">
              <div class="flexbox">
                <Link to="/" className="btn btn-primary btn-fix">
                  <span className="btn-icon">Back</span>
                </Link>
              </div>
              <Link to="/buy" className="btn btn-primary btn-fix">
                <span className="btn-icon">
                  <i className="la la-plus" />
                  Request Token
                </span>
              </Link>
            </div>
            <TransactionItem tokens={tokens} />
          </div>
        );
      } else {
      }
    }

    return (
      <div className="page-wrapper">
        {/* <!-- START HEADER-->*/}
        <Header /> {/* <!-- END HEADER-->*/}
        <div className="content-wrapper" style={{ minHeight: "100vh" }}>
          {/*    <!-- START PAGE CONTENT-->*/}
          <div className="page-content fade-in-up">
            <div class="ibox">
              <div class="ibox-body">
                <h5 class="font-strong mb-4">My Transactions</h5>
                {TransactionContent}
              </div>
            </div>
          </div>
        </div>
        {/*  <!-- END PAGE CONTENT-->*/}
        <Footer />
      </div>
    );
  }
}

TransactionList.propTypes = {
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
)(TransactionList);
