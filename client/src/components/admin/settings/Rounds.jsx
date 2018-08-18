import React, { Component } from "react";
import TextFieldGroup from "../../common/TextFieldGroup";

class Rounds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      round: "",
      price: "",
      bonus: "",
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

export default Rounds;
