import React, { Component, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../Services/UserContext'
import api from '../../Services/sigproj/api';

/* eslint-disable react/require-render-return */
// eslint-disable-next-line react/prefer-stateless-function
function OAuth2RedirectHandler() {
    const { userLoginGoogle } = useContext(UserContext);
    let history = useHistory();
    const param = window.location.search;
    if (param.slice(0,7) === '?token=') {
        const token = param.replace('?token=', '');
        userLoginGoogle(token)
    } else {
        history.push('/login');
    }
    return null;
}

export default OAuth2RedirectHandler;