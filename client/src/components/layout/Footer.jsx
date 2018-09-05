import React from "react";

export default () => {
  return (
    <footer className="page-footer">
      <div className="font-13">
        Copyright &copy; {new Date().getFullYear()}
        <b> Rama United Coin.</b>
      </div>
      <div>
        {/* <a className="px-3 pl-4" href="" target="_blank">
          Purchase KYC
        </a> */}
        {/* <a className="px-3" href="" target="_blank">
          Docs
        </a> */}
      </div>
      <div className="to-top">
        <i className="fa fa-angle-double-up" />
      </div>
    </footer>
  );
};
