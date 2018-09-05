import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import TextFieldGroup from "../../common/TextFieldGroup";
import { createDistributions } from "../../../actions/settingActions";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import Breadcrumb from "../../common/BreadCrumb";

class Rounds extends Component {
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
      <div className="page-wrapper">
        {/*
<!-- START HEADER-->*/}
        <Header />
        {/*
<!-- END HEADER-->*/}
        <div className="content-wrapper" style={{ minHeight: "100vh" }}>
          {/*
  <!-- START PAGE CONTENT-->*/}
          <Breadcrumb title="Invester Rounds" item="Settings" />
          <div className="page-content fade-in-up">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="ibox">
                  <div className="ibox-head">
                    <div className="ibox-title">Invester Rounds</div>
                  </div>
                  <form className="form-info" onSubmit={this.onSubmit}>
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
                    <div className="ibox-footer">
                      {/* <button className="btn btn-primary mr-2" type="submit">

              </button> */}
                      <button
                        className="btn btn-primary btn-fix mr-4"
                        type="submit"
                      >
                        Save changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Rounds.propTypes = {
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
)(withRouter(Rounds));
