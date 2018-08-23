import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectListGroup = ({ name, value, error, info, onChange, options }) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      <i className={option.icon} />
      {option.label}
    </option>
  ));
  return (
    <div
      className={classnames("form-group mb-4", {
        "has-error": error
      })}
    >
      <select
        className={classnames("form-control", {
          "is-invalid": error
        })}
        tabIndex="-98"
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {/* <select
        className="selectpicker form-control"
        data-selected-text-format="count"
        tabIndex="-98"
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select> */}
      {info && <small className="form-text text-muted">{info}</small>}
      {error && (
        <label className="help-block" for={name}>
          {error}
        </label>
      )}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
