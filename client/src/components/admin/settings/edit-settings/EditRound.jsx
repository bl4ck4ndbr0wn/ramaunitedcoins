import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import TextFieldGroup from "../../../common/TextFieldGroup";
import {
  createDistributions,
  getSettings
} from "../../../../actions/settingActions";
import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import Breadcrumb from "../../../common/BreadCrumb";
import isEmpty from "../../../../validation/is-empty";

class EditRounds extends Component {
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

  componentDidMount() {
    this.props.getSettings();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.setting.settings) {
      const round = nextProps.setting.settings.round;
      const result = round.find(
        round => round._id === this.props.match.params.id
      );
      // If round field doesnt exist, make empty string
      result.round = !isEmpty(result.round) ? result.round : "";
      result.price = !isEmpty(result.price) ? result.price : "";
      result.bonus = !isEmpty(result.bonus) ? result.bonus : "";
      result.isActive = !isEmpty(result.isActive) ? result.isActive : false;

      // Set component fields state
      this.setState({
        round: result.round,
        price: result.price,
        bonus: result.bonus,
        isActive: result.isActive
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
              <div class="col-md-6">
                <div class="ibox">
                  <div class="ibox-head">
                    <div class="ibox-title">Invester Rounds</div>
                  </div>
                  <form class="form-info" onSubmit={this.onSubmit}>
                    <div class="ibox-body">
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
                    <div class="ibox-footer">
                      {/* <button class="btn btn-primary mr-2" type="submit">

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

EditRounds.propTypes = {
  createDistributions: PropTypes.func.isRequired,
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
  { createDistributions, getSettings }
)(withRouter(EditRounds));
