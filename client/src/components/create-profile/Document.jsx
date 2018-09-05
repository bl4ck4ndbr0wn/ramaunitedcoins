import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./Document.css";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Breadcrumb from "../common/BreadCrumb";
import { documentUpload } from "../../actions/tokenActions";
import isEmpty from "../../validation/is-empty";
import Spinner from "../common/Spinner";

const $ = require("jquery");

class Document extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      fileupload: null,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({
      fileupload: e.target.files[0],
      message: e.target.files[0].name
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const fd = new FormData();
    if (this.state.fileupload === null) {
      this.setState({ errors: { fileUpload: "File Field can not be Empty." } });
    } else {
      this.setState({ errors: {} });
      fd.append(
        "fileUpload",
        this.state.fileupload,
        this.state.fileupload.name
      );

      this.props.documentUpload(fd, this.props.match.params.id);
      this.setState({
        fileupload: null,
        message: null
      });
    }
  }

  render() {
    const { errors, message, fileupload } = this.state;
    const { token, loading } = this.props.token;
    console.log(token);
    let documenContent;
    let item;
    let alertItem;

    if (token === null || loading) {
      documenContent = <div className="ibox-title">No Documents Uploaded.</div>;
    } else {
      if (Object.keys(token).length > 0) {
        alertItem = (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>Successfully Uploaded!</strong>
            Click Upload to add another document.
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              {/* <span aria-hidden="true">&times;</span> */}
            </button>
          </div>
        );
        item = token.document.map(doc => (
          <tr key={doc._id}>
            <td>{doc._id}</td>
            <td>{doc.originalname}</td>
            <td>{doc.date}</td>
            <td>
              <i className="ti-check text-success" />
            </td>
          </tr>
        ));
        documenContent = (
          <table className="table table-condensed">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{item}</tbody>
          </table>
        );
      }
    }

    return (
      <div className="page-wrapper">
        {/*
  <!-- START HEADER-->*/}
        <Header /> {/*
  <!-- END HEADER-->*/}
        <div className="content-wrapper" style={{ minHeight: "100vh" }}>
          {/*
    <!-- START PAGE CONTENT-->*/}
          <Breadcrumb title="BUY TOKENS" item="BUY" />
          <div className="page-content fade-in-up">
            <div className="row justify-content-md-center">
              {alertItem}
              <div className="col-md-8">
                <div className="ibox ibox-fullheight">
                  <div className="ibox-head">
                    <div className="ibox-title">
                      Upload bank receipt/ any screenshot of proof – <br />
                      If paid by ETH or BTC/ LTC / please take a screenshot of
                      transaction ID code.
                    </div>
                  </div>
                  <form onSubmit={this.onSubmit}>
                    <div className="ibox-body">
                      <input
                        className="inputfile"
                        id="file"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={this.onChange}
                        ref={fileInput => (this.fileInput = fileInput)}
                      />
                      <div
                        className="btn-group"
                        style={{
                          display: "flex",
                          justifyContent: "center"
                        }}
                      >
                        <label
                          className="btn btn-info"
                          onClick={() => this.fileInput.click()}
                          style={{
                            width: "30rem"
                          }}
                        >
                          <span className="btn-icon">
                            <i className="la la-cloud-download" />
                            Upload
                          </span>
                        </label>

                        <span className="btn-label-out btn-label-out-right btn-label-out-info pointing">
                          {!isEmpty(message) ? message : "No file selected."}
                        </span>
                      </div>
                      <label
                        className="help-block"
                        htmlFor={fileupload}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          color: "#ff2770"
                        }}
                      >
                        {errors.fileUpload}
                      </label>
                    </div>

                    <div className="d-flex justify-content-between ibox-footer">
                      <Link to="/transactions" className="btn btn-primary">
                        Finish
                      </Link>
                      <input
                        type="submit"
                        value="Upload"
                        className="btn btn-primary"
                        style={{ width: "12rem" }}
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-12">
                <div className="ibox">
                  <div className="ibox-head">
                    <div className="ibox-title">Uploaded Documents</div>
                  </div>
                  <div className="ibox-body">{documenContent}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*
  <!-- END PAGE CONTENT-->*/}
        <Footer />
      </div>
    );
  }
}

Document.propTypes = {
  documentUpload: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  token: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  token: state.token,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { documentUpload }
)(withRouter(Document));
