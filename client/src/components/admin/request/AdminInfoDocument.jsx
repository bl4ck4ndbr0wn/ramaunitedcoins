import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { documentUpload } from "../../../actions/tokenActions";

import PageContent from "../../layout/PageContent";
import isEmpty from "../../../validation/is-empty";
import "./InfoDocument.css";

class AdminInfoDocument extends Component {
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
      this.setState({
        errors: {},
        fileupload: null,
        message: null
      });
      fd.append(
        "fileUpload",
        this.state.fileupload,
        this.state.fileupload.name
      );

      this.props.documentUpload(fd, this.props.match.params.id);
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
              <strong>Successfully Uploaded!</strong>
              Click Upload to add another document.
            </div>
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
      <PageContent>
        <div className="row">
          <div className="col-12">
            <div className="page-title-box">
              <div className="btn-group pull-right">
                <ol className="breadcrumb hide-phone p-0 m-0">
                  <li className="breadcrumb-item">
                    <a href="#">User</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Request</a>
                  </li>
                  <li className="breadcrumb-item active">Request RCC Tokens</li>
                </ol>
              </div>
              <h4 className="page-title">Request RCC Tokens</h4>
            </div>
          </div>
        </div>
        {/* <!-- end page title end breadcrumb --> */}

        <div className="row justify-content-md-center">
          <div className="col-10">
            <div className="card m-b-30">
              <div className="card-body">
                <h4 className="mt-0 header-title">Upload Documents</h4>
                <p className=" text-center ">
                  Upload bank receipt/ any screenshot of proof – <br />
                  If paid by ETH or BTC/ LTC / please take a screenshot of
                  transaction ID code.
                </p>
                <form className="" onSubmit={this.onSubmit}>
                  <div className="form-group text-center row m-t-30">
                    {alertItem}
                    <div className="col-12">
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
                            width: "20rem"
                          }}
                        >
                          <span className="btn-icon">
                            <i className="ti-upload" />
                            Upload
                          </span>
                        </label>
                      </div>
                      <span className="btn-label-out btn-label-out-right btn-label-out-info pointing">
                        {!isEmpty(message) ? message : "No file selected."}
                      </span>
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

                    <div className="col-6">
                      <Link
                        to="/admin/requests/all"
                        className="btn btn-info btn-block waves-effect waves-light"
                      >
                        Finish
                      </Link>
                    </div>
                    <div className="col-6">
                      <button
                        className="btn btn-info btn-block waves-effect waves-light"
                        type="submit"
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="card m-b-30">
              <div className="card-body">
                <p className="header-title text-center ">Uploaded Documents</p>
                {documenContent}
              </div>
            </div>
          </div>
        </div>
      </PageContent>
    );
  }
}

AdminInfoDocument.propTypes = {
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
)(withRouter(AdminInfoDocument));