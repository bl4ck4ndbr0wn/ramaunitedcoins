import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { getTokenDescription } from "../../../actions/tokenActions";
import Header from "../../layout/Header";
import Breadcrumb from "../../common/BreadCrumb";
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

    if (token_desc === null || loading) {
      transactionDesc = <Spinner />;
    } else {
      transactionDesc = (
        <div class="row">
          <div class="col-xl-7">
            <DocumentList
              token={token_desc.token}
              documents={token_desc.token.document}
            />
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
            <div class="d-flex align-items-center mb-5">
              <span class="mr-4 static-badge badge-pink">
                <i class="fa fa-exchange" />
              </span>
              <div>
                <h5 class="font-strong">Transaction #1253</h5>
                <div class="text-light">On, 17.05.2018</div>
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
