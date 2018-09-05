import React from "react";
import PropTypes from "prop-types";

const Breadcrumb = ({ title, item }) => {
  return (
    <div className="page-heading">
      <h1 className="page-title">{title}</h1>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="index.html">
            <i className="la la-home font-20" />
          </a>
        </li>
        <li className="breadcrumb-item">{item}</li>
        <li className="breadcrumb-item">{title}</li>
      </ol>
    </div>
  );
};

Breadcrumb.propTypes = {
  title: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired
};

export default Breadcrumb;
