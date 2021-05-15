import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import { Row, Col } from 'antd';
const Content = styled.div`
  width: 100%;
  padding: 0 5%;
  margin-top: 20px;
`;
const MainTitle = styled.h1``;

const Test = () => {
  return (
    <>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Content>
          <MainTitle>Задание</MainTitle>
          <Row
            gutter={[
              { xs: 12, sm: 16, md: 24, lg: 36 },
              { xs: 24, sm: 16, md: 24, lg: 36 },
            ]}
          >
            <Col span={24}>
              <div data-pym-src="https://www.jdoodle.com/iembed/v0/dE5"></div>
            </Col>
          </Row>
        </Content>
      </div>
    </>
  );
};
export default Test;
