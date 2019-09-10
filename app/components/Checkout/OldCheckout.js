import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

export default class Checkout extends Component {

    constructor(props) {
        super(props);

        this.onToken = this.onToken.bind(this);
    }

    componentDidMount() {

    }

    onToken(token) {
        console.log('onToken called: ', token);
    }

    render() {

        return (
            <div>
                <StripeCheckout
                    token={this.onToken}
                    stripeKey="pk_test_IBu0cg59EaOvKu5y4QviGcgH00E22CzB36"
                />


            </div>
        )
    }
}