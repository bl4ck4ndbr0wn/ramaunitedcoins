import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";

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

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.token.token_desc === null && this.props.token.loading) {
  //     this.props.history.push("/not-found");
  //   }
  // }

  render() {
    const { token_desc, loading } = this.props.token;
    const { user } = this.props.auth;
    let transactionDesc;
    let tDate;
    let tID;

    if (loading || isEmpty(token_desc)) {
      transactionDesc = <Spinner />;
    } else {
      tDate = <Moment format="DD.MM.YYYY">{token_desc.token.date}</Moment>;
      tID = token_desc.token._id;
      transactionDesc = (
        <div className="row">
          <div className="col-xl-7">
            <DocumentList token={token_desc.token} />
          </div>
          <TransactionInfo
            user={token_desc.profile}
            token={token_desc.token}
            userAuth={user}
          />
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
                <h5 className="font-strong">Transaction #{tID}</h5>
                <div className="text-light">On, {tDate}</div>
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
  token: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  token: state.token,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getTokenDescription }
)(withRouter(ConfirmTransaction));
