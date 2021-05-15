import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import SkillsChart from '../components/skillsChart';
import requests from '../axios/requests';
import pfp from '../images/pfp.png';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
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
const Resume = styled.div``;
const Profile = (props) => {
  const container = React.useRef(null);
  const pdfExportComponent = React.useRef(null);

  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };
  const vacancy_id = props.match.params.vacancy_id;
  const [data, setData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [tags, setTags] = useState([]);
  const [profile, setProfile] = useState(true);
  useEffect(() => {
    // requests.materials
    //   .get_vacancy_id({ vacancy_id })
    //   .then(({ data }) => {
    //     console.log(data);
    //     setData(data);
    //   })
    //   .catch((e) => console.log(e));

    requests.materials
      .get_finished_courses({})
      .then(({ data }) => {
        console.log(data.result);
        setCourses(data.result);
      })
      .catch((e) => console.log(e));

    requests.accounts
      .get_user_profile({})
      .then(({ data }) => {
        console.log(data);
        setProfile(data);
      })
      .catch((e) => console.log(e));
  }, []);
  console.log(data);

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
                      <div>
                        <img src={pfp} style={{ width: '100%' }} />
                      </div>
                      <div>
                        <h2>
                          {profile.name} {profile.last_name}
                        </h2>
                        <Button block type="primary">
                          Редактировать
                        </Button>
                      </div>
                    </div>
                  </Sider>
                </Col>
                <Col span={24}>
                  <Box>
                    <Title>Ваши скиллы</Title>
                    <Divider />
                    <SkillsChart />
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
                        <Title>Портфолио</Title>
                        <Divider />
                        <Button onClick={exportPDFWithComponent}>
                          Скачать
                        </Button>
                        <PDFExport
                          ref={pdfExportComponent}
                          paperSize="auto"
                          margin={40}
                          fileName={`Резюме для ${new Date().getFullYear()}`}
                          author="Connect IT"
                        >
                          <Resume ref={container}>
                            <h3 className="text-center">Monthly report</h3>
                          </Resume>
                        </PDFExport>
                      </Box>
                    </Col>
                    <Col span={24}>
                      <Box>
                        <Title>Отправленные заявки</Title>
                        <Divider />
                        <Table
                          //  dataSource={request.result}
                          locale={{
                            emptyText: 'Нет новых заявок',
                          }}
                        >
                          <Column title="Имя" dataIndex="username" key="name" />
                          <Column title="Номер" dataIndex="phone" key="phone" />
                          <Column
                            title="Дата"
                            dataIndex="add_date"
                            key="add_date"
                          />

                          <Column
                            title="Резюме"
                            dataIndex="title"
                            key="title"
                          />
                        </Table>
                      </Box>
                    </Col>
                    <Col span={24}>
                      <Box>
                        <Title>Пройденные курсы</Title>
                        <Divider />
                        {courses.length > 0 ? (
                          <Collapse>
                            {courses.map((item, index) => {
                              return (
                                <Panel
                                  header={
                                    <a href={`/courses/info/` + item.course_id}>
                                      {item.title}
                                    </a>
                                  }
                                  key={'' + index}
                                >
                                  {item.description}
                                </Panel>
                              );
                            })}
                          </Collapse>
                        ) : (
                          <div>
                            Вы еще не прошли ни одного курса.{' '}
                            <a href="/courses"> Пройдите сейчас</a>
                          </div>
                        )}
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

export default Profile;
