import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { confrimRequest } from "../../../../actions/admin/requestAction";

class DocumentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cancel: false
    };
  }

  onConfirm(id) {
    this.props.confrimRequest(id);
  }

  render() {
    const { token } = this.props;

    let documentList;
    if (Object.keys(token.document).length > 0) {
      documentList = token.document.map(doc => (
        <tr key={doc._id}>
          <td>{doc.originalname}</td>
          <td className="text-center">
            <Moment format="YYYY/MMM/DD HH:mm">{doc.date}</Moment>
          </td>
          <td>
            <Link to={doc.path} download={doc.originalname}>
              Click to download
            </Link>
          </td>
        </tr>
      ));
    } else {
      documentList = (
        <tr>
          <td className="no-line">No Documents Uploaded</td>
        </tr>
      );
    }

    return (
      <div className="col-12">
        <div className="panel panel-default">
          <div className="p-2">
            <h3 className="panel-title font-20">
              <strong>Document summary</strong>
            </h3>
          </div>
          <div className="">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <td>
                      <strong>Name</strong>
                    </td>
                    <td className="text-center">
                      <strong>date</strong>
                    </td>
                    <td />
                  </tr>
                </thead>
                <tbody>
                  {documentList}
                  <tr>
                    <td className="no-line" /> <td />
                    <td className="no-line text-right">
                      <strong>Total</strong>
                      <h4 className="m-0">
                        {token.modetransfer === "Bank"
                          ? `${token.modetransfer} ${token.amount}`
                          : `${token.amount}  ${token.modetransfer}`}
                      </h4>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="d-print-none mo-mt-2">
              <div className="pull-right">
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
                  {token.confirmed ? "Cancel" : "Approve"} Transaction
                </button>
                <div
                  className="modal fade bs-approval-modal-center"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="mySmallModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title mt-0">
                          {token.confirmed ? "Cancel" : "Approve"} Transaction
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-hidden="true"
                        >
                          ×
                        </button>
                      </div>
                      {token.confirmed ? (
                        <div className="modal-body">
                          <p>
                            Are u sure you want to <strong>Cancel</strong> this
                            transaction?
                          </p>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-hidden="true"
                            onClick={this.onConfirm.bind(this, token._id)}
                          >
                            Approve Payment
                          </button>
                        </div>
                      ) : (
                        <div className="modal-body">
                          <p>
                            Are u sure you want to <strong>Approve</strong> this
                            transaction?
                          </p>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-hidden="true"
                            onClick={this.onConfirm.bind(this, token._id)}
                          >
                            Approve Payment
                          </button>
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

DocumentDetails.propTypes = {
  confrimRequest: PropTypes.func.isRequired,
  token: PropTypes.object.isRequired
};

export default connect(
  null,
  { confrimRequest }
)(DocumentDetails);
