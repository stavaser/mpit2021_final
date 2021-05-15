import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Cards from '../components/cards';
import requests from '../axios/requests';
import { Row, Col, Divider, Button, Tooltip } from 'antd';
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
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    requests.materials
      .get_vacancy_id({ vacancy_id })
      .then(({ data }) => {
        console.log(data);
        setData(data);
      })
      .catch((e) => console.log(e));
  }, []);
  console.log(data);
  const getTagName = (id) => {
    {
      return tags.filter((x) => x.id === id).map((x) => x.name);
    }
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
                        <p>asasd</p>
                        <p>asdasd</p>
                        <Button block type="primary">
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
                    {data.reqs &&
                      data.reqs.map((item) => {
                        return (
                          <Tooltip title="Найти курсы">
                            <Button
                              size="small"
                              style={{ marginRight: '10px' }}
                              type="dashed"
                            >
                              {item.skill}
                            </Button>
                          </Tooltip>
                        );
                      })}
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
