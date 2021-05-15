import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import requests from '../../axios/requests';
import {
  Row,
  Col,
  Divider,
  Button,
  Tooltip,
  Collapse,
  message,
  Table,
  Space,
  Popconfirm,
} from 'antd';

const { Panel } = Collapse;
const { Column, ColumnGroup } = Table;
const Content = styled.div`
  width: 100%;
  padding: 0 5%;
  margin-top: 20px;
  margin-bottom: 50px;
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
  const [tags, setTags] = useState([]);
  const [job_requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    requests.materials
      .get_vacancy_id({ vacancy_id })
      .then(({ data }) => {
        console.log(data);
        setData(data);
      })
      .catch((e) => console.log(e));

    requests.organization
      .get_vacancy_requests({ vacancy_id })
      .then(({ data }) => {
        console.log(data);
        setRequests(data.result);
      })
      .catch((e) => console.log(e));
  }, []);
  console.log(data);
  const getTagName = (id) => {
    {
      return tags.filter((x) => x.id === id).map((x) => x.name);
    }
  };

  const confirm_delete = (e) => {
    console.log(e);
    message.success('Click on Yes');
  };
  const confirm_add = (phone, quest_id) => {
    console.log('quest_id', quest_id);
    console.log('phone', phone);

    requests.quests
      .edit_member({ quest_id, phone, action: 'add' })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          window.location.reload(false);
        }
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <>
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
                      <div></div>
                      <div>
                        <h2>{data.organization}</h2>
                        <p>{data.salary}</p>
                        <p>{data.schedule}</p>
                        <Button block type="primary">
                          Редактировать
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
                            <Panel header={item.skill} key={'' + index}>
                              <Tooltip title="Найти курсы">
                                {item.description}
                              </Tooltip>
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
                  <Row
                    gutter={[
                      { xs: 12, sm: 16, md: 24, lg: 36 },
                      { xs: 24, sm: 16, md: 24, lg: 36 },
                    ]}
                  >
                    <Col span={24}>
                      <Box>
                        <Title>Входящие заявки</Title>
                        <Divider />
                        <Table
                          dataSource={job_requests}
                          locale={{
                            emptyText: 'Нет новых заявок',
                          }}
                        >
                          <Column title="Имя" dataIndex="name" key="name" />

                          <Column
                            title="Профиль"
                            dataIndex="user_id"
                            key="profile"
                            render={(user_id) => (
                              <a href={'/see_profile/' + user_id}>Посмотреть</a>
                            )}
                          />
                          <Column title="Номер" dataIndex="phone" key="phone" />
                          <Column title="Дата" dataIndex="date" key="date" />

                          <Column
                            title="Действие"
                            key="action"
                            dataIndex="phone"
                            render={() => <a>Позвонить</a>}
                          />
                        </Table>
                      </Box>
                    </Col>
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
            </Col>
          </Row>
        </Content>
      </div>
    </>
  );
};

export default About;
