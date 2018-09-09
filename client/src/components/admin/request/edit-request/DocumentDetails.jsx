import React from "react";
import Moment from "react-moment";

export default ({ token }) => {
  let documentList;
  if (Object.keys(token.document).length > 0) {
    documentList = token.document.map(doc => (
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
                    <h4 class="m-0">${token.amount}</h4>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="d-print-none mo-mt-2">
            <div class="pull-right">
              <a
                href="javascript:window.print()"
                class="btn btn-success waves-effect waves-light"
              >
                <i class="fa fa-print" />
              </a>
              <a href="#" class="btn btn-primary waves-effect waves-light">
                Send
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
