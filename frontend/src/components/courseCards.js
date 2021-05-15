import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Col, Button, Divider, Tooltip, Progress } from 'antd';
import course_image from '../images/course_image.png';

const Card = styled.div`
  position: relative;
  box-shadow: 0px 10px 57px rgba(0, 0, 0, 0.1);
  border-radius: 27px;
  color: #b4b9ca;
  height: 380px;
  width: 350px;
  overflow: hidden;
  padding: 20px;
  text-align: center;
  h2,
  p {
    margin: 0;
  }
  img {
    width: 100%;
  }
`;
const Radius = styled.span`
  .ant-btn {
    border-radius: 0;
  }
`;
const CourseCards = (params) => {
  const { id, reqs, title, org, desc, finished, skills } = params;
  console.log('skills', skills);

  return (
    <React.Fragment>
      <Col xs={24} sm={24} md={12} lg={8} xxl={6} xxxl={6}>
        <Card>
          <h3>{org}</h3>
          <Divider style={{ margin: 0, marginTop: '10px' }} />
          <Link
            style={{ position: 'absolute', top: '50px', padding: '10px' }}
            to={{ pathname: 'courses/info/' + id }}
          >
            <h2
              style={{
                color: '#7879F1',
              }}
            >
              {title}
            </h2>
          </Link>
          <img src={course_image} />
          {skills &&
            skills.map((item) => {
              return (
                <Button
                  size="small"
                  style={{
                    marginRight: '10px',
                    marginTop: '20px',
                  }}
                >
                  {item}
                </Button>
              );
            })}

          <Divider />
          {finished ? (
            <Progress percent={100} />
          ) : (
            <Link to={{ pathname: 'courses/info/' + id }}>
              <Button type="primary" block>
                Пройти
              </Button>
            </Link>
          )}
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default CourseCards;
