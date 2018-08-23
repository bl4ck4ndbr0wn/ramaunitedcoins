import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { getTokenDescription } from "../../../actions/tokenActions";
import Header from "../../layout/Header";
import isEmpty from "../../../validation/is-empty";
import Footer from "../../layout/Footer";
import Spinner from "../../common/Spinner";
import TransactionInfo from "./TransactionInfo";
import DocumentList from "./DocumentList";

class ConfirmTransaction extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getTokenDescription(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token.token_desc === null && this.props.token.loading) {
      this.props.history.push("/not-found");
    }
  }
  render() {
    const { token_desc, loading } = this.props.token;
    let transactionDesc;

    if (loading || isEmpty(token_desc)) {
      transactionDesc = <Spinner />;
    } else {
      transactionDesc = (
        <div className="row">
          <div className="col-xl-7">
            <DocumentList token={token_desc.token} />
          </div>
          <TransactionInfo user={token_desc.profile} token={token_desc.token} />
        </div>
      );
    }

    return (
      <div className="page-wrapper">
        {/*
    <!-- START HEADER-->*/}
        <Header />
        {/*
    <!-- END HEADER-->*/}
        <div className="content-wrapper" style={{ minHeight: "100vh" }}>
          {/*
      <!-- START PAGE CONTENT-->*/}

          <div className="page-content fade-in-up">
            <div className="d-flex align-items-center mb-5">
              <span className="mr-4 static-badge badge-pink">
                <i className="fa fa-exchange" />
              </span>
              <div>
                <h5 className="font-strong">Transaction #1253</h5>
                <div className="text-light">On, 17.05.2018</div>
              </div>
            </div>
            {transactionDesc}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

ConfirmTransaction.propTypes = {
  getTokenDescription: PropTypes.func.isRequired,
  token: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  token: state.token
});
export default connect(
  mapStateToProps,
  { getTokenDescription }
)(withRouter(ConfirmTransaction));
