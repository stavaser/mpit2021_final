import React, { useState } from 'react';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  // baseURL: 'http:///0.0.0.0/api/',
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
    get_user_profile(request) {
      return apiClient.post(`request/get_user_profile`, request);
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
    get_org_courses(request) {
      return apiClient.post(`request/get_org_courses`, request);
    },
    post_course(request) {
      return apiClient.post(`request/post_course`, request);
    },
    get_vacancy_requests(request) {
      return apiClient.post(`request/get_vacancy_requests`, request);
    },
  },
  materials: {
    get_vacancies(request) {
      return apiClient.post(`request/get_vacancies`, request);
    },
    get_vacancy_id(request) {
      return apiClient.post(`request/get_vacancy_id`, request);
    },
    get_course_media(request) {
      return apiClient.post(`request/get_course_media`, request);
    },
    get_courses(request) {
      return apiClient.post(`request/get_courses`, request);
    },
    get_courses_by_skill(request) {
      return apiClient.post(`request/get_courses_by_skill`, request);
    },
    get_course_skills(request) {
      return apiClient.post(`request/get_course_skills`, request);
    },
    post_finished(request) {
      return apiClient.post(`request/post_finished`, request);
    },
    get_finished_courses(request) {
      return apiClient.post(`request/get_finished_courses`, request);
    },
    get_matching_skills(request) {
      return apiClient.post(`request/get_matching_skills`, request);
    },
    post_vacancy_request(request) {
      return apiClient.post(`request/post_vacancy_request`, request);
    },
    post_user_skill(request) {
      return apiClient.post(`request/post_user_skill`, request);
    },
  },
};
