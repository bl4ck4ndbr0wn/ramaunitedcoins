import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Link } from "react-router-dom";

import visa from "../../../assets/img/logos/payment/visa.png";
import ltc from "../../../assets/img/logos/payment/LTC.png";
import btc from "../../../assets/img/logos/payment/btc.png";
import eth from "../../../assets/img/logos/payment/Ethereum.png";
import Spinner from "../../common/Spinner";

class DocumentList extends Component {
  render() {
    const { token } = this.props;
    let doc;

    console.log(token);

    if (Object.keys(token.document).length > 0) {
      doc = token.document.map(doc => (
        <tr key={doc._id}>
          <td>{doc.originalname}</td>
          <td>
            <img className="mr-3" src={doc.path} alt="image" width="60" />
          </td>
          <td>
            <Moment format="YYYY/MM/DD">{doc.date}</Moment>
          </td>
        </tr>
      ));
    } else {
      doc = (
        <div className="m-4">
          No Documents Uploaded.
          <p>
            To upload anew Document click.
            <Link to={`/document/${token._id}`} className="btn btn-info">
              Upload Documents
            </Link>
          </p>
        </div>
      );
    }
    return (
      <div className="ibox">
        <div className="ibox-body">
          <h5 className="font-strong mb-5">Document List</h5>
          <table className="table table-bordered table-hover">
            <thead className="thead-default thead-lg">
              <tr>
                <th>Filename</th>
                <th>Image</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>{doc}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

DocumentList.propTypes = {
  token: PropTypes.object.isRequired
};
export default DocumentList;
