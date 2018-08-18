import React, { Component } from "react";
import TextFieldGroup from "../../common/TextFieldGroup";
import SelectListGroup from "../../common/SelectListGroup";

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "ETH",
      address: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    const { errors } = this.state;

    return (
      <div class="col-md-6">
        <div class="ibox">
          <div class="ibox-head">
            <div class="ibox-title">Company Account Setup</div>
          </div>
          <form class="form-info" onSubmit={this.onSubmit}>
            <div class="ibox-body">
              <TextFieldGroup
                placeholder="* Account Type"
                type="text"
                name="type"
                label="Account Type"
                disabled
                value={this.state.type}
                onChange={this.onChange}
                error={errors.type}
                info="Data format ETH Address"
              />
              <TextFieldGroup
                placeholder="* Account Address"
                type="number"
                name="address"
                label="Account Address No."
                value={this.state.address}
                onChange={this.onChange}
                error={errors.address}
                info="Data format ETH Address"
              />
            </div>
            <div class="ibox-footer">
              {/* <button class="btn btn-primary mr-2" type="submit">

              </button> */}
              <button className="btn btn-primary btn-fix mr-4" type="submit">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Accounts;
