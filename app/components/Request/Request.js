import React from 'react';

import axios from 'axios';

import './Request.css';

export default ({changeToLandingPage}) => {
    return (
        <div className="requestForm">
            <h1>Bug/Feature Request Page</h1>

            <div className="alert alert-danger">Failed to submit request, please try again.</div>

            <form onSubmit={(e) => submitRequest(e, changeToLandingPage)}>
                <select name='category'>
                    <option defaultValue value="Bug">Bug</option>
                    <option value="Feature">Feature</option>
                    <option value="Other">Other</option>
                </select>

                <h3>Description:</h3>
                <textarea name='content' cols="100"></textarea>
                <br />

                <button className="btn btn-lg action-btn">Submit</button>
            </form>
        </div>
    )
}

function submitRequest(e, redirect) {
    e.preventDefault();

    var category = e.target.category.value;
    var content = e.target.content.value;

    axios.post('/api/request', {category, content})
        .then(() => {
            redirect();
        })
        .catch(err => {
            $('.requestForm .alert-danger').css('display', 'inline-block');
        })
}