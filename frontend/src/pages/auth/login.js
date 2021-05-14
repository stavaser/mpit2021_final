import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';

import {
  Row,
  Col,
  Carousel,
  Modal,
  Form,
  Input,
  Button,
  Radio,
  Select,
} from 'antd';

import { InfoCircleOutlined } from '@ant-design/icons';
import requests from '../..//axios/requests';
const { Option } = Select;
const { TextArea } = Input;

const Content = styled.div`
  width: 100%;
  padding: 0 5%;
  margin-top: 50px;
`;

const Box = styled.div`
  box-shadow: 20px 20px 100px rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  align-content: center;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: center;
`;
const Login = (props) => {
  const history = useHistory();

  const [finished, setFinished] = useState(false);
  const [points, setPoints] = useState(0);
  const [error, setError] = useState();
  const onFinish = (values) => {
    console.log(values);
    requests.accounts
      .login(values)
      .then(({ data }) => {
        console.log(data);
        window.localStorage.setItem('token', data.auth_token);
        window.localStorage.setItem('username', values.username);
        history.push('/');
      })
      .catch((e) => setError('Неправильный логин или пароль'));
  };

  return (
    <>
      <Content>
        <Row
          justify="space-around"
          align="middle"
          gutter={[
            { xs: 12, sm: 16, md: 24, lg: 36 },
            { xs: 24, sm: 16, md: 24, lg: 36 },
          ]}
        >
          <Col xs={24} sm={24} md={12} lg={10} xxl={10} xxxl={10}>
            <Box>
              <h2>Логин</h2>
              <Form
                name="normal_login"
                layout="vertical"
                initialValues={{ remember: true }}
                size="large"
                onFinish={onFinish}
              >
                <Form.Item
                  label="Логин (без пробелов)"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Это поле обязательно',
                    },
                  ]}
                  tooltip="Без пробелов"
                >
                  <Input placeholder="Логин" />
                </Form.Item>
                <Form.Item
                  label="Пароль"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Это поле обязательно',
                    },
                  ]}
                  tooltip="Это поле обязательно"
                >
                  <Input.Password placeholder="Пароль" />
                </Form.Item>
                <p style={{ color: 'red' }}>{error}</p>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Отправить
                  </Button>
                </Form.Item>
              </Form>
              <Link
                to={{
                  pathname: `/Auth`,
                }}
              >
                Зарегистрироваться
              </Link>
            </Box>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default Login;
