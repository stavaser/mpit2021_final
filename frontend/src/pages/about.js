import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Cards from '../components/cards';
import requests from '../axios/requests';
import smallLOGO from '../images/smallLOGO.png';

import { CheckCircleFilled } from '@ant-design/icons';
import {
  Row,
  Col,
  Divider,
  Button,
  Tooltip,
  Collapse,
  Form,
  Input,
  Select,
  Result,
  Modal,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import {
  PlusCircleOutlined,
  SmileOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
const { Panel } = Collapse;
const Content = styled.div`
  width: 100%;
  padding: 0 5%;
  margin-top: 20px;
`;
const Title = styled.h3`
  margin-bottom: 0;
`;

const MainTitle = styled.h1``;
const Sider = styled.div`
  border-radius: 30px;
  box-shadow: 0px 10px 60px rgba(0, 0, 0, 0.13);
  /* height: 100%; */
  min-width: 350px;
  padding: 20px;
  max-height: 500px;
  overflow-y: scroll;
  .flex {
    display: flex;
    div:first-child {
      background-color: red;
      margin-right: 20px;
    }
    div {
      flex: 1;
    }
  }
`;
const Box = styled.div`
  border-radius: 30px;
  box-shadow: 0px 10px 60px rgba(0, 0, 0, 0.13);
  padding: 20px;
  overflow: hidden;
`;

const About = (props) => {
  const vacancy_id = props.match.params.vacancy_id;
  const [data, setData] = useState([]);
  const [skills, setSkills] = useState([]);
  const [visible, setVisible] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    requests.materials
      .get_vacancy_id({ vacancy_id })
      .then(({ data }) => {
        console.log(data);
        setData(data);
      })
      .catch((e) => console.log(e));

    requests.materials
      .get_matching_skills({ vacancy_id })
      .then(({ data }) => {
        setSkills(data.result);
        console.log(data);
      })
      .catch((e) => console.log(e));
  }, []);

  const onFinish = (values) => {
    console.log(values);
    requests.materials
      .post_vacancy_request({ vacancy_id, ...values })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          setResultVisible(true);
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <>
      <Modal
        title="Подать заявку на вакансию"
        onCancel={() => setVisible(false)}
        visible={visible}
        footer={!resultVisible && null}
        width="800px"
      >
        {resultVisible ? (
          <Result
            icon={<SmileOutlined />}
            title="Заявка успешно подана!"
            extra={
              <Button onClick={() => window.location.reload(false)}>Ок</Button>
            }
          />
        ) : (
          <Form
            size="large"
            name="video"
            layout="vertical"
            initialValues={{ name: localStorage.getItem('username') }}
            onFinish={onFinish}
          >
            <Form.Item disabled label="Имя" name="name">
              <Input />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Данное поле не может быть пустым',
                },
              ]}
              label="Номер телефона"
              name="phone"
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Отправить
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Content>
          <MainTitle>{data.title}</MainTitle>
          <Row
            gutter={[
              { xs: 12, sm: 16, md: 24, lg: 36 },
              { xs: 24, sm: 16, md: 24, lg: 36 },
            ]}
          >
            <Col
              xs={{ span: 24, order: 2 }}
              sm={{ span: 24, order: 2 }}
              md={{ span: 24, order: 2 }}
              lg={{ span: 8, order: 1 }}
              xl={{ span: 8, order: 1 }}
            >
              <Row
                gutter={[
                  { xs: 12, sm: 16, md: 24, lg: 36 },
                  { xs: 24, sm: 16, md: 24, lg: 36 },
                ]}
              >
                <Col span={24}>
                  <Sider>
                    <div className="flex">
                      <div>
                        <img src={smallLOGO} style={{ width: '100%' }} />
                      </div>
                      <div>
                        <h2>{data.organization}</h2>
                        <p>Зарптата: {data.salary}</p>
                        <p>График: {data.schedule}</p>
                        <Button
                          block
                          type="primary"
                          onClick={() => setVisible(true)}
                        >
                          Подать заявку
                        </Button>
                      </div>
                    </div>
                  </Sider>
                </Col>
                <Col span={24}>
                  <Box>
                    <Title>Требуемые скиллы</Title>
                    <Divider />
                    <Collapse defaultActiveKey={['1']}>
                      {data.reqs &&
                        data.reqs.map((item, index) => {
                          return (
                            <Panel
                              extra={
                                skills.includes(item.skill) ? (
                                  <CheckCircleFilled
                                    style={{ color: '#17AD49' }}
                                  />
                                ) : (
                                  false
                                )
                              }
                              header={item.skill}
                              key={'' + index}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <div>{item.description}</div>
                                <div>
                                  {!skills.includes(item.skill) && (
                                    <a href={'/courses/' + item.skill}>
                                      Найти курсы
                                    </a>
                                  )}
                                </div>
                              </div>
                            </Panel>
                          );
                        })}
                    </Collapse>
                  </Box>
                </Col>
              </Row>
            </Col>
            <Col
              xs={{ span: 24, order: 1 }}
              sm={{ span: 24, order: 1 }}
              md={{ span: 24, order: 1 }}
              lg={{ span: 16, order: 2 }}
              xl={{ span: 16, order: 2 }}
            >
              <Row
                gutter={[
                  { xs: 12, sm: 16, md: 24, lg: 36 },
                  { xs: 24, sm: 16, md: 24, lg: 36 },
                ]}
              >
                <Col span={24}>
                  <Box>
                    <Title>Детали</Title>
                    <Divider />
                    <h3>Обязанности:</h3>
                    <ul>
                      {data.job_info &&
                        data.job_info.list_1.map((item) => {
                          return <li>{item}</li>;
                        })}
                    </ul>
                    <h3>Требования:</h3>
                    <ul>
                      {data.job_info &&
                        data.job_info.list_2.map((item) => {
                          return <li>{item}</li>;
                        })}
                    </ul>
                    <h3>Условия:</h3>
                    <ul>
                      {data.job_info &&
                        data.job_info.list_3.map((item) => {
                          return <li>{item}</li>;
                        })}
                    </ul>
                  </Box>
                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
      </div>
    </>
  );
};

export default About;
