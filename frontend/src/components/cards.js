import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Col, Badge, Divider } from 'antd';

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
  transform: translateY(200px);
`;

const Card = styled.div`
  position: relative;
  box-shadow: 0px 10px 57px rgba(0, 0, 0, 0.1);
  border-radius: 27px;
  color: #b4b9ca;
  height: 400px;
  overflow: hidden;
`;

const Cards = (params) => {
  const { id, skill, title, org } = params;

  return (
    <React.Fragment>
      <Col xs={24} sm={24} md={12} lg={8} xxl={6} xxxl={6}>
        <StyledRibbon>
          <Badge.Ribbon text={skill} color="#BB7CF5">
            <Card>
              <Image src="" />

              <TextBox>
                <MainInfo>
                  <Title href="course-preview">
                    <Link
                      to={{
                        pathname: `/student/catalog/course-preview/${id}/${title}`,
                      }}
                    >
                      {title}
                    </Link>
                  </Title>
                  <Subtitle>{org}</Subtitle>
                  <Divider />
                </MainInfo>

                <Stats>
                  <Text></Text>
                  <Text>
                    <CalendarOutlined />
                    <span>asd</span>
                  </Text>
                  <Text>
                    <UsergroupAddOutlined />
                    <span>ads</span>
                  </Text>
                </Stats>
              </TextBox>
            </Card>
          </Badge.Ribbon>
        </StyledRibbon>
      </Col>
    </React.Fragment>
  );
};

export default Cards;
