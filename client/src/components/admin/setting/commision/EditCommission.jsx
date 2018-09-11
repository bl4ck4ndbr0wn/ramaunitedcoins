import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import {
  createCommissions,
  getSettings
} from "../../../../actions/admin/settingAction";

import TextFieldGroup from "../../../common/TextFieldGroup";
import SelectListGroup from "../../../common/SelectListGroup";
import PageContent from "../../../layout/PageContent";
import isEmpty from "../../../../validation/is-empty";

class EditCommission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      percentage: "",
      isActive: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getSettings();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.setting.settings) {
      const commission = nextProps.setting.settings.commission;
      const result = commission.find(
        commission => commission._id === this.props.match.params.id
      );

      // If account field doesnt exist, make empty string
      result.percentage = !isEmpty(result.percentage) ? result.percentage : "";
      result.type = !isEmpty(result.type) ? result.type : "";
      result.isActive = !isEmpty(result.isActive) ? result.isActive : false;

      // Set component fields state
      this.setState({
        type: result.type,
        percentage: result.percentage,
        isActive: result.isActive
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const commissionData = {
      type: this.state.type,
      percentage: this.state.percentage,
      isActive: this.state.isActive
    };
    this.props.createCommissions(commissionData, this.props.history);
  }

  render() {
    const { errors } = this.state;

    // Select options for status
    const options = [
      { label: "* Select Commission Type", value: 0, icon: "ti-wallet" },
      { label: "RUC", value: "RUC", icon: "ti-wallet" },
      { label: "RCC", value: "RCC", icon: "ti-wallet" }
    ];

    return (
      <PageContent>
        {/* <!-- Page-Title --> */}
        <div className="row">
          <div className="col-sm-12">
            <div className="page-title-box">
              <div className="btn-group pull-right">
                <ol className="breadcrumb hide-phone p-0 m-0">
                  <li className="breadcrumb-item">
                    <a href="#">Admin</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Settings</a>
                  </li>
                  <li className="breadcrumb-item active">
                    Edit Referral Commission
                  </li>
                </ol>
              </div>
              <h4 className="page-title">Edit Referral Commission</h4>
            </div>
          </div>
        </div>
        {/* <!-- end page title end breadcrumb --> */}
        <div className="row justify-content-md-center">
          <div className="col-8">
            <div className="card m-b-30">
              <div className="card-body">
                <h4 className="mt-0 header-title">Edit Referral Commission</h4>

                <form className="" onSubmit={this.onSubmit}>
                  <div className="ibox-body">
                    <SelectListGroup
                      placeholder="Select Payment Method"
                      name="type"
                      value={this.state.type}
                      onChange={this.onChange}
                      options={options}
                      error={errors.type}
                      info="Company Address"
                    />
                    <TextFieldGroup
                      placeholder="* Commission Percentage"
                      type="number"
                      name="percentage"
                      label="Commission Percentage"
                      value={this.state.percentage}
                      onChange={this.onChange}
                      error={errors.percentage}
                      info="Data format 99.99%"
                    />
                    <div className="form-group">
                      <input
                        type="checkbox"
                        name="isActive"
                        onClick={() => {
                          this.setState(prevState => ({
                            isActive: !prevState.isActive
                          }));
                        }}
                      />

                      <small className="form-text text-muted">
                        Make Default System Commission.
                      </small>
                    </div>
                  </div>
                  <div className="form-group text-center row m-t-20">
                    <div className="col-12">
                      <button
                        className="btn btn-info btn-block waves-effect waves-light"
                        type="submit"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </PageContent>
    );
  }
}

EditCommission.propTypes = {
  createCommissions: PropTypes.func.isRequired,
  getSettings: PropTypes.func.isRequired,
  setting: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  setting: state.setting,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createCommissions, getSettings }
)(EditCommission);
