import React, { useState } from 'react';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http:///localhost:8000/api/',
  headers: {
    Authorization: 'Token ' + window.localStorage.getItem('token'),
    // 'Content-Type': 'application/json',
  },
});
export default {
  accounts: {
    login(request) {
      return apiClient.post(`accounts/token/login/`, request);
    },
    logout(request) {
      return apiClient.get(`accounts/token/logout/`, request);
    },
    get_user(request) {
      return apiClient.get(`accounts/users/me/`, request);
    },
  },
};
