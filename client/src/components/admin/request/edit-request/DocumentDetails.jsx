import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class DocumentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cancel: false
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    let documentList;
    if (Object.keys(this.props.token.document).length > 0) {
      documentList = this.props.token.document.map(doc => (
        <tr>
          <td>{doc.originalname}</td>
          <td class="text-center">
            <Moment format="YYYY/MMM/DD HH:mm">{doc.date}</Moment>
          </td>
        </tr>
      ));
    } else {
      documentList = (
        <tr>
          <td class="no-line">No Documents Uploaded</td>
        </tr>
      );
    }

    return (
      <div class="col-12">
        <div class="panel panel-default">
          <div class="p-2">
            <h3 class="panel-title font-20">
              <strong>Document summary</strong>
            </h3>
          </div>
          <div class="">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <td>
                      <strong>Name</strong>
                    </td>
                    <td class="text-center">
                      <strong>date</strong>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {documentList}
                  <tr>
                    <td class="no-line" />
                    <td class="no-line text-right">
                      <strong>Total</strong>
                      <h4 class="m-0">${this.props.token.amount}</h4>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="d-print-none mo-mt-2">
              <div class="pull-right">
                <button
                  type="button"
                  onClick={() => {
                    this.setState(prevState => ({
                      cancel: !prevState.cancel
                    }));
                  }}
                  className={`btn btn-${
                    this.state.cancel ? "primary" : "info"
                  } waves-effect waves-light`}
                  data-toggle="modal"
                  data-target=".bs-approval-modal-center"
                >
                  {this.props.token.confirmed ? "Cancel" : "Approve"}{" "}
                  Transaction
                </button>
                <div
                  class="modal fade bs-approval-modal-center"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="mySmallModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title mt-0">
                          {this.props.token.confirmed ? "Cancel" : "Approve"}{" "}
                          Transaction
                        </h5>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-hidden="true"
                        >
                          ×
                        </button>
                      </div>
                      {this.props.token.confirmed ? (
                        <div class="modal-body">
                          <p>
                            Are u sure you want to <strong>Cancel</strong> this
                            transaction?
                          </p>
                        </div>
                      ) : (
                        <div class="modal-body">
                          <p>
                            Are u sure you want to <strong>Approve</strong> this
                            transaction?
                          </p>
                        </div>
                      )}
                    </div>
                    {/* <!-- /.modal-content --> */}
                  </div>
                  {/* <!-- /.modal-dialog --> */}
                </div>
                {/* <!-- /.modal --> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DocumentDetails.propTypes = {};

export default DocumentDetails;
