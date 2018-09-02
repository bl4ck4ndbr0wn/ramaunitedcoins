import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import TextFieldGroup from "../../common/TextFieldGroup";
import { createDistributions } from "../../../actions/admin/settingAction";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import Breadcrumb from "../../common/BreadCrumb";
import PageContent from "../../layout/PageContent";

class PhaseVolume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      round: "",
      price: "",
      bonus: "",
      isActive: false,
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
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }
  onSubmit(e) {
    e.preventDefault();
    const distributionsData = {
      round: this.state.round,
      price: this.state.price,
      bonus: this.state.bonus,
      isActive: this.state.isActive
    };
    this.props.createDistributions(distributionsData, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <PageContent>
        <div class="row">
          <div class="col-sm-12">
            <div class="page-title-box">
              <div class="btn-group pull-right">
                <ol class="breadcrumb hide-phone p-0 m-0">
                  <li class="breadcrumb-item">
                    <a href="#">Admin</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="#">Settings</a>
                  </li>
                  <li class="breadcrumb-item active">Create Phase & Volume</li>
                </ol>
              </div>
              <h4 class="page-title">Create Phase & Volume</h4>
            </div>
          </div>
        </div>
        {/* <!-- end page title end breadcrumb --> */}

        <div class="row justify-content-md-center">
          <div class="col-8">
            <div class="card m-b-30">
              <div class="card-body">
                <h4 class="mt-0 header-title">New Investor Round</h4>

                <form class="" onSubmit={this.onSubmit}>
                  <div className="ibox-body">
                    <TextFieldGroup
                      placeholder="* Round No"
                      type="number"
                      name="round"
                      label="Invester Round"
                      value={this.state.round}
                      onChange={this.onChange}
                      error={errors.round}
                      info="Data format 1"
                    />
                    <TextFieldGroup
                      placeholder="* Price in $"
                      type="number"
                      name="price"
                      label="Price per Coin"
                      value={this.state.price}
                      onChange={this.onChange}
                      error={errors.price}
                      info="Data format $99.99"
                    />
                    <TextFieldGroup
                      placeholder="* Bonus in %"
                      type="number"
                      name="bonus"
                      label="Bonus"
                      value={this.state.bonus}
                      onChange={this.onChange}
                      error={errors.bonus}
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
                        Make Round as Active.
                      </small>
                    </div>
                  </div>
                  <div className="form-group text-center row m-t-20">
                    <div className="col-12">
                      <button
                        className="btn btn-info btn-block waves-effect waves-light"
                        type="submit"
                      >
                        Create Investor Round
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

PhaseVolume.propTypes = {
  createDistributions: PropTypes.func.isRequired,
  setting: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  setting: state.setting,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createDistributions }
)(withRouter(PhaseVolume));
