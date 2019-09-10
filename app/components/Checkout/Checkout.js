import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

import SignupForm from './SignupForm';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(e) {
    e.preventDefault();
    var stripeToken = await this.props.stripe.createToken(); // can send this to server for processing


  }

  render() {
    return (
      <div className="checkout container">
        <p>Card Info</p>
        <CardElement />
        <SignupForm submit={this.submit}/>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
