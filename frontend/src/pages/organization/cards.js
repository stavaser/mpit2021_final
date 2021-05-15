import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Col, Button, Divider, Tooltip } from 'antd';

import {
  CalendarOutlined,
  UsergroupAddOutlined,
  StarFilled,
} from '@ant-design/icons';
const StyledRibbon = styled.div`
  .ant-ribbon {
    top: 20px;
    right: 20px;
    border-radius: 30px;
    height: 35px;
    padding: 7px 12px;
  }

  .ant-ribbon-corner {
    display: none;
  }
`;
const Image = styled.img`
  border-radius: 27px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  padding: 10px;
  padding-bottom: 0;
  width: 100%;
  height: 200px;
  position: absolute;
  object-fit: cover;
`;

const Title = styled.a`
  a {
    margin: 0;
    display: inline-block;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    color: #494949;
    :hover {
      color: #494949;
      text-decoration: underline;
    }
  }
`;
const Subtitle = styled.p``;
const Stats = styled.div``;
const MainInfo = styled.div`
  max-height: 100px;
`;
const Text = styled.div`
  margin: 0;
  color: ${(props) => (props.rate ? '#ffb800' : '#b4b9ca')};
  span {
    padding-left: 10px;
    font-weight: 500;
  }
`;

const TextBox = styled.div`
  padding: 10px;
  color: #b4b9ca;
  cursor: pointer;
  background-color: white;
  transition: 300ms linear;
  margin: 10px;
  margin-top: 0;
  background-color: red;
`;

const Card = styled.div`
  position: relative;
  box-shadow: 0px 10px 57px rgba(0, 0, 0, 0.1);
  border-radius: 27px;
  color: #b4b9ca;
  height: 300px;
  width: 350px;
  overflow: hidden;
  padding: 20px;
  text-align: center;
  h2,
  p {
    margin: 0;
  }
`;

const Cards = (params) => {
  const { id, reqs, title, org, desc } = params;

  return (
    <React.Fragment>
      <Col xs={24} sm={24} md={12} lg={8} xxl={6} xxxl={6}>
        <Card>
          <h3>{org}</h3>

          <p>Якутск, Россия</p>
          <Divider style={{ margin: 0, marginTop: '10px' }} />
          <Link to={{ pathname: 'about/' + id }}>
            <h2>{title}</h2>
          </Link>
          <p>от 150 000 р.</p>
          <p>Пн-Пт. 8:00-16:00</p>

          {reqs &&
            reqs.map((item) => {
              return (
                <Tooltip title="Найти курсы">
                  <Button size="small" style={{ marginRight: '10px' }}>
                    {item.skill}
                  </Button>
                </Tooltip>
              );
            })}
          <Divider />
          <Button type="primary" block>
            <Link to={{ pathname: 'about/' + id }}>Посмотреть</Link>
          </Button>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default Cards;
