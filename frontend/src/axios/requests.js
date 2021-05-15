import React, { useState } from 'react';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http:///localhost:8000/api/',
  headers: {
    Authorization: window.localStorage.getItem('token'),
    // 'Content-Type': 'application/json',
  },
});
export default {
  accounts: {
    login(request) {
      return apiClient.post(`request/user_login`, request);
    },
    logout(request) {
      return apiClient.get(`accounts/token/logout/`, request);
    },
    user_register(request) {
      return apiClient.post(`request/user_register`, request);
    },
    get_user(request) {
      return apiClient.get(`accounts/users/me/`, request);
    },
  },
  organization: {
    org_register(request) {
      return apiClient.post(`request/org_register`, request);
    },

    post_vacancy(request) {
      return apiClient.post(`request/post_vacancies`, request);
    },
    get_org_vacancies(request) {
      return apiClient.post(`request/get_org_vacancies`, request);
    },
  },
  materials: {
    get_vacancies(request) {
      return apiClient.post(`request/get_vacancies`, request);
    },
    get_vacancy_id(request) {
      return apiClient.post(`request/get_vacancy_id`, request);
    },
  },
};
