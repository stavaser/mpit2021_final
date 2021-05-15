import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import requests from '../axios/requests';
import ReactPlayer from 'react-player';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import {
  Steps,
  message,
  Popover,
  Radio,
  Row,
  Col,
  Button,
  Progress,
  Divider,
  Result,
  Collapse,
} from 'antd';
import {
  PlusCircleOutlined,
  SmileOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';

const { Step } = Steps;

const { Panel } = Collapse;
const Content = styled.div`
  width: 100%;
  padding: 0 5%;
  margin-top: 20px;
`;

const StyledSteps = styled.div`
  padding: 20px 0;
  display: flex;
`;
const Box = styled.div`
  border-radius: 30px;
  box-shadow: 0px 10px 60px rgba(0, 0, 0, 0.13);
  padding: 20px;
  overflow: hidden;
`;

const Choices = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  margin: 20px 0;
  li:last-child {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 100px;
  }
`;

const MainTitle = styled.h1``;
const SecondaryTitle = styled.h3``;

const RadioGroup = styled.div`
  .ant-radio-button-wrapper:first-child:last-child {
    border-radius: 50px;
  }
  .ant-col-24 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    width: 700px;
    padding-bottom: 20px;
  }

  h3.quiz-option {
    width: 700px;
    position: absolute;
    top: 0;
    left: 60px;
    font-weight: 400;
  }
`;

const CourseMaterial = (props) => {
  const course_id = props.match.params.course_id;
  //   const { courses, title, stage_theory_id } = params;
  const courses = [
    {
      title: 'e',
      link: 'w',
    },
    {
      title: 'e2',
      link: 'w2',
    },
  ];
  console.log(courses[0].title);
  const [answerId, setAnswerId] = useState(null);
  const [last, setLast] = useState(false);
  const [result, setResult] = useState(false);
  const [active, setActive] = useState(0);
  const [answers, setAnswers] = useState([]);

  const history = useHistory();
  const [answered, setAnswered] = useState(false);
  const [data, setData] = useState([]);

  const next = () => {
    setAnswered(false);

    setActive(active + 1);
    if (active == courses.length - 1) {
      finish();
    }
  };

  const finish = () => {
    setLast(true);
    message.success('все!');
    requests.materials
      .post_finished({ course_id })
      .catch((e) => console.log(e));
  };

  const answer = () => {
    setAnswered(true);
  };

  const results = (
    <>
      <Result
        icon={<SmileOutlined />}
        title="Вы прошли этот курс!"
        extra={
          <Button onClick={() => history.push('/courses')}>
            Вернуться на главную
          </Button>
        }
      />
    </>
  );
  const labels = ['A', 'B', 'C', 'D', 'E'];
  return (
    <React.Fragment>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Content>
          <Row
            gutter={[
              { xs: 12, sm: 16, md: 24, lg: 36 },
              { xs: 24, sm: 16, md: 24, lg: 36 },
            ]}
          >
            <Col span={24}>
              <div className="steps-content">
                {last ? (
                  results
                ) : (
                  <>
                    <Row gutter={[16, 16]}>
                      <Col span={24}>
                        <Box>
                          <SecondaryTitle>
                            weqweqw {courses[active].title}
                          </SecondaryTitle>

                          <ReactPlayer
                            controls={true}
                            width="100%"
                            style={{ margin: '20px 0' }}
                            url={'https://www.youtube.com/watch?v='}
                          />
                          <Divider orientation="left">Описание</Divider>
                          <span>{courses[active].title}</span>
                        </Box>
                      </Col>
                    </Row>
                  </>
                )}
              </div>
            </Col>
            <Col span={24}>
              <StyledSteps>
                <Steps
                  style={{ alignSelf: 'center', marginRight: '20px' }}
                  current={active}
                >
                  {courses.map((quesion, index) => (
                    <Step key={index} />
                  ))}
                </Steps>
                <div className="steps-action">
                  <Button type="primary" size="large" onClick={() => next()}>
                    {last ? 'Дальше' : 'Дальше'}
                  </Button>
                </div>
              </StyledSteps>
            </Col>
          </Row>
        </Content>
      </div>
    </React.Fragment>
  );
};

export default CourseMaterial;
